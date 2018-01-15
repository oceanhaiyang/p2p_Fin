function objToStr(obj) {
	var array = [];
	if (angular.isObject(obj)) {
		for ( var key in obj) {
			array.push(key + '=' + obj[key]);
		}
		return array.join('&');
	} else {
		return obj;
	}
}

function str_length(str) {
	var sl1 = str.length;
	var strLen = 0;
	for (var i = 0; i < sl1; i++) {
		if (str.charCodeAt(i) > 255) {
			strLen += 2;
		} else {
			strLen++;
		}
	}
	return strLen;
}

angular
		.module('AppController', [])
		.controller(
				'NavCtrl',
				function($rootScope, $scope, $state, AuthService, PostService,
						hmd) {
					$scope.$state = $state;
					$rootScope.loginName = '';
					if (AuthService.isAuthenticated()) {
						$rootScope.loginName = AuthService.getCookie('user');
					}

					$scope.logout = function() {
						hmd.managePostService('logout', PostService, '',
								$scope, function(response) {
									AuthService.delCookie('user');
									AuthService.delCookie('uid');
									AuthService.clearToken();
									$rootScope.loginName = '';
									$state.go("login");
								});
					};
				})

		.controller(
				'IndexCtrl',
				function($scope, $state, AuthService, PostService, $http, hmd) {
					$scope.$state = $state;
					$scope.goMoto = function() {
						$state.go('moto');
					};
					$scope.usable = '0.00';
					$scope.isLogin = false;
					if (AuthService.isAuthenticated()) {
						$scope.isLogin = true;
						PostService
								.personCenter('')
								.success(
										function(response) {
											if (response.status == 1) {
												$scope.usable = response.data[0].u_balance;
											} else {
												$scope.usable = '0.00';
											}
										});
					}
				})

		.controller(
				'loginCtrl',
				function($rootScope, $scope, $state, AuthService, UserService,
						PostService, $location) {

					$scope.$state = $state;
					$scope.ischecked = false;
					$scope.username = '';
					$scope.password = '';
					// 记住用户名
					if ($.cookie('xh_Login')) {
						$scope.username = $.cookie('xh_Login');
						$scope.ischecked = true;
					}

					$scope.uuid = '';
					$scope.captcha = '';
					$scope.refresh = function() {
						$scope.captcha = '';
						PostService.getUuid().success(
								function(res) {
									if (res.status == 1) {
										$scope.uuid = res.uuid;
										$scope.img_src = PostService
												.getImg($scope.uuid);
									}
								});
					};
					$scope.refresh();

					$scope.error = '';
					AuthService.delCookie('user');
					AuthService.delCookie('uid');
					AuthService.clearToken();
					$rootScope.loginName = '';
					$scope.login = function(uname, pwd) {
						// 验证用户名密码不为空
						if (/^\s*$/.test(uname) || /^\s*$/.test(pwd)) {
							$scope.error = '请输入用户名或密码！';
							return false;
						} else if (/^\s*$/.test($scope.captcha)) { // 验证验证码不为空
							$scope.error = '请输入验证码！';
							return false;
						}
						var data = {
							username : uname,
							password : pwd,
							signUuid : $scope.uuid,
							signCode : $scope.captcha
						};

						UserService
								.signIn(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.error = '';
												AuthService.setToken(res.token);
												$rootScope.loginName = res.data.userName;
												AuthService.setCookie('user',
														res.data.userName);
												AuthService.setCookie('uid',
														res.data.id);
												if ($scope.ischecked) {
													$.cookie('xh_Login', uname,
															{
																'expires' : 30
															});
												} else {
													$.removeCookie('xh_Login');
												}

												$state.go("space.home");

											} else if (res.status == 140) {
												$scope.error = '您的账号已被锁定';
											} else if (res.status == 27) {
												$scope.error = '您输入的验证码错误！';
												$scope.refresh();
											} else {
												$scope.error = '用户名或密码错误！';
												$scope.refresh();
											}
										});
					};
				})

		// 用户注册
		.controller(
				'registerCtrl',
				function($rootScope, $location, $scope, $state, $interval,
						AuthService, PostService, UserService,
						checkParamService, $stateParams, hmd) {
					hmd.scrollToTop();
					$scope.$state = $state;
					$scope.one_step = false;
					$scope.two_step = true;
					$scope.three_step = true;
					$scope.four_step = true;

					$scope.username_error_msg = '';
					$scope.phone_error_msg = '';
					$scope.pwd_error_msg = '';
					$scope.repwd_error_msg = '';
					$scope.inveted_error_msg = '';

					$scope.captcha = '';
					$scope.invitCode = '';
					$scope.reaccept = false;
					$scope.username = '';
					$scope.userInviteid = '';

					$scope._code = $stateParams.code;
					if ($scope._code) {
						$scope.userInviteid = $scope._code
					}
					$scope.nameIsPass = false;
					$scope.phoneIsPass = false;
					$scope.invitIsPass = true;
					$scope.isAgree = true;
					// 验证用户名
					$scope.yzusername = function() {
						var obj = checkParamService.checkUname($scope.username);
						if (obj.isTrue) {
							var data = {
								username : $scope.username
							};
							PostService.checkUserName(objToStr(data)).success(
									function(res) {
										if (res.status == 1) {
											$scope.username_error_msg = '';
											$scope.nameIsPass = true;
										} else {
											$scope.username_error_msg = hmd
													.presentStatus(res.status);
											$scope.nameIsPass = false;
										}
									});
						} else {
							$scope.username_error_msg = obj.msg;
							$scope.nameIsPass = obj.isTrue;
						}
					}

					// 手机号码验证
					$scope.phone = '';
					$scope.yzphone = function() {
						// 验证手机号码不为空
						if (/^\s*$/.test($scope.phone)) {
							$scope.phone_error_msg = '请输入您的手机号！';
							$scope.phoneIsPass = false;
							// 验证手机号码长度为11,并且是符合规则的
						} else if (!(/^1[34578]\d{9}$/.test($scope.phone))) {
							$scope.phone_error_msg = '手机号码格式不正确！';
							$scope.phoneIsPass = false;
						} else {
							var data = {
								phone : $scope.phone
							};
							PostService
									.checkPhone(objToStr(data))
									.success(
											function(res) {
												if (res.status == 1) {
													$scope.phone_error_msg = '';
													$scope.phoneIsPass = true;
												} else {
													$scope.phone_error_msg = '手机号已存在,请重新输入！';
													$scope.phoneIsPass = false;
												}
											});
						}
					};

					$scope.password = '';
					$scope.strong = 1;
					// 验证密码
					$scope.yzpassword = function() {
						var obj = checkParamService.checkPwd($scope.password);
						$scope.pwd_error_msg = obj.msg;
						$scope.strong = obj.strong;
						return obj.isTrue;
					};
					$scope.confirm_password = '';
					// 验证确认密码
					$scope.yzconfirm_password = function() {
						var obj = checkParamService.checkRePwd($scope.password,
								$scope.confirm_password);
						$scope.repwd_error_msg = obj.msg;
						return obj.isTrue;
					};

					$scope.yzinviteid = function() {
						$scope.invitIsPass = true;
						if ($scope.invitCode && !$scope._code) {
							if (!/^\d{6,11}$/.test($scope.invitCode)) {
								$scope.inveted_error_msg = '邀请码必须是数字且在6到11位之间！';
								$scope.invitIsPass = false;
							} else {
								$scope.inveted_error_msg = '';
								$scope.invitIsPass = true;
							}
						}
					};
					// 获取验证码
					$scope.uuid = '';
					PostService.getUuid().success(function(res) {
						if (res.status == 1) {
							$scope.uuid = res.uuid;
							$scope.img_src = PostService.getImg($scope.uuid);
						}
					});

					$scope.isPassCaptcha = false;
					$scope.code_error_msg = '';
					$scope.authCaptcha = function() {
						if (/^\s*$/.test($scope.captcha)) {
							$scope.code_error_msg = '请输入验证码！';
							$scope.isPassCaptcha = false;
						} else if (!/[0-9a-zA-Z]/.test($scope.captcha)) {
							$scope.code_error_msg = '验证码为数字或字母组合！';
							$scope.isPassCaptcha = false;
						} else {
							var data = {
								signUuid : $scope.uuid,
								signCode : $scope.captcha
							};
							PostService
									.yzAuthCaptcha(objToStr(data))
									.success(
											function(res) {
												if (res.status == 1) {
													$scope.code_error_msg = '';
													$scope.isPassCaptcha = true;
												} else {
													$scope.code_error_msg = '验证码输入有误，请重新输入！';
													$scope.isPassCaptcha = false;
												}
											});
						}
					};

					$scope.refresh = function() {
						$scope.isPassCaptcha = false;
						$scope.captcha = '';
						$scope.img_src = PostService.getImg($scope.uuid);
					};

					$scope.phoneCodeMsg = '';
					$scope.getauthcode = function() {
						$scope.reaccept = true;
						var maxtime = 60;
						$scope.msg = maxtime + "秒后重新获取";
						var timer = $interval(function() {
							if (maxtime > 0) {
								--maxtime;
								$scope.msg = maxtime + "秒后重新获取";
							} else {
								$scope.msg = '';
								$scope.reaccept = false;
								if (angular.isDefined(timer)) {
									$interval.cancel(timer);
								}
							}
						}, 1000);
						var data = {
							phone : $scope.phone
						};
						PostService.getPhoneCode(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.phoneCodeMsg = '验证码已发送';
									} else {
										$scope.phoneCodeMsg = '验证码发送失败，请稍后重试！';
									}
								});
					}

					$scope.regMsg = '';
					// 注册操作
					$scope.doReg = function() {

						// 得到所有请求参数
						var data = {
							username : $scope.username,
							phone : $scope.phone,
							password : $scope.password,
							inviteId : $scope.invitCode,
							signUuid : $scope.uuid,
							signCode : $scope.captcha
						};

						// 得到所有要向服务器发送的参数
						var _params = objToStr(data);
						// 完成注册操作
						UserService.register(encodeURI(_params)).success(
								function(res) {
									if (res.status == 1) {
										$rootScope.loginName = $scope.username;
										AuthService.setCookie('user',
												$scope.username);
										AuthService.setCookie('uid',
												res.data.id);
										AuthService.setToken(res.token);
										$scope.two_step = true;
										$scope.three_step = true;
										$scope.four_step = false;

										var _time = 3;
										$scope.times = 3;
										var _timer = $interval(function() {
											if (_time > 0) {
												--_time;
												$scope.times = _time;
											} else {
												if (angular.isDefined(_timer)) {
													$interval.cancel(_timer);
												}
												$state.go("space.home");
											}
										}, 1000);
										// 处理用户级别
										checkParamService.getUserLevel($scope,
												UserService);
									} else {
										$scope.regMsg = hmd
												.presentStatus(res.status)
										return false;
									}
								});
					}

					$scope._login = function() {
						if (AuthService.isAuthenticated()) {
							hmd.popupErrorInfo('您已登录！', 'attention');
							return false;
						} else {
							$state.go('login');
						}
					};
				})

		// 找回密码
		.controller(
				'backPwdCtrl',
				function($rootScope, $scope, $state, $interval, PostService,
						UserService, checkParamService, hmd) {
					hmd.scrollToTop();
					$scope.$state = $state;
					$scope.one_step = false;
					$scope.two_step = true;
					$scope.three_step = true;
					$scope.four_step = true;
					$scope.username = '';
					$scope.unameMsg = '';
					$scope.phone = '';
					$scope.phoneMsg = '';
					$scope.resetMsg = '';

					$scope.password = '';
					$scope.strong = 1;
					$scope.pwd_is_pass = false;
					$scope.pwd_error_msg = '';
					$scope.repwd_is_pass = false;
					$scope.repwd_error_msg = '';
					$scope.reaccept = false;
					$scope.uuid = '';
					$scope.captcha = '';
					$scope.refresh = function() {
						$scope.captcha = '';
						PostService.getUuid().success(
								function(res) {
									if (res.status == 1) {
										$scope.uuid = res.uuid;
										$scope.img_src = PostService
												.getImg($scope.uuid);
									}
								});
					};
					$scope.onestep = function() {
						if (!$scope.username) {
							$scope.unameMsg = '登录账号不可以为空!';
							return false;
						}
						var data = {
							userName : $scope.username
						};
						PostService
								.getPhoneByName(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.phone = res.data.phone;
												$scope.unameMsg = '';
												$scope.one_step = true;
												$scope.two_step = false;
												$scope.refresh();
											} else {
												$scope.unameMsg = '该登录账号不存在，请确认您输入的账号正确!';
												return false;
											}
										});
					};
					$scope.phonecaptcha = '';
					$scope.twostep = function() {
						if (!$scope.captcha.replace(/\s/g, '')) {
							$scope.phoneMsg = '验证码不可为空！';
							return false;
						}
						if (!$scope.phonecaptcha.replace(/\s/g, '')) {
							$scope.phoneMsg = '手机验证码不可为空！';
							return false;
						}
						var data = {
							userName : $scope.username,
							code : $scope.phonecaptcha
						};
						PostService
								.checkPhoneCodeByName(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.phoneMsg = '';
												$scope.two_step = true;
												$scope.three_step = false;
											} else if (res.status == 154) {
												$scope.captcha = '';
												$scope.phonecaptcha = '';
												$scope.phoneMsg = '';
												$scope.refresh();
												hmd
														.popupErrorInfo(
																'手机验证码输入错误次数过多，请重新获取手机验证吗！',
																'error');
												return false;
											} else {
												$scope.phoneMsg = '手机号和手机验证码不匹配！';
												$scope.captcha = '';
												$scope.phonecaptcha = '';
												$scope.refresh();
												return false;
											}
										});
					};

					$scope.getPhoneCaptcha = function() {
						if (!$scope.captcha.replace(/\s/g, '')) {
							$scope.phoneMsg = '验证码不可为空！';
							return false;
						}
						var data = {
							'userName' : $scope.username,
							'signUuid' : $scope.uuid,
							'signCode' : $scope.captcha
						};
						PostService
								.getPhoneSMSbyName(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.phoneMsg = '';
												$scope.reaccept = true;
												var maxtime = 60;
												$scope.msg = maxtime + "秒后重新获取";
												var timer = $interval(
														function() {
															if (maxtime > 0) {
																--maxtime;
																$scope.msg = maxtime
																		+ "秒后重新获取";
															} else {
																$scope.msg = '';
																$scope.reaccept = false;
																if (angular
																		.isDefined(timer)) {
																	$interval
																			.cancel(timer);
																}
															}
														}, 1000);
											} else {
												$scope.captcha = '';
												$scope.refresh();
												hmd.popupErrorInfo('输入的验证码错误',
														'error');
											}
										});
					};

					$scope.yzpassword = function() {
						var obj = checkParamService.checkPwd($scope.password);
						$scope.pwd_error_msg = obj.msg;
						$scope.strong = obj.strong;
						return obj.isTrue;
					};

					// 验证密码和确认密码是否一致
					$scope.confirm_password = '';
					$scope.yzconfirm_password = function() {
						var obj = checkParamService.checkRePwd($scope.password,
								$scope.confirm_password);
						$scope.repwd_error_msg = obj.msg;
						return obj.isTrue;
					};

					$scope.threestep = function() {
						if (!($scope.yzpassword() && $scope
								.yzconfirm_password())) {
							return false;
						}
						var data = {
							'userName' : $scope.username,
							'passWord' : $scope.password,
							'code' : $scope.phonecaptcha,
							'signCode' : $scope.captcha,
							'signUuid' : $scope.uuid
						};
						UserService.modifyPwd(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.three_step = true;
										$scope.four_step = false;
									} else {
										hmd.popupErrorInfo(res.status);
									}
								});
					}
				})

		// 进入用户中心
		.controller(
				'myspaceCtrl',
				function($rootScope, $scope, $state, UserService) {
					$scope.$state = $state;
					$scope.username = $rootScope.loginName;
					$scope.menu = '';
					$scope.$on('childMenuState', function(event, data) {
						$scope.menu = data;
					});

					$scope.checkParam = function(msg) {
						$rootScope.aId = msg;
					};
					$scope.levelPercent = 0;
					$scope.levelMsg = '';
					$scope.phoneAuth = 0;
					$scope.IDAuth = 0;
					$scope.payPwdAuth = 0;
					$scope.emailAuth = 0;
					UserService.getSafeLevel('').success(
							function(res) {
								if (res.status == 1) {
									var data = res.data[0];
									$scope.phoneAuth = data.phoneStatus;
									$scope.IDAuth = data.realNameStatus;
									$scope.payPwdAuth = data.payPwdStatus;
									$scope.emailAuth = data.emailStatus;
									var total = $scope.phoneAuth
											+ $scope.IDAuth + $scope.payPwdAuth
											+ $scope.emailAuth;
									switch (total) {
									case 1:
										$scope.levelPercent = 25;
										$scope.levelMsg = '低';
										break;
									case 2:
										$scope.levelPercent = 50;
										$scope.levelMsg = '中';
										break;
									case 3:
										$scope.levelPercent = 75;
										$scope.levelMsg = '较高';
										break;
									case 4:
										$scope.levelPercent = 100;
										$scope.levelMsg = '高';
										break;
									}
								} else {
									$scope.levelMsg = '弱';
								}
							}).error(function(res) {
						$scope.levelMsg = '弱';
					});

				})

		.controller(
				'homeCtrl',
				function($scope, $state, AuthService, UserService, $interval,
						PostService, hmd) {
					$scope.$state = $state;
					// 向parent传递event与data
					$scope.$emit('childMenuState', {
						menu : 'homeManage',
						childMenu : ''
					});
					$scope.usable = '0.00'; // 可用余额
					$scope.totle = '0.00';// 资产总额
					$scope.grand = '0.00'; // 累计收益
					// 进入用户帐户主页面
					PostService.personCenter('').success(function(response) {
						if (response.status == 1) {
							$scope.totle = response.data[0].u_total;
							$scope.usable = response.data[0].u_balance;
							$scope.grand = response.data[0].u_interest_a;
						} else if (response.status == 15) {
							AuthService.clearUserInfo();
							$state.go('login', {}, {
								reload : true
							});
						} else {
							hmd.popupErrorInfo(response.status);
						}
					});
					$scope.ps = "";
					// 查询理财产品
					PostService.findAllProduct().success(function(response) {

						if (response.status == 1) {
							$scope.ps = response.data;
							// alert($scope.ps[1].lowerTimeLimit);
						} else {
							hmd.popupErrorInfo(response.status);
						}
					});
				})

		// 安全设置
		.controller(
				'setCecurityCtrl',
				function($scope, $state, $interval, AuthService, PostService,
						checkParamService, $stateParams, hmd) {
					$scope.$emit('childMenuState', {
						menu : 'accoutManage',
						childMenu : 'security'
					});
					$scope.$state = $state;
					$scope.payStatus = 0;
					$scope.emailStatus = 0;
					$scope.phoneStatus = 0;
					$scope.realNameStatus = 0;
					$scope.pwdStatus = 0;
					$scope.userName = '';
					$scope.authPhone = '';
					$scope.openPhonebox = true;
					$scope.idAuthbox = true; // 实名
					$scope.AuthEmailbox = true; // 邮件
					$scope.SetPayPwdbox = true; // 支付密码
					var flag = $stateParams.flag;
					PostService
							.getUserSafeInfo()
							.success(
									function(res) {
										if (res.status == 1) {
											var data = res.data[0];
											$scope.payStatus = data.payPwdStatus;
											$scope.emailStatus = data.emailStatus;
											$scope.phoneStatus = data.phoneStatus;
											$scope.realNameStatus = data.realNameStatus;
											$scope.pwdStatus = data.passwordstatus;
											$scope.userName = data.username;
											$scope.authPhone = data.phone;
											if (flag == 'authrealname'
													&& !$scope.realNameStatus) {
												$scope.idAuthbox = false;
											}
											if (flag == 'authemail'
													&& !$scope.emailStatus) {
												$scope.AuthEmailbox = false;
											}
											if (flag == 'authphone'
													&& !$scope.phoneStatus) {
												$scope.openPhonebox = false;
											}
											if (flag == 'authpaypwd'
													&& !$scope.payStatus) {
												$scope.SetPayPwdbox = false;
											}
										} else if (res.status == 15) {
											AuthService.clearUserInfo();
											$state.go('login', {}, {
												reload : true
											});
										} else {
											hmd.popupErrorInfo(res.status);
										}
									});

					$scope.realName = '';
					$scope.identity = '';
					$scope.IdAuthMsg = '';
					$scope.IDTableBox = true;
					$scope.IDSuccessBox = false;
					$scope.IdAuthBox = function() {
						$scope.idAuthbox = false;
						$scope.IDTableBox = true;
						$scope.IDSuccessBox = false;
						$scope.realName = '';
						$scope.identity = '';
						$scope.authRealMsg = '';
						$scope.IdAuthMsg = '';
					};
					$scope.shutIdAuthBox = function() {
						$scope.idAuthbox = true;
						$scope.IDTableBox = true;
						$scope.IDSuccessBox = false;
					};
					$scope.authRealMsg = '';
					$scope.authRealName = function() {
						if (!$scope.realName.replace(/\s/g, '')) {
							$scope.authRealMsg = '姓名不可为空！';
							return false;
						} else {
							$scope.authRealMsg = '';
							return true;
						}
					};
					$scope.authID = function() {
						if (!checkParamService.AuthIDcard($scope.identity)) {
							$scope.IdAuthMsg = '请输入15或18位的有效身份证号码！';
							return false;
						} else {
							$scope.IdAuthMsg = '';
							return true;
						}
					}

					$scope.submitIdAuth = function() {
						if (!$scope.authRealName() || !$scope.authID()) {
							return false;
						}
						var _btn = $('#_btn');
						_btn.removeAttr('disabled')
								.attr('disabled', 'disabled')
						var data = {
							'realName' : $scope.realName,
							'identity' : $scope.identity
						};
						PostService.authIdentity(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.IdAuthMsg = '';
										$scope.IDTableBox = false;
										$scope.IDSuccessBox = true;
										$scope.realNameStatus = 1;
										_btn.removeAttr('disabled');
									} else if (res.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else if (parseInt(res.status) == 0) {
										hmd.popupErrorInfo('实名认证失败', 'error');
										_btn.removeAttr('disabled');
									} else {
										hmd.popupErrorInfo(res.status);
										_btn.removeAttr('disabled');
									}
								});
					}
					$scope.Phonebox = true;
					$scope.phoneNum = '';
					$scope.newphone = '';
					$scope.phoneNumCaptcha = '';
					$scope.phonecaptcha = '';
					$scope.phoneMsg = '';
					$scope.authPhoneMsg = '';
					$scope.msg = '';
					$scope.reaccept = true;
					$scope.PhoneTableBox = true;
					$scope.PhoneSuccessBox = false;
					// 打开电话认证窗口
					$scope.openphoneAuthBox = function() {
						$scope.openPhonebox = false;
						$scope.phoneNum = '';
						$scope.phoneNumCaptcha = '';
						$scope.phoneMsg = '';
					};
					$scope.shutphoneAuthBox = function() {
						$scope.openPhonebox = true;
					};

					$scope.authPhoneCaptFunc = function() {
						if (!$scope.phoneNumCaptcha.replace(/\s/g, '')) {
							$scope.authPhoneMsg = '手机验证码不可为空！';
							return false;
						} else {
							$scope.authPhoneMsg = '';
							return true;
						}
					}
					$scope.submitPhone = function(phone, code) {
						if (!phone.replace(/\s/g, '')) {
							$scope.phoneMsg = '手机号码不可为空！';
							return false;
						} else if (!/^1[34578]\d{9}$/.test(phone)) {
							$scope.phoneMsg = '无效的手机号,请输入有效的手机号！';
							return false;
						}
						if (!$scope.authPhoneCaptFunc()) {
							return false;
						}
						var param = 'phone=' + phone + '&phoneCode=' + code;
						PostService.addPhoneAuth(param).success(function(res) {
							if (res.status == 1) {
								$scope.phoneMsg = '';
								$scope.authPhone = phone;
								$scope.phoneStatus = 1;
								$scope.openPhonebox = true;
							} else if (res.status == 15) {
								AuthService.clearUserInfo();
								$state.go('login', {}, {
									reload : true
								});
							} else {
								hmd.popupErrorInfo(res.status);
							}
						});
					}

					$scope.modifyPhoneBox = function() {
						$scope.Phonebox = false;
						$scope.PhoneTableBox = true;
						$scope.PhoneSuccessBox = false;
						$scope.newphone = '';
						$scope.phonecaptcha = '';
						$scope.phoneMsg = '';
						$scope.authPhoneMsg = '';
					};

					$scope.shutPhoneBox = function() {
						$scope.Phonebox = true;
						$scope.PhoneTableBox = true;
						$scope.PhoneSuccessBox = false;
					};

					function authPhoneIsUsed(phoneunm) {
						// 验证手机号码不为空
						if (!phoneunm.replace(/\s/g, '')) {
							$scope.phoneMsg = '手机号码不可为空！';
							$scope.reaccept = true;
						} else if (!/^1[34578]\d{9}$/.test(phoneunm)) {
							$scope.phoneMsg = '无效的手机号,请输入有效的手机号！';
							$scope.reaccept = true;
						} else {
							var data = {
								phone : phoneunm
							};
							PostService.checkPhone(objToStr(data)).success(
									function(res) {
										if (res.status == 1) {
											$scope.phoneMsg = '该手机号可用!';
											$scope.reaccept = false;
										} else if (res.status == 15) {
											AuthService.clearUserInfo();
											$state.go('login', {}, {
												reload : true
											});
										} else {
											hmd.popupErrorInfo(res.status);
											$scope.reaccept = true;
										}
									});
						}
					}
					$scope.authPhoneFunction = function() {
						authPhoneIsUsed($scope.phoneNum);
					};
					$scope.authPhoneFunc = function() {
						authPhoneIsUsed($scope.newphone);
					};
					$scope.authCaptFunc = function() {
						if (!$scope.phonecaptcha.replace(/\s/g, '')) {
							$scope.authPhoneMsg = '手机验证码不可为空！';
							return false;
						} else {
							$scope.authPhoneMsg = '';
							return true;
						}
					}

					$scope.sendPhoneCaptcha = function(phone) {
						if (!phone.replace(/\s/g, '')) {
							$scope.authPhoneMsg = '手机号码不可为空！';
							return false;
						} else if (!/^1[34578]\d{9}$/.test(phone)) {
							$scope.authPhoneMsg = '无效的手机号,请输入有效的手机号！';
							return false;
						}
						var data = {
							'phone' : phone
						};

						PostService
								.getPhoneCode(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.authPhoneMsg = '';
												$scope.reaccept = true;
												var maxtime = 60;
												$scope.msg = maxtime + "秒后重新获取";
												var timer = $interval(
														function() {
															if (maxtime > 0) {
																--maxtime;
																$scope.msg = maxtime
																		+ "秒后重新获取";
															} else {
																$scope.msg = '';
																$scope.reaccept = false;
																if (angular
																		.isDefined(timer)) {
																	$interval
																			.cancel(timer);
																}
															}
														}, 1000);
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.authPhoneMsg = '验证码获取异常！';
											}
										});
					}

					$scope.submitModifyPhone = function() {
						if (!$scope.newphone.replace(/\s/g, '')) {
							$scope.phoneMsg = '手机号码不可为空！';
							return false;
						} else if (!/^1[34578]\d{9}$/.test($scope.newphone)) {
							$scope.phoneMsg = '无效的手机号,请输入有效的手机号！';
							return false;
						}
						if (!$scope.authCaptFunc()) {
							return false;
						}
						var data = {
							'phone' : $scope.newphone,
							'phoneCode' : $scope.phonecaptcha
						};

						PostService.updatePhone(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.phoneMsg = '';
										$scope.authPhone = $scope.newphone;
										$scope.PhoneTableBox = false;
										$scope.PhoneSuccessBox = true;
									} else if (res.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo(res.status);
									}
								});
					}
					var email_reg = /^[A-Za-z0-9_.]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/;

					// 设置邮箱
					$scope.emailAddress = '';
					$scope.authEmailMsg = '';
					$scope.EmailTableBox = true;
					$scope.EmailSuccessBox = false;
					// 设置邮箱验证框显示
					$scope.authEmailBox = function() {
						$scope.authEmailMsg = '';
						$scope.emailAddress = '';
						$scope.AuthEmailbox = false;
						$scope.EmailTableBox = true;
						$scope.EmailSuccessBox = false;
					};
					$scope.shutAuthEmailBox = function() {
						$scope.AuthEmailbox = true;
						$scope.EmailTableBox = true;
						$scope.EmailSuccessBox = false;
					};
					$scope.authEmailFunc = function() {
						if (!$scope.emailAddress.replace(/\s/g, '')) {
							$scope.authEmailMsg = '邮箱不可为空！';
							return false;
						} else if (!email_reg.test($scope.emailAddress)) {
							$scope.authEmailMsg = '您输入的邮箱格式不正确！';
							return false;
						} else {
							$scope.authEmailMsg = '';
							return true;
						}
					}

					$scope.submitAuthEmail = function() {
						if (!$scope.authEmailFunc()) {
							return false;
						} else {
							var data = {
								'userId' : AuthService.getCookie('uid'),
								'username' : AuthService.getCookie('user'),
								'email' : $scope.emailAddress
							};

							PostService
									.authEmail(objToStr(data))
									.success(
											function(res) {
												if (res.status == 1) {
													$scope.EmailTableBox = false;
													$scope.EmailSuccessBox = true;
												} else if (res.status == 15) {
													AuthService.clearUserInfo();
													$state.go('login', {}, {
														reload : true
													});
												} else if (res.status == 301) {
													hmd
															.popupErrorInfo(
																	'该邮箱已经存在，请更换一个邮箱号！',
																	'error');
												} else {
													$scope.authEmailMsg = "认证邮件发送失败，请稍后再试";
												}
											});
						}
					}

					// 修改邮箱
					$scope.Emailbox = true;
					$scope.oldEmail = '';
					$scope.newEmail = '';
					$scope.modifyMsg = '';
					$scope.EmailTableBox1 = true;
					$scope.EmailSuccessBox1 = false;
					$scope.modifyEmailBox = function() {
						$scope.Emailbox = false;
						$scope.EmailTableBox1 = true;
						$scope.EmailSuccessBox1 = false;
						$scope.oldEmail = '';
						$scope.newEmail = '';
						$scope.modifyMsg = '';
						$scope.modifyNewMsg = '';
					};
					$scope.shutEmailBox = function() {
						$scope.Emailbox = true;
						$scope.EmailTableBox1 = true;
						$scope.EmailSuccessBox1 = false;
					};
					// 验证旧邮箱
					$scope.authOldEmailFunc = function() {
						if (!$scope.oldEmail.replace(/\s/g, '')) {
							$scope.modifyMsg = '邮箱不可为空！';
							return false;
						} else if (!email_reg.test($scope.oldEmail)) {
							$scope.modifyMsg = '您输入的邮箱格式不正确！';
							return false;
						} else {
							$scope.modifyMsg = '';
							return true;
						}
					}
					// 验证新邮箱
					$scope.authNewEmailFunc = function() {
						if (!$scope.newEmail.replace(/\s/g, '')) {
							$scope.modifyNewMsg = '邮箱不可为空！';
							return false;
						} else if (!email_reg.test($scope.newEmail)) {
							$scope.modifyNewMsg = '您输入的邮箱格式不正确！';
							return false;
						} else {
							$scope.modifyNewMsg = '';
							return true;
						}
					}
					// 修改邮箱
					$scope.submitModifyEmail = function() {
						if (!$scope.authOldEmailFunc()
								|| !$scope.authNewEmailFunc()) {
							return false;
						} else {
							var data = {
								'userId' : AuthService.getCookie('uid'),
								'email' : $scope.oldEmail,
								'newEmail' : $scope.newEmail
							}
							PostService.modifyEmail(objToStr(data)).success(
									function(res) {
										if (res.status == 1) {
											$scope.EmailTableBox1 = false;
											$scope.EmailSuccessBox1 = true;
										} else if (res.status == 15) {
											AuthService.clearUserInfo();
											$state.go('login', {}, {
												reload : true
											});
										} else {
											hmd.popupErrorInfo(res.status);
										}
									});
						}
					}

					$scope.setPwdbox = true;
					$scope.oldPassword = '';
					$scope.newPassword = '';
					$scope.strong = 1;
					$scope.pwdOldErrorMsg = '';
					$scope.pwdNewErrorMsg = '';
					$scope.repwd_error_msg = '';
					$scope.resetpwdMsg = '';
					$scope.confirm_password = '';
					$scope.PwdTableBox = true;
					$scope.PwdSuccessBox = false;
					// 打开修改密码窗口
					$scope.modifyPwdBox = function() {
						$scope.setPwdbox = false;
						$scope.PwdTableBox = true;
						$scope.PwdSuccessBox = false;
						$scope.oldPassword = '';
						$scope.newPassword = '';
						$scope.pwdOldErrorMsg = '';
						$scope.pwdNewErrorMsg = '';
						$scope.confirm_password = '';
						$scope.repwd_error_msg = '';
						$scope.resetpwdMsg = '';
					};
					$scope.shutPwdBox = function() {
						$scope.setPwdbox = true;
						$scope.PwdTableBox = true;
						$scope.PwdSuccessBox = false;
					};
					// 验证旧密码
					$scope.authPwdFunc = function() {
						if (!$scope.oldPassword) {
							$scope.pwdOldErrorMsg = '旧密码不可为空！';
							return false;
						} else {
							$scope.pwdOldErrorMsg = '';
							return true;
						}
					};
					// 验证新密码
					$scope.authNewPwdFunc = function() {
						var obj = checkParamService
								.checkPwd($scope.newPassword);
						$scope.pwdNewErrorMsg = obj.msg;
						$scope.strong = obj.strong;
						return obj.isTrue;
					};
					// 验证密码和确认密码是否一致
					$scope.yzconfirm_password = function() {
						var obj = checkParamService.checkRePwd(
								$scope.newPassword, $scope.confirm_password);
						$scope.repwd_error_msg = obj.msg;
						return obj.isTrue;
					};
					// 提交修改密码
					$scope.submitModifyPwd = function() {
						if (!($scope.authPwdFunc() && $scope.authNewPwdFunc() && $scope
								.yzconfirm_password())) {
							return false;
						}
						var data = {
							'oldpw' : $scope.oldPassword,
							'newpw' : $scope.newPassword
						};
						PostService.modifyPwd(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										$scope.resetpwdMsg = '';
										$scope.PwdTableBox = false;
										$scope.PwdSuccessBox = true;
									} else if (response.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo(response.status);
									}
								});
					}

					// 设置支付
					$scope.payPwd = '';
					$scope.rePayPwd = '';
					$scope.payPwdMsg = '';
					$scope.repayPwdMsg = '';
					$scope.payPwdSuccessMsg = '';

					$scope.payPwdTableBox = true;
					$scope.payPwdSuccessBox = false;
					$scope.setPayPwdBox = function() {
						$scope.SetPayPwdbox = false;
						$scope.payPwdTableBox = true;
						$scope.payPwdSuccessBox = false;
						$scope.payPwd = '';
						$scope.rePayPwd = '';
						$scope.payPwdMsg = '';
						$scope.repayPwdMsg = '';
						$scope.payPwdSuccessMsg = '';
					};
					$scope.shutSetPayPwdBox = function() {
						$scope.SetPayPwdbox = true;
						$scope.payPwdTableBox = true;
						$scope.payPwdSuccessBox = false;
					};
					// 支付密码验证
					$scope.checkPayPwd = function() {
						if (!$scope.payPwd.replace(/\s/g, '')) {
							$scope.payPwdMsg = '支付密码不可为空！';
							$scope.paystrong = 1;
							return false;
						} else if (!/^[a-zA-Z0-9]+$/.test($scope.payPwd)) {
							$scope.payPwdMsg = '支付密码格式错误，只能为数字、字母或数字字母组合';
							$scope.paystrong = 1;
							return false;
						} else if (str_length($scope.payPwd) < 6
								|| str_length($scope.payPwd) > 16) {
							$scope.payPwdMsg = '请输入6-16位数字或字母的支付密码！';
							$scope.paystrong = 1;
							return false;
						} else {
							if (/^[0-9]+$/.test($scope.payPwd)
									|| /^[a-zA-Z]+$/.test($scope.payPwd)) {
								$scope.paystrong = 2;
							} else {
								if ($scope.payPwd.length < 12) {
									$scope.paystrong = 3;
								} else {
									$scope.paystrong = 4;
								}
							}
							$scope.payPwdMsg = '';
							return true;
						}
					}
					// 确认支付密码验证
					$scope.recheckPayPwd = function() {
						if ($scope.payPwd != $scope.rePayPwd) {
							$scope.repayPwdMsg = '与支付密码不一致！';
							return false;
						} else {
							$scope.repayPwdMsg = '';
							return true;
						}
					}
					// 支付密码确认
					$scope.submitPayPwd = function(response) {
						if (!$scope.checkPayPwd() || !$scope.recheckPayPwd()) {
							return false;
						}
						var data = {
							'paypwd' : $scope.payPwd
						};
						PostService
								.setPayPwd(objToStr(data))
								.success(
										function(response) {
											if (response.status == 1) {
												$scope.payPwdSuccessMsg = '恭喜您成功设置支付密码！';
												$scope.payStatus = 1;
												$scope.payPwdTableBox = false;
												$scope.payPwdSuccessBox = true;
											} else if (response.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												hmd
														.popupErrorInfo(response.status);
											}
										});
					};

					// 重置支付
					$scope.resetPayPwdbox = true;
					$scope.oldPayPwd = '';
					$scope.newPayPwd = '';
					$scope.reNewPayPwd = '';
					$scope.newPayPwdMsg = '';
					$scope.nweRePayPwdMsg = '';
					$scope.updatePayMsg = '';
					$scope.payPwdTableBox1 = true;
					$scope.payPwdSuccessBox1 = false;
					// 打开重置支付密码窗口
					$scope.resetPayPwdBox = function() {
						$scope.SetPayPwdbox = true;
						$scope.backPayPwdbox = true;
						$scope.resetPayPwdbox = false;
						$scope.payPwdTableBox1 = true;
						$scope.payPwdSuccessBox1 = false;
						$scope.oldPayPwd = '';
						$scope.newPayPwd = '';
						$scope.reNewPayPwd = '';
						$scope.newPayPwdMsg = '';
						$scope.nweRePayPwdMsg = '';
						$scope.updatePayMsg = '';
					};
					$scope.shutPayPwdBox = function() {
						$scope.resetPayPwdbox = true;
						$scope.payPwdTableBox1 = true;
						$scope.payPwdSuccessBox1 = false;
					};
					$scope.checkNewPayPwd = function() {
						if (!$scope.newPayPwd.replace(/\s/g, '')) {
							$scope.newPayPwdMsg = '支付密码不可为空！';
							$scope.mnewpaystrong = 1;
							return false;
						} else if (!/^[a-zA-Z0-9]+$/.test($scope.newPayPwd)) {
							$scope.newPayPwdMsg = '支付密码格式错误，只能为数字、字母或数字字母组合!';
							$scope.mnewpaystrong = 1;
							return false;
						} else if (str_length($scope.newPayPwd) < 6
								|| str_length($scope.newPayPwd) > 16) {
							$scope.newPayPwdMsg = '请输入6-16位数字或字母的支付密码！';
							$scope.mnewpaystrong = 1;
							return false;
						} else {
							if (/^[0-9]+$/.test($scope.newPayPwd)
									|| /^[a-zA-Z]+$/.test($scope.newPayPwd)) {
								$scope.mnewpaystrong = 2;
							} else {
								if ($scope.newPayPwd.length < 12) {
									$scope.mnewpaystrong = 3;
								} else {
									$scope.mnewpaystrong = 4;
								}
							}
							$scope.newPayPwdMsg = '';
							return true;
						}
					};
					$scope.recheckNewPayPwd = function() {
						if ($scope.newPayPwd != $scope.reNewPayPwd) {
							$scope.nweRePayPwdMsg = '与支付密码不一致！';
							return false;
						} else {
							$scope.nweRePayPwdMsg = '';
							return true;
						}
					}
					// 校验旧的支付密码
					$scope.checkOldPayPwd = function() {
						if (!$scope.oldPayPwd.replace(/\s/g, '')) {
							$scope.oldPayPwdMsg = '支付密码不可为空！';
							return false;
						} else if (!/^[a-zA-Z0-9]+$/.test($scope.oldPayPwd)) {
							$scope.oldPayPwdMsg = '支付密码格式错误，只能为数字、字母或数字字母组合!';
							return false;
						} else if (str_length($scope.oldPayPwd) < 6
								|| str_length($scope.oldPayPwd) > 16) {
							$scope.oldPayPwdMsg = '请输入6-16位数字或字母的支付密码！';
							return false;
						} else {
							$scope.oldPayPwdMsg = '';
							return true;
						}
					};
					// 重置支付密码
					$scope.submitPayPwdUpdate = function() {
						if (!$scope.checkOldPayPwd()) {
							return false;
						}
						if (!$scope.checkNewPayPwd()
								|| !$scope.recheckNewPayPwd()) {
							return false;
						}
						var data = {
							'payPassword' : $scope.oldPayPwd,
							'newpaypwd' : $scope.newPayPwd
						};
						PostService.updatePayPwd(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										$scope.updatePayMsg = '';
										$scope.payStatus = 1;
										$scope.payPwdTableBox1 = false;
										$scope.payPwdSuccessBox1 = true;
									} else if (response.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo(response.status);
									}
								});
					};

					$scope.backPayPwdbox = true;
					$scope.phoneCode = '';
					$scope.PayPwdPhonemsg = '';
					$scope.PayNewPwd = '';
					$scope.rePayNewPwd = '';
					$scope.IsResend = false;
					$scope.PayNewPwdMsg = '';
					$scope.rePayNewPwdMsg = '';
					$scope.backPayPwdMsg = '';
					$scope.payPwdTableBox2 = true;
					$scope.payPwdSuccessBox2 = false;

					$scope.backPayPwdBox = function() {
						$scope.SetPayPwdbox = true;
						$scope.resetPayPwdbox = true;
						$scope.backPayPwdbox = false;
						$scope.payPwdTableBox2 = true;
						$scope.payPwdSuccessBox2 = false;
					};
					$scope.shutbackPayPwdBox = function() {
						$scope.backPayPwdbox = true;
						$scope.payPwdTableBox2 = true;
						$scope.payPwdSuccessBox2 = false;
					};
					// 找回支付密码，发送短信
					$scope.sendPhoneCode = function() {
						PostService.getPhoneCodeByToken().success(
								function(response) {
									if (response.status == 1) {
										$scope.IsResend = true;
										var maxtime = 60;
										$scope.PayPwdPhonemsg = maxtime
												+ "秒后重新获取";
										var timer = $interval(function() {
											if (maxtime > 0) {
												--maxtime;
												$scope.PayPwdPhonemsg = maxtime
														+ "秒后重新获取";
											} else {
												$scope.PayPwdPhonemsg = '';
												$scope.IsResend = false;
												if (angular.isDefined(timer)) {
													$interval.cancel(timer);
													timer = undefined;
												}
											}
										}, 1000);
									} else if (response.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo(response.status);
									}
								});
					};
					// 验证支付密码
					$scope.PayPwdCheck = function() {
						if (!$scope.PayNewPwd.replace(/\s/g, '')) {
							$scope.PayNewPwdMsg = '支付密码不可为空！';
							$scope.newpaystrong = 1;
							return false;
						} else if (!/^[a-zA-Z0-9]+$/.test($scope.PayNewPwd)) {
							$scope.PayNewPwdMsg = '支付密码格式错误,只能为数字,字母或数字母混合!';
							$scope.newpaystrong = 1;
							return false;
						} else if (str_length($scope.PayNewPwd) < 6
								|| str_length($scope.PayNewPwd) > 16) {
							$scope.PayNewPwdMsg = '请输入6-16位数字或字符的支付密码！';
							$scope.newpaystrong = 1;
							return false;
						} else {
							if (/^[0-9]+$/.test($scope.PayNewPwd)
									|| /^[a-zA-Z]+$/.test($scope.PayNewPwd)) {
								$scope.newpaystrong = 2;
							} else {
								if ($scope.PayNewPwd.length < 12) {
									$scope.newpaystrong = 3;
								} else {
									$scope.newpaystrong = 4;
								}
							}
							$scope.PayNewPwdMsg = '';
							return true;
						}
					};
					// 验证确认支付密码
					$scope.rePayPwdCheck = function() {
						if ($scope.PayNewPwd != $scope.rePayNewPwd) {
							$scope.rePayNewPwdMsg = '与支付密码不一致！';
							return false;
						} else {
							$scope.rePayNewPwdMsg = '';
							return true;
						}
					}
					// 找回支付密码提交
					$scope.submitBackPayPwd = function() {
						if (!$scope.PayPwdCheck() || !$scope.rePayPwdCheck()) {
							return false;
						}
						var data = {
							'code' : $scope.phoneCode,
							'newpaypwd' : $scope.PayNewPwd
						};
						PostService.backPayPwd(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										$scope.backPayPwdMsg = '';
										$scope.payStatus = 1;
										$scope.payPwdTableBox2 = false;
										$scope.payPwdSuccessBox2 = true;
									} else if (response.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo(response.status);
									}
								});
					}
				})

		.controller(
				'recordCtrl',
				function($scope, $state, AuthService, PostService) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'investManage',
						childMenu : 'record'
					});
					$scope.type = '';
					var _case = $state.current.name;
					switch (_case) {
					case 'space.record.dealAll': {
						$scope.type = '';
						break;
					}
					case 'space.record.rechargeinfo': {
						$scope.type = 103;
						break;
					}
					case 'space.record.deposit': {
						$scope.type = 102;
						break;
					}
					case 'space.record.invest': {
						$scope.type = 104;
						break;
					}
					case 'space.record.earnings': {
						$scope.type = 105;
						break;
					}
					case 'space.record.principal': {
						$scope.type = 106;
						break;
					}
					case 'space.record.lending': {
						$scope.type = 6;
						break;
					}
					case 'space.record.repayment': {
						$scope.type = 7;
						break;
					}
					}
					;

					$scope.search = function(page, type) {
						$scope.type = type;
						var smonth = $("#textfield").val(), emonth = $(
								"#textfield2").val();
						var data = {
							'smonth' : smonth,
							'emonth' : emonth,
							'type' : type,
							'page' : page
						};

						PostService.record(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										$scope.$broadcast("record_tab",
												response.data);
									} else if (response.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										$scope.$broadcast("record_tab", {
											'sumpage' : 0,
											'str' : ''
										});
									}
								}).error(function(response) {
							$broadcast("record_tab", {
								'sumpage' : 0,
								'str' : ''
							});
						})

					};
					$scope.search(1, $scope.type);
					$scope.reset = function() {
						$("#textfield").val("");
						$("#textfield2").val("");
					};
				})

		// 全部
		.controller('deelAllCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.deellist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})
		// 充值
		.controller('rechargeInfoCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.rechargelist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})
		// 提现
		.controller('depositCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.depositlist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})

		// 投资
		.controller('investSpaceCtrl', function($scope, $state, hmd) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.investlist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})

		// 收益
		.controller('earningsCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.earnlist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})
		// 回收本金
		.controller('principalCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.princilist = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})
		// 放款
		.controller('lendingCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.list = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})
		// 还款
		.controller('repaymentCtrl', function($scope, $state) {
			$scope.$state = $state;
			$scope.$emit('childMenuState', {
				menu : 'investManage',
				childMenu : 'record'
			});
			$scope.totalItems = 0;
			$scope.maxSize = 10;
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.$on("record_tab", function(event, data) {
				$scope.repaymentCtrl = data.str;
				$scope.totalItems = parseInt(data.sumpage);
			})
		})

		// 个人中心 充值
		.controller(
				'rechargeCtrl',
				function($scope, $state, AuthService, PostService, UserService,
						checkParamService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'zichanManage',
						childMenu : 'recharge'
					});

					$scope.money = '';
					$scope.money_error_msg = '';
					$scope.money_is_pass = false;
					$scope.bankNid = '9';
					$scope.banks = [ {
						'epro' : 'ICBC-NET-B2C',
						// 'gopay':'ICBC',
						'chinabank' : '1025',
						// 'sinamerchant':'ICBC',
						'src' : 'styles/images/pay/img_bankicbc.gif'
					},

					{
						'epro' : 'BOC-NET-B2C',
						// 'gopay':'BOC',
						'chinabank' : '104',
						// 'sinamerchant':'BOC',
						'src' : 'styles/images/pay/img_bankboc.gif'
					},

					{
						'epro' : 'CCB-NET-B2C',
						// 'gopay':'CCB',
						'chinabank' : '105',
						// 'sinamerchant':'CCB',
						'src' : 'styles/images/pay/img_bankccb.gif'
					},

					{
						'epro' : 'CMBCHINA-NET-B2C',
						// 'gopay':'CMB',
						'chinabank' : '3080',
						// 'sinamerchant':'CMB',
						'src' : 'styles/images/pay/img_bankcmb.gif'
					},

					{
						// 'gopay':'BOCOM',
						'chinabank' : '301',
						// 'sinamerchant':'COMM',
						'src' : 'styles/images/pay/img_bankbocom.gif'
					},

					{
						'epro' : 'GDB-NET-B2C',
						// 'gopay':'GDB',
						'chinabank' : '3061',
						// 'sinamerchant':'GDB',
						'src' : 'styles/images/pay/img_bankgdb.gif'
					},

					{
						'epro' : 'CMBC-NET-B2C',
						// 'gopay':'CMBC',
						'chinabank' : '305',
						// 'sinamerchant':'CMBC',
						'src' : 'styles/images/pay/img_bankcmbc.gif'
					},

					{
						// 'gopay':'HXBC',
						'chinabank' : '311',
						// 'sinamerchant':'HXB',
						'src' : 'styles/images/pay/img_bankhxbc.gif'
					},

					{
						// 'gopay':'CIB',
						'chinabank' : '309',
						// 'sinamerchant':'CIB',
						'src' : 'styles/images/pay/img_bankcib.gif'
					},

					{
						'epro' : 'CEB-NET-B2C',
						// 'gopay':'CEB',
						'chinabank' : '312',
						// 'sinamerchant':'CEB',
						'src' : 'styles/images/pay/img_bankceb.gif'
					},

					// {
					// 'gopay':'SDB',
					// 'src':'/styles/images/pay/img_bankspb.gif'
					// },

					{
						'epro' : 'POST-NET-B2C',
						// 'gopay':'PSBC',
						'chinabank' : '3230',
						// 'sinamerchant':'PSBC',
						'src' : 'styles/images/pay/img_bankpsbc.gif'
					},

					{
						'epro' : 'BCCB-NET-B2C',
						// 'gopay':'BOBJ',
						'chinabank' : '310',
						'src' : 'styles/images/pay/img_bankbobj.gif'
					},

					// {
					// 'gopay':'TCCB',
					// 'src':'/styles/images/pay/img_banktccb.gif'
					// },

					{
						// 'gopay':'BOS',
						'chinabank' : '326',
						// 'sinamerchant':'BOS',
						'src' : 'styles/images/pay/img_bankbos.gif'
					},

					{
						'epro' : 'PINGANBANK-NET-B2C',
						// 'gopay':'PAB',
						'chinabank' : '307',
						// 'sinamerchant':'SZPAB',
						'src' : 'styles/images/pay/img_bankpab.gif'
					},

					{
						'epro' : 'ECITIC-NET-B2C',
						// 'gopay':'CITIC',
						'chinabank' : '313',
						// 'sinamerchant':'CITIC',
						'src' : 'styles/images/pay/img_bankcitic.gif'
					},

					{
						'chinabank' : '314',
						// 'sinamerchant':'SPDB',
						'src' : 'styles/images/pay/img_bank_spd.gif'
					},

					{
						'chinabank' : '335',
						'src' : 'styles/images/pay/img_bank_bjrcb.gif'
					},

					{
						'chinabank' : '342',
						'src' : 'styles/images/pay/img_bank_cqrcb.gif'
					},

					{
						'chinabank' : '343',
						'src' : 'styles/images/pay/img_bank_srcb.gif'
					},

					{
						'chinabank' : '316',
						'src' : 'styles/images/pay/img_bank_njcb.gif'
					},

					{
						'chinabank' : '302',
						'src' : 'styles/images/pay/img_bank_ninbo.gif'
					},

					{
						'chinabank' : '324',
						'src' : 'styles/images/pay/img_bank_hangzhou.gif'
					},

					{
						'chinabank' : '336',
						'src' : 'styles/images/pay/img_bank_bocd.gif'
					},

					{
						'chinabank' : '3341',
						'src' : 'styles/images/pay/img_bank_qdccb.gif'
					} ];

					$scope.selectBank = $scope.banks[0];
					$scope.selectNo = 0;
					// 获取银行的值
					$scope.setBank = function(str, num) {
						$scope.selectBank = str;
						$scope.selectNo = num;
						$scope.selecetedPro();
					}
					// 获取支付通道
					$scope.selecetedPro = function() {
						if ($scope.selectBank.epro) {
							$scope.selectProvider = 'epro';
							$scope.selectBankId = $scope.selectBank.epro;
							$scope.providerId = 2;
						} else {
							$scope.selectProvider = 'chinabank';
							$scope.selectBankId = $scope.selectBank.chinabank;
							$scope.providerId = 1;
						}
					};
					$scope.selecetedPro();
					// 设置支付通道
					$scope.setProvider = function(num, provider) {
						$scope.selectProvider = provider;
						$scope.selectBankId = $scope.selectBank[provider];
						$scope.providerId = num;
					}
					$scope.usable = '0.00';
					// 获取可用余额
					PostService.personCenter('').success(function(res) {
						if (res.status == 1) {
							$scope.usable = res.data[0].u_balance;
						} else if (res.status == 15) {
							AuthService.clearUserInfo();
							$state.go('login', {}, {
								reload : true
							});
						} else {
							hmd.popupErrorInfo(res.status);
						}
					});

					// 验证充值金额
					$scope.yzmoney = function() {
						var obj = checkParamService.checkMoney($scope.money); // 验证不为空并且是数字组成
						$scope.money_error_msg = obj.msg;
						$scope.money_is_pass = obj.isTrue;
						return obj.isTrue;
					};
					$scope.gotoUrl = function() {
						$state.go("space.record.rechargeinfo");
					};

					$scope.phoneAuth = 0;
					$scope.IDAuth = 0;
					PostService.getAbleAccout().success(function(res) {
						if (res.status == 1) {
							var _data = res.data;
							$scope.userid = _data.userId;
						} else if (res.status == 15) {
							AuthService.clearUserInfo();
							$state.go('login', {}, {
								reload : true
							});
						} else {
							hmd.popupErrorInfo(res.status);
						}
					});

					$scope.is_phone_pass = true;
					$scope.is_auth_pass = true;
					// 获取安全级别
					UserService.getSafeLevel('').success(function(res) {
						if (res.status == 1) {
							var data = res.data[0];
							$scope.phoneAuth = data.phoneStatus;
							$scope.IDAuth = data.realNameStatus;
							if (!$scope.phoneAuth) {
								$scope.is_phone_pass = false;
							}
							if (!$scope.IDAuth) {
								$scope.is_auth_pass = false;
							}
							if (!$scope.phoneAuth || !$scope.phoneAuth) {
								$('#alertBox1').modal({
									'backdrop' : 'static'
								});
							}
						}
					});

					$scope.showPhoneBox = function() {
						var brotherElement = angular.element(document
								.getElementById('phoneBox'));
						brotherElement.animate({
							height : 'toggle',
							opacity : 'toggle'
						}, "fast");
					};

					$scope.phoneNum = '';
					$scope.phoneNumCaptcha = '';
					$scope.phoneMsg = '';
					$scope.authPhoneMsg = '';
					$scope.reaccept = true;
					$scope.authPhoneFunction = function() {
						if (!$scope.phoneNum.replace(/\s/g, '')) {
							$scope.phoneMsg = '请您输入手机号码！';
							$scope.reaccept = true;
						} else if (!/^1[34578]\d{9}$/.test($scope.phoneNum)) {
							$scope.phoneMsg = '请您输入有效的手机号！';
							$scope.reaccept = true;
						} else {
							var data = {
								phone : $scope.phoneNum
							};
							PostService.checkPhone(objToStr(data)).success(
									function(res) {
										if (res.status == 1) {
											$scope.phoneMsg = '该手机号可用!';
											$scope.reaccept = false;
										} else if (res.status == 15) {
											AuthService.clearUserInfo();
											$state.go('login', {}, {
												reload : true
											});
										} else {
											hmd.popupErrorInfo(res.status);
											$scope.reaccept = true;
										}
									});
						}
					};
					// 判断手机验证码是否为空
					$scope.authPhoneCaptFunc = function() {
						if (!$scope.phoneNumCaptcha.replace(/\s/g, '')) {
							$scope.authPhoneMsg = '请您输入手机验证码！';
							return false;
						} else {
							$scope.authPhoneMsg = '';
							return true;
						}
					};
					// 获取手机验证码
					$scope.sendPhoneCaptcha = function(phone) {
						if (!phone.replace(/\s/g, '')) {
							$scope.authPhoneMsg = '请您输入手机号码！';
							return false;
						} else if (!/^1[34578]\d{9}$/.test(phone)) {
							$scope.authPhoneMsg = '请您输入有效的手机号码！';
							return false;
						}
						var data = {
							'phone' : phone
						};
						// 向服务器端发送请求，进行手机验证码获取
						PostService
								.getPhoneCode(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.authPhoneMsg = '';
												$scope.reaccept = true;
												var maxtime = 60;
												$scope.msg = maxtime + "秒后重新获取";
												var timer = $interval(
														function() {
															if (maxtime > 0) {
																--maxtime;
																$scope.msg = maxtime
																		+ "秒后重新获取";
															} else {
																$scope.msg = '';
																$scope.reaccept = false;
																if (angular
																		.isDefined(timer)) {
																	$interval
																			.cancel(timer);
																}
															}
														}, 1000);
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.authPhoneMsg = '验证码获取异常！';
											}
										});
					}
					// 完成手机认证操作
					$scope.submitPhone = function(phone, code) {
						if (!phone.replace(/\s/g, '')) {
							$scope.phoneMsg = '请您输入手机号码！';
							return false;
						} else if (!/^1[34578]\d{9}$/.test(phone)) {
							$scope.phoneMsg = '请您输入有效的手机号码！';
							return false;
						}
						if (!$scope.authPhoneCaptFunc()) {
							return false;
						}
						var param = 'phone=' + phone + '&phoneCode=' + code;
						PostService
								.addPhoneAuth(param)
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.phoneAuth = 1;
												$scope.phoneMsg = "";
												$scope.is_phone_pass = true;
												angular
														.element(
																document
																		.getElementById('phoneBox'))
														.animate({
															height : 'toggle',
															opacity : 'toggle'
														}, "fast");
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												hmd.popupErrorInfo(res.status);
											}
										});
					};

					$scope.realName = '';
					$scope.identity = '';
					$scope.authRealMsg = '';
					$scope.IdAuthMsg = '';
					$scope.authRealName = function() {
						if (!$scope.realName.replace(/\s/g, '')) {
							$scope.authRealMsg = '姓名不可为空！';
							return false;
						} else {
							$scope.authRealMsg = '';
							return true;
						}
					};
					$scope.authID = function() {
						if (!checkParamService.AuthIDcard($scope.identity)) {
							$scope.IdAuthMsg = '请输入15或18位的身份证号码！';
							return false;
						} else {
							$scope.IdAuthMsg = '';
							return true;
						}
					}

					$scope.submitIdAuth = function() {
						if (!$scope.authRealName() || !$scope.authID()) {
							return false;
						}
						var data = {
							'realName' : $scope.realName,
							'identity' : $scope.identity
						};

						PostService
								.authIdentity(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.IDAuth = 1;
												$scope.IdAuthMsg = "";
												$scope.is_auth_pass = true;
												angular
														.element(
																document
																		.getElementById('authBox'))
														.animate({
															height : 'toggle',
															opacity : 'toggle'
														}, "fast");
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												hmd.popupErrorInfo(res.status);
												// $scope.IdAuthMsg="实名认证失败！";
											}
										});
					};

					$scope.showAuthBox = function() {
						var brotherElement = angular.element(document
								.getElementById('authBox'));
						brotherElement.animate({
							height : 'toggle',
							opacity : 'toggle'
						}, "fast");
					};

					// 确认支付
					$scope.payAccount = function() {
						// 验证用户
						var token = AuthService.getToken();
						// 验证金额
						if (!$scope.yzmoney()) {
							return false;
						} else if (!$scope.phoneAuth || !$scope.IDAuth) {
							// 如果没有做实名或手机认证
							$('#alertBox1').modal({
								'backdrop' : 'static'
							});
							return false;
						} else {
							$('#alertBox').modal({
								'backdrop' : 'static'
							});
							OpenWindow = window.open("");
							OpenWindow.document
									.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><script src="scripts/libs/jquery.1.9.min.js"></script><body><div id="msg"></div>');
							OpenWindow.document
									.write('<form name="yeepay" id="yeepay" action="https://www.yeepay.com/app-merchant-proxy/node" method="post"><input type="hidden" name="p0_Cmd" value=""><input type="hidden" name="p1_MerId" value=""><input type="hidden" name="p2_Order" value=""><input type="hidden" name="p3_Amt" value=""><input type="hidden" name="p4_Cur" value=""><input type="hidden" name="p5_Pid" value=""><input type="hidden" name="p6_Pcat" value=""><input type="hidden" name="p7_Pdesc" value=""><input type="hidden" name="p8_Url" value=""><input type="hidden" name="p9_SAF" value=""><input type="hidden" name="pa_MP" value=""><input type="hidden" name="pd_FrpId" value=""><input type="hidden" name="pr_NeedResponse" value=""><input type="hidden" name="hmac" value=""></form>');
							OpenWindow.document
									.write('<form name="chinabank" id="chinabank" action="https://pay3.chinabank.com.cn/PayGate" method="post"><input type="hidden" name="v_mid" value=""><input type="hidden" name="v_oid" value=""><input type="hidden" name="key" value=""><input type="hidden" name="v_amount" value=""><input type="hidden" name="v_moneytype" value=""><input type="hidden" name="v_url" value=""><input type="hidden" name="v_md5info" value=""><input type="hidden" name="pmode_id" value=""><input type="hidden" name="remark2" value=""></form>');
							OpenWindow.document
									.write('<script>var channels = "'
											+ $scope.selectProvider
											+ '";$.ajax({type: "POST",url: "/itcast_p2p_action/charges/charge", data: {"channel":"'
											+ $scope.selectProvider
											+ '","chargeBank":"'
											+ $scope.selectBankId
											+ '","chargeMoney":'
											+ $scope.money
											+ '},dataType: "json",beforeSend: function(request){request.setRequestHeader("token", "'
											+ token
											+ '");},success: function(res){if(res.status == 1){var data = res.data;')
							OpenWindow.document
									.write('if(channels == "chinabank"){$("input[name=\'v_mid\']").val(data.v_mid);$("input[name=\'v_oid\']").val(data.v_oid);$("input[name=\'key\']").val(data.key);$("input[name=\'v_amount\']").val(data.v_amount);$("input[name=\'v_moneytype\']").val(data.v_moneytype);$("input[name=\'v_url\']").val(data.v_url);$("input[name=\'v_md5info\']").val(data.v_md5info);$("input[name=\'pmode_id\']").val(data.pmode_id);$("input[name=\'remark2\']").val(data.remark2);document.getElementById("chinabank").submit();');
							OpenWindow.document
									.write('}else if(channels == "epro"){$("input[name=\'p0_Cmd\']").val(data.p0_Cmd);$("input[name=\'p1_MerId\']").val(data.p1_MerId);$("input[name=\'p2_Order\']").val(data.p2_Order);$("input[name=\'p3_Amt\']").val(data.p3_Amt);$("input[name=\'p4_Cur\']").val(data.p4_Cur);$("input[name=\'p8_Url\']").val(data.p8_Url);$("input[name=\'p9_SAF\']").val(data.p9_SAF);$("input[name=\'pa_MP\']").val(data.pa_MP);$("input[name=\'pd_FrpId\']").val(data.pd_FrpId);$("input[name=\'pr_NeedResponse\']").val(data.pr_NeedResponse);$("input[name=\'hmac\']").val(data.hmac);document.getElementById("yeepay").submit();}');
							OpenWindow.document
									.write('else{$("#msg").html("无效的支付渠道");}}else{window.location.href="#/login"}}});</script></body></html>');
							OpenWindow.document.close();
						}
					};
				})

		// 个人中心提现
		.controller(
				'cashNewCtrl',
				function($scope, $state, AuthService, PostService,
						checkParamService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'zichanManage',
						childMenu : 'cash'
					});
					$scope.bankInfo = '';
					$scope.money = '0';
					$scope.payPwd = '';
					$scope.captcha = ''; // 验证码
					$scope.payPwdMsg = '';
					$scope.cashMoney_error_msg = '';
					$scope.captcha_error_msg = '';
					$scope.addBankButton = true;
					$scope.ableAccount = '0.00';
					$scope.free = '0.00';
					$scope.userid = '';
					$scope.IDAuth = 0;
					$scope.payPwdAuth = 0;
					PostService
							.getAbleAccout()
							.success(
									function(res) {
										if (res.status == 1) {
											var _data = res.data;
											$scope.ableAccount = _data.availableBalance;
											$scope.free = _data.cost;
											$scope.userid = _data.userId;
											$scope.IDAuth = _data.realNameStatus;
											$scope.payPwdAuth = _data.payPwdStatus;
											$scope.bankInfo = _data.bankInfo;
											if ($scope.bankInfo) {
												var bankCard = $scope.bankInfo.bankCardNum;
												var bankCardNum_start = bankCard
														.substr(0, 4);
												var bankCardNum_end = bankCard
														.substr(
																bankCard.length - 4,
																4);
												$scope.bankNumBind = bankCardNum_start
														+ '****'
														+ bankCardNum_end;
												$scope.openingBank_bind = $scope.bankInfo.bankName;
												$scope.addBankButton = false;
											}
											if (!$scope.bankInfo
													|| !$scope.IDAuth
													|| !$scope.payPwdAuth) {
												$('#alertBox').modal({
													'backdrop' : 'static'
												});
											}
										} else if (res.status == 15) {
											AuthService.clearUserInfo();
											$state.go('login', {}, {
												reload : true
											});
										} else {
											hmd.popupErrorInfo(res.status);
										}
									});

					// 验证充值金额
					$scope.yzmoney = function() {
						var obj = checkParamService.checkMoney($scope.money);
						$scope.cashMoney_error_msg = obj.msg;
						if (obj.isTrue) {
							if ($scope.money > $scope.ableAccount) {
								$scope.cashMoney_error_msg = '提现金额超出您的可提现金额！';
								return false;
							} else {
								$scope.cashMoney_error_msg = '';
								return true;
							}
						} else {
							return obj.isTrue;
						}
					}

					// 校验验证码格式是否正确
					$scope.yzcaptcha = function() {
						var obj = checkParamService
								.checkCaptcha($scope.captcha);
						$scope.captcha_error_msg = obj.msg;
						return obj.isTrue;
					}

					$scope.authPayPwd = function() {
						if (!/^[a-zA-Z0-9]+$/.test($scope.payPwd)
								|| (str_length($scope.payPwd) < 6)
								|| (str_length($scope.payPwd) > 16)) {
							$scope.payPwdMsg = '请输入6-16位数字或字符的支付密码！';
							return false;
						} else {
							$scope.payPwdMsg = '';
							return true;
						}
					}

					$scope.uuid = '';
					PostService.getUuid().success(function(res) {
						if (res.status == 1) {
							$scope.uuid = res.uuid;
							$scope.img_src = PostService.getImg($scope.uuid);
						}
					});
					$scope.refresh = function() {
						$scope.img_src = PostService.getImg($scope.uuid);
					};

					$scope.cashMoney = function() {
						if (!$scope.yzmoney() || !$scope.authPayPwd()
								|| !$scope.yzcaptcha()) {
							return false;
						} else if ($scope.money > $scope.ableAccount) {
							$scope.cashMoney_error_msg = '提现金额超出您的可提现金额！';
							return false;
						} else {
							PostService
									.getAbleAccout()
									.success(
											function(res) {
												if (res.status == 1) {
													var _data = res.data;
													$scope.ableAccount = _data.availableBalance;
													$scope.free = _data.cost;
													$scope.userid = _data.userId;
													$scope.IDAuth = _data.realNameStatus;
													$scope.payPwdAuth = _data.payPwdStatus;
													$scope.bankInfo = _data.bankInfo;
													if ($scope.bankInfo) {
														var bankCard = $scope.bankInfo.bankCardNum;
														var bankCardNum_start = bankCard
																.substr(0, 4);
														var bankCardNum_end = bankCard
																.substr(
																		bankCard.length - 4,
																		4);
														$scope.bankNumBind = bankCardNum_start
																+ '****'
																+ bankCardNum_end;
														$scope.openingBank_bind = $scope.bankInfo.bankName;
														$scope.addBankButton = false;
													}
													if (!$scope.bankInfo
															|| !$scope.IDAuth
															|| !$scope.payPwdAuth) {
														$('#alertBox')
																.modal(
																		{
																			'backdrop' : 'static'
																		});
													} else {
														var _data = {
															'userId' : $scope.userid,
															'balance' : $scope.money,
															'payPwd' : $scope.payPwd,
															'verifyCode' : $scope.captcha,
															'verifyUuid' : $scope.uuid
														};
														PostService
																.addCashRecord(
																		objToStr(_data))
																.success(
																		function(
																				res) {
																			if (res.status == 1) {
																				$state
																						.go('space.record.deposit');
																			} else {
																				hmd
																						.popupErrorInfo(res.status);
																			}
																		});
													}
												} else if (res.status == 15) {
													AuthService.clearUserInfo();
													$state.go('login', {}, {
														reload : true
													});
												} else {
													hmd
															.popupErrorInfo(res.status);
												}
											});
						}
					};

					$scope.realName = '';
					$scope.identity = '';
					$scope.authRealMsg = '';
					$scope.IdAuthMsg = '';
					$scope.is_auth_pass = false;
					// 实名认证，判断用户名不为空
					$scope.authRealName = function() {
						if (!$scope.realName.replace(/\s/g, '')) {
							$scope.authRealMsg = '姓名不可为空！';
							return false;
						} else {
							$scope.authRealMsg = '';
							return true;
						}
					};
					// 实名认证，判断密码
					$scope.authID = function() {
						if (!checkParamService.AuthIDcard($scope.identity)) {
							$scope.IdAuthMsg = '请输入15或18位的身份证号码！';
							return false;
						} else {
							$scope.IdAuthMsg = '';
							return true;
						}
					}
					// 实名验证
					$scope.submitIdAuth = function() {
						if (!$scope.authRealName() || !$scope.authID()) {
							return false;
						}
						var data = {
							'realName' : $scope.realName,
							'identity' : $scope.identity
						};
						PostService
								.authIdentity(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.IdAuthMsg = "";
												$scope.is_auth_pass = true;
												angular
														.element(
																document
																		.getElementById('authBox'))
														.animate({
															height : 'toggle',
															opacity : 'toggle'
														}, "fast");
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.IdAuthMsg = "实名认证失败！";
											}
										});
					};
					$scope.payPwd = '';
					$scope.rePayPwd = '';
					$scope.payPwdMsg = '';
					$scope.repayPwdMsg = '';
					$scope.is_paypwd_pass = false;
					$scope.checkPayPwd = function() {
						if (!$scope.payPwd.replace(/\s/g, '')) {
							$scope.payPwdMsg = '支付密码不可为空！';
							return false;
						} else if (str_length($scope.payPwd) < 6
								|| str_length($scope.payPwd) > 16) {
							$scope.payPwdMsg = '请输入6-16位数字或字符的支付密码！';
							return false;
						} else {
							$scope.payPwdMsg = '';
							return true;
						}
					}
					$scope.recheckPayPwd = function() {
						if ($scope.payPwd != $scope.rePayPwd) {
							$scope.repayPwdMsg = '与支付密码不一致！';
							return false;
						} else {
							$scope.repayPwdMsg = '';
							return true;
						}
					}
					$scope.submitPayPwd = function(response) {
						if (!$scope.checkPayPwd() || !$scope.recheckPayPwd()) {
							return false;
						}
						var data = {
							'paypwd' : $scope.payPwd
						};
						PostService
								.setPayPwd(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.is_paypwd_pass = true;
												angular
														.element(
																document
																		.getElementById('payPwdBox'))
														.animate({
															height : 'toggle',
															opacity : 'toggle'
														}, "fast");
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												hmd.popupErrorInfo(res.status);
											}
										});

					};

					$scope.showAuthBox = function() {
						var brotherElement = angular.element(document
								.getElementById('authBox'));
						brotherElement.animate({
							height : 'toggle',
							opacity : 'toggle'
						}, "fast");
					};
					$scope.showPwdBox = function() {
						var brotherElement = angular.element(document
								.getElementById('payPwdBox'));
						brotherElement.animate({
							height : 'toggle',
							opacity : 'toggle'
						}, "fast");
					};
				})

		// 个人中心 银行卡信息
		.controller(
				'bankInfoCtrl',
				function($scope, $state, AuthService, PostService, $interval,
						hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'accoutManage',
						childMenu : 'bankinfo'
					});
					// 第一步,是否已经添加银行卡
					$scope.isExistBank = false;
					$scope.isHideBankBox = true;
					$scope.isHaveCard = false;
					$scope.isHavePhone = false;
					$scope.isHaveBranch = false;
					$scope.editBox = false;
					$scope.phonecaptcha = '';
					var data = {
						'username' : $scope.loginName
					};
					// 查询用户银行卡信息
					PostService.getCashInfo(objToStr(data)).success(
							function(res) {
								if (res.status == 1) {
									$scope.bankObj = res.data;
									var bankCard = res.data.bankCardNum;
									$scope.bankNumBind = bankCard.substr(0, 4)
											+ '****'
											+ bankCard.substr(
													bankCard.length - 4, 4);
									$scope.isExistBank = true;
								} else if (res.status == 15) {
									AuthService.clearUserInfo();
									$state.go('login', {}, {
										reload : true
									});
									return;
								} else {
									$scope.bankObj = '';
								}
							});
					// 点击添加银行卡
					$scope.editBankBox = function(_type) {
						$scope._type = _type;
						var data = {
							'username' : $scope.loginName
						};
						PostService
								.getBankUserInfo(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												if (res.data.realNameStatus == 0) {
													$state
															.go(
																	'space.security',
																	{
																		flag : 'authrealname'
																	});
													return;
												} else {
													$scope.bankUserObj = res.data;
												}
												$scope.editBox = true;
												$scope.isHideBankBox = false;

												PostService
														.getUserSafeInfo()
														.success(
																function(res) {
																	if (res.status == 1) {
																		var data = res.data[0];
																		$scope.bankUserObj.authPhone = data.phone;
																	}
																});
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												hmd.popupErrorInfo(res.status);
											}
										});
						if ($scope.bankObj) {
							$scope.infoId = $scope.bankObj.bankInfoId;
							$scope.bankNo = $scope.bankObj.bankId;
							$scope.bankName = $scope.bankObj.bankName;
							$scope.bankCardNum = $scope.bankObj.bankCardNum;
							$scope.provinceNo = $scope.bankObj.location.provinceNum;
							$scope.cityNo = $scope.bankObj.location.cityNum;
							$scope.areaNo = $scope.bankObj.location.countryNum;
							$scope.openingBank = $scope.bankObj.openingBank;
							$scope.location = $scope.bankObj.location;
							$scope.branchBank = $scope.bankObj.bankBranch;
							if ($scope.provinceNo) {
								$scope.getCity('auto');
								if ($scope.cityNo) {
									$scope.getArea('auto');
								}
							}
						} else {
							$scope.infoId = '';
							$scope.bankNo = '';
							$scope.bankName = '';
							$scope.bankCardNum = '';
							$scope.provinceNo = '';
							$scope.cityNo = '';
							$scope.areaNo = '';
							$scope.openingBank = '';
							$scope.location = '';
							$scope.branchBank = '';
						}
					};

					// 获取银行列表
					$scope.bankMsg = '';
					PostService.getAllBank('').success(function(res) {
						if (res.status == 1) {
							$scope.banks = res.data;
						} else {
							$scope.banks = '';
						}
					});

					function getBankName(bankid) {
						var len = $scope.banks.length;
						for (var i = 0; i < len; i++) {
							if ($scope.banks[i].bankId == bankid) {
								return $scope.banks[i].bankName;
							}
						}
					}
					// 获取省份列表
					$scope.items = '';
					PostService.getProvince('').success(function(res) {
						if (res.status == 1) {
							$scope.items = res.data;
						} else {
							$scope.items = '';
						}
					});
					// 获取市级列表
					$scope.citys = '';
					$scope.getCity = function(type) {
						if (type != 'auto') {
							$scope.cityNo = '';
							$scope.areaNo = '';
						}
						var data = {
							'cityAreaNum' : $scope.provinceNo
						};
						PostService.getCity(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.citys = res.data;
									} else {
										$scope.citys = '';
									}
								})
					};
					$scope.areas = '';
					$scope.getArea = function(type) {
						if (type != 'auto') {
							$scope.areaNo = '';
						}
						var data = {
							'cityAreaNum' : $scope.cityNo
						};
						PostService.getCity(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										$scope.areas = response.data;
									} else {
										$scope.areas = '';
									}
								})
					};
					$scope.yzcardNumber = function() {
						if (!(/^\d{16,19}$/.test($scope.bankCardNum))) {
							hmd.popupErrorInfo('请输入16到19位的银行卡号', 'error');
							$scope.isHaveCard = true;
							return false;
						} else {
							$scope.isHaveCard = false;
							return true;
						}
					}

					// 检查是否添加支行信息
					$scope.yzbranch = function() {
						var branch = $scope.branchBank;
						if (branch == '' || branch == null
								|| branch == undefined) {
							hmd.popupErrorInfo('请输入您的开户行支行', 'error');
							$scope.isHaveBranch = true;
							return false;
						} else {
							$scope.isHaveBranch = false;
							return true;
						}
					};
					// 取消操作
					$scope.bankCancel = function() {
						$scope.editBox = false;
						$scope.isHideBankBox = true;
					};
					$scope.getauthcode = function() {
						$scope.reaccept = true;
						var maxtime = 60;
						$scope.msg = maxtime + "秒后重新获取";
						var timer = $interval(function() {
							if (maxtime > 0) {
								--maxtime;
								$scope.msg = maxtime + "秒后重新获取";
							} else {
								$scope.msg = '';
								$scope.reaccept = false;
								if (angular.isDefined(timer)) {
									$interval.cancel(timer);
								}
							}
						}, 1000);
						var data = {
							phone : $scope.bankUserObj.authPhone
						};
						PostService.getPhoneCode(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										hmd.popupErrorInfo('手机验证码已发送', 'ok');
									} else {
										hmd.popupErrorInfo('手机验证码发送失败，请稍后重试！',
												'error');
									}
								});
					}
					// 完成添加银行卡操作
					$scope.saveBank = function(_type) {
						if (!$scope.bankNo) {
							hmd.popupErrorInfo('请选择开户银行', 'error');
							return false;
						}
						if (!$scope.provinceNo || !$scope.cityNo) {
							hmd.popupErrorInfo('请选择开户城市', 'error');
							return false;
						}
						if (!$scope.yzcardNumber() || !$scope.yzbranch()) {
							$scope.yzcardNumber();
							$scope.yzbranch();
							return false;
						}
						var data = {
							'userRealName' : $scope.bankUserObj.realName,
							'bankId' : $scope.bankNo,
							'bankCardNum' : $scope.bankCardNum,
							'provinceNum' : $scope.provinceNo,
							'cityNum' : $scope.cityNo,
							'countryNum' : $scope.areaNo,
							'openingBank' : getBankName($scope.bankNo),
							'reservePhone' : $scope.bankUserObj.authPhone,
							'bankBranch' : $scope.branchBank,
							'identity' : $scope.bankUserObj.identity,
							'username' : $scope.loginName,
							'bankInfoId' : $scope.infoId
						};
						var data_ = {
							phone : $scope.bankUserObj.authPhone,
							code : $scope.phonecaptcha
						};
						PostService
								.checkPhoneCode(objToStr(data_))
								.success(
										function(res) {
											if (res.status == 1) {
												if (_type == 'add') {
													PostService
															.addBankCardInfo(
																	objToStr(data))
															.success(
																	function(
																			res) {
																		if (res.status == 1) {
																			$scope.addBankInfoMsg = '银行卡添加成功！';
																			$state
																					.go(
																							'space.bankinfo',
																							{},
																							{
																								reload : true
																							});
																		} else if (res.status == 15) {
																			AuthService
																					.clearUserInfo();
																			$state
																					.go(
																							'login',
																							{},
																							{
																								reload : true
																							});
																		} else {
																			hmd
																					.popupErrorInfo(res.status);
																		}
																	});
												} else {
													PostService
															.do_updateBankInfo(
																	objToStr(data))
															.success(
																	function(
																			res) {
																		if (res.status == 1) {
																			$scope.modifyBankInfoMsg = '银行卡修改成功!';
																			$state
																					.go(
																							'space.bankinfo',
																							{},
																							{
																								reload : true
																							});
																		} else if (res.status == 15) {
																			AuthService
																					.clearUserInfo();
																			$state
																					.go(
																							'login',
																							{},
																							{
																								reload : true
																							});
																		} else {
																			hmd
																					.popupErrorInfo(res.status);
																		}
																	});
												}
											} else {
												hmd.popupErrorInfo(res.status);
											}
										})
					};
				})

		// 产品投资页面
		.controller(
				'motoCtrl',
				function($rootScope, $scope, $state, AuthService, UserService,
						PostService, hmd) { // 1 月存 2 月乘 3 月取
					if (typeof ($rootScope.aId) !== 'undefined') {
						hmd.scrollToTop(470);
					} else {
						hmd.scrollToTop();
					}
					var moto = $scope.moto = {};
					moto.ifDisable = true
					// 拖动条
					moto.slider = {
						'options' : {
							disabled : true
						}
					}
					// 遍历类名叫motoNum元素
					$(".motoNum")
							.each(
									function(index, element) {
										$(element)
												.click(
														function() {
															var msg = index + 1
															// 判断用户是否登录
															if (!(AuthService
																	.isAuthenticated() && AuthService
																	.getToken())) {
																$scope
																		.refresh();
																$(
																		'#myModal_login')
																		.modal(
																				{
																					'backdrop' : 'static'
																				});
															} else {
																var mTou_intro = $('#mTou_intro');
																mTou_intro
																		.click(function(
																				e) {
																			var target = e.target;
																			if (target.nodeName === 'A'
																					&& $(
																							target)
																							.attr(
																									'name') === 'moto-buying') {
																				$(
																						'a[name=moto-buying]')
																						.removeClass(
																								'current2fa8e1');
																				$(
																						target)
																						.addClass(
																								'current2fa8e1');
																			}
																		});

																moto.activeTab = msg;
																moto.amount = ''; // 投入金额
																moto.yield = 0; // 利率
																moto.interestArr = ''; //
																moto.interest = '0.00'; // 预期收益
																moto.withdraw = 0; // 提取金额
																var str = "pid="
																		+ msg;
																PostService
																		.getYearInterest(
																				str)
																		.success(
																				function(
																						response) {
																					if (response.status == 1) {
																						moto.interestArr = response.data;
																						moto.period = moto.interestArr[0].endMonth; // 显示月份

																						for (var i = 0; i < response.data.length; i++) {
																							if (moto.period == response.data[i].endMonth) {
																								moto.yield = response.data[i].incomeRate
																							}
																						}
																					} else {
																						$scope.error = '用户名或密码错误！';
																					}
																				});
															}
														})
									});
					if (typeof ($rootScope.aId) !== 'undefined') {
						$(".motoNum").eq($rootScope.aId).click();
					}

					// 拖动条对于其他元素的影响
					$scope
							.$watch(
									'moto.period',
									function(newVal, oldVal) {
										if (newVal === oldVal)
											return false;
										for (var i = 0; i < moto.interestArr.length; i++) {
											if (newVal == moto.interestArr[i].endMonth) {
												moto.yield = moto.interestArr[i].incomeRate;
												if (moto.activeTab == 3) {
													var temNum = moto.yield / 100 / 12 * 1000000;
													var _index = String(temNum)
															.indexOf('.');
													if (_index > 0) {
														temNum = (String(temNum)
																.substring(0,
																		_index)) / 1000000;
													} else {
														temNum = temNum / 1000000;
													}
													moto.interest = (moto.amount * temNum)
															.toFixed(2);
													moto.withdraw = moto.interest;
												} else if (moto.activeTab == 2) {
													var temNum = (moto.yield / 100 / 12)
															.toFixed(6);
													moto.interest = (moto.amount
															* temNum * newVal)
															.toFixed(2);
												} else if (moto.activeTab == 1) {
													moto.interest = (moto.amount
															* moto.yield
															/ 100
															* newVal * ((parseInt(newVal) + 1) / 24))
															.toFixed(2);
												}
											}
										}

										var period_showing = $('#period_showing');
										var month_labels_width = period_showing
												.outerWidth() / 2;
										var ui_slider_handle = $(
												'.ui-slider-handle')
												.css('left');
										if (ui_slider_handle == undefined) {
											ui_slider_handle = 0;
										} else {
											ui_slider_handle = ui_slider_handle
													.replace(/px/, '');
										}
										var _width = ui_slider_handle
												- month_labels_width;
										period_showing.css({
											'left' : _width
										});
									});

					// 输入金额对于其他元素的影响
					$scope
							.$watch(
									'moto.amount',
									function(newVal, oldVal) {
										if (newVal === oldVal)
											return;
										if (moto.amount > 0) {
											moto.slider = {
												'options' : {
													disabled : false
												}
											};
											moto.ifDisable = false
										} else {
											moto.slider = {
												'options' : {
													disabled : true
												}
											};
											moto.ifDisable = true
										}
										if (moto.activeTab == 3) {
											var temNum = moto.yield / 100 / 12 * 1000000;
											var _index = String(temNum)
													.indexOf('.');
											if (_index > 0) {
												temNum = (String(temNum)
														.substring(0, _index)) / 1000000;
											} else {
												temNum = temNum / 1000000;
											}
											moto.interest = (moto.amount * temNum)
													.toFixed(2);
											moto.withdraw = moto.interest;
										} else if (moto.activeTab == 2) {
											var temNum = (moto.yield / 100 / 12)
													.toFixed(6);
											moto.interest = (moto.amount
													* temNum * moto.period)
													.toFixed(2);
										} else if (moto.activeTab == 1) {
											var numTem = ((parseInt(moto.period) + 1) / 24)
													.toFixed(5);
											moto.interest = (moto.amount
													* moto.yield / 100
													* parseInt(moto.period) * numTem)
													.toFixed(2);
										}
									});

					// 表单验证
					$scope.checkAmount = function() {
						if (/\D/g.test(moto.amount)) {
							$(".error-info").css("display", "inline-block")
							moto.interest = '0.00';
						}
					}
					$scope.checkInt = function() {
						var reg = /^\d+$/;
						if (!reg.test(parseInt(moto.amount) / 100)) {
							$(".error-info").css("display", "inline-block");
						} else {
							$(".error-info").css("display", "none");
						}
					}
					$scope.checkNum = function() {
						var reg = /^[0-9]+\.[0-9]{2}$|^[0-9]+$/;
						var reg1 = /\./;
						if (!moto.withdraw) {
							moto.withdraw = '0.00';
						} else if (!reg.test(moto.withdraw)) {
							moto.withdraw = moto.interest;
						} else {
							if (reg1.test(moto.withdraw)) {
								if (parseFloat(moto.withdraw) * 100 > parseFloat(moto.interest) * 100) {
									moto.withdraw = moto.interest;
								}
							} else {
								if (parseInt(moto.withdraw) > parseInt(moto.interest)) {
									moto.withdraw = moto.interest;
								}
							}
						}
					};
					// 页面登录
					$scope.uuid = '';
					$scope.captcha = '';
					$scope.username = '';
					$scope.password = '';
					$scope.refresh = function() {
						$scope.captcha = '';
						PostService.getUuid().success(
								function(res) {
									if (res.status == 1) {
										$scope.uuid = res.uuid;
										$scope.img_src = PostService
												.getImg($scope.uuid);
									}
								});
					};

					$scope.login = function(uname, pwd) {
						if (/^\s*$/.test(uname) || /^\s*$/.test(pwd)) {
							$scope.error = '请输入用户名或密码！';
							return false;
						} else if (/^\s*$/.test($scope.captcha)) {
							$scope.error = '请输入验证码！';
							return false;
						}
						var data = {
							username : uname,
							password : pwd,
							signUuid : $scope.uuid,
							signCode : $scope.captcha
						};
						UserService
								.signIn(objToStr(data))
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.error = '';
												AuthService.setToken(res.token);
												$rootScope.loginName = $scope.username;
												AuthService.setCookie('user',
														res.data.userName);
												AuthService.setCookie('uid',
														res.data.id);
												UserService
														.getSafeLevel('')
														.success(
																function(res) {
																	if (res.status == 1) {
																		var data = res.data[0];
																		if (!data.phoneStatus) {
																			$state
																					.go(
																							'space.security',
																							{
																								flag : 'authphone'
																							});
																		}
																		$state
																				.go(
																						"moto",
																						{},
																						{
																							reload : true
																						});
																		$(
																				'#myModal_login')
																				.modal(
																						'hide');
																	} else {
																		$scope.error = '登录异常';
																	}
																});
											} else if (res.status == 140) {
												$scope.error = '您的账号已被锁定';
											} else if (res.status == 27) {
												$scope.error = '您输入的验证码错误！';
												$scope.refresh();
											} else {
												$scope.error = '用户名或密码错误！';
												$scope.refresh();
											}
										});
					};
					// 显示moto购买页面
					$scope.isResubmit = true;
					// 确认购买
					$scope.showModal = function() {
						$scope.isResubmit = true;
						var chk_status = $('#chk_status');
						if (!chk_status[0].checked) {
							hmd.popupErrorInfo('您尚未选择同意个人出借咨询与服务，不可购买！',
									'error');
							return false;
						} else if (moto.amount > 0) {
							var str = 'account=' + moto.amount;
							PostService
									.checkAccount(str)
									.success(
											function(response) {
												if (response.status == 1) {
													$('#confirm_modal').modal({
														'backdrop' : 'static'
													});
												} else if (response.status == 15) {
													AuthService.clearUserInfo();
													$state.go('login', {}, {
														reload : true
													});
												} else if (response.status == 17) {
													$('#toCharge_modal')
															.modal(
																	{
																		'backdrop' : 'static'
																	});
												} else {
													hmd
															.popupErrorInfo(response.status);
												}
											})
						}
					};
					// 确认购买理财产品
					$scope.buyPlan = function() {
						$scope.isResubmit = false;
						var data = {
							'pProductId' : moto.activeTab,
							'pAmount' : moto.amount,
							'pDeadline' : moto.period,
							'pExpectedAnnualIncome' : moto.yield,
							'pMonthInterest' : moto.interest,
							'pMonthlyExtractInterest' : moto.withdraw
						};
						var str = objToStr(data);
						// 月存计划
						if (moto.activeTab == 1) {

						} else if (moto.activeTab == 2) { // 月乘计划

						} else if (moto.activeTab == 3) { // 月取计划
							PostService
									.withdraw(str)
									.success(
											function(response) {
												if (response.status == 1) {
													// 购买成功
													$state
															.go("space.myinvest.buying");
												} else if (response.status == 15) {
													AuthService.clearUserInfo();
													$state.go('login', {}, {
														reload : true
													});
												} else {
													$('#confirm_modal').modal(
															'hide');
													$scope.isResubmit = true;
													hmd
															.popupErrorInfo(response.status);
												}
											});
						}
					};
				})

		// 我要借款
		.controller(
				'lendCtrls',
				function($rootScope, $scope, $state, PostService, hmd) {
					$scope.$state = $state;
					$scope.enable = true;
					$scope.inverNum = function() {
						$('#textfield')
								.val(
										$('#textfield')
												.val()
												.replace(
														/[a-zA-Z\u4E00-\u9FA5\!\@\#\$\%\^\&\*\(\)]|^0/g,
														""));
						alertval();
					}
					$scope.inverNumber = function() {
						var reg = /^([1-9](\d+)?(\.\d{2})?)$/;
						if (!reg.test($('#textfield').val())) {
							$scope.lend_error_msg = "借款金额必须为整数或保留两位小数如100或100.00";
							$scope.enable = true;
						} else {
							$scope.lend_error_msg = '';
						}
						alertval();
					}
					$scope.yzrealname = function() {
						var reg = /^[\u4e00-\u9fa5]{0,}$/;
						if (!$('#textfield5').val()) {
							$scope.name_error_msg = '请输入您的姓名!'
							$scope.enable = true;
						} else if (!reg.test($('#textfield5').val())) {
							$scope.name_error_msg = '只能输入中文姓名!';
							$scope.bStop = false;
							$scope.enable = true;
						} else {
							$scope.name_error_msg = ''
						}
						alertval();
					}

					// 实现三级联动
					PostService.getProvince('').success(function(response) {
						if (response.status == 1) {
							$scope.provinces = response.data;
						} else {
							hmd.popupErrorInfo(response.status);
						}
					});

					$scope.citys = '';
					$scope.selProvinces = function() {
						var thisinput = $("#textfield3")
						var thisul = $(".options").eq(0);
						if (thisul.css("display") == "none") {
							if (thisul.height() > 140) {
								thisul.css({
									"height" : "140px",
									"overflow-y" : "scroll"
								})
							}
							;
							thisul.show();
							thisul.hover(function() {
							}, function() {
								thisul.hide();
							})
							thisul
									.find("li")
									.click(
											function() {
												thisinput.val($(this).find('a')
														.html());
												thisinput.attr("name", $(this)
														.attr("value"));
												var data = {
													'cityAreaNum' : $(
															"#textfield3")
															.attr("name")
												};
												PostService
														.getCity(objToStr(data))
														.success(
																function(
																		response) {
																	if (response.status == 1) {
																		$scope.citys = response.data;
																	} else {
																		hmd
																				.popupErrorInfo(response.status);
																	}
																});
												thisul.hide();
											});
						} else {
							thisul.hide();
						}
					}
					$scope.selZone = function() {
						if ($("#textfield3").val() !== '请选择') {
							var thisinput = $("#textfield4")
							var thisul = $(".options").eq(1);
							if (thisul.css("display") == "none") {
								if (thisul.height() > 140) {
									thisul.css({
										"height" : "140px",
										"overflow-y" : "scroll"
									})
								}
								;
								thisul.show();
								thisul.hover(function() {
								}, function() {
									thisul.hide();
								})
								thisul
										.find("li")
										.click(
												function() {
													thisinput.val($(this).find(
															'a').html());
													thisinput
															.attr("name", $(
																	this).attr(
																	"value"));
													thisul.hide();
													var data = {
														'cityAreaNum' : $(
																"#textfield4")
																.attr("name")
													};
													PostService
															.getCity(
																	objToStr(data))
															.success(
																	function(
																			response) {
																		if (response.status == 1) {
																			$scope.zones = response.data;
																		} else {
																			hmd
																					.popupErrorInfo(response.status);
																		}
																	});
												});
							} else {
								thisul.hide();
							}
						}
					}

					$scope.selArea = function() {
						if ($("#textfield3").val() !== '请选择'
								&& $("#textfield4").val() !== '请选择') {
							var thisinput = $("#textfieldA")
							var thisul = $(".options").eq(2);
							if (thisul.css("display") == "none") {
								if (thisul.height() > 140) {
									thisul.css({
										"height" : "140px",
										"overflow-y" : "scroll"
									})
								}
								;
								thisul.show();
								thisul.hover(function() {
								}, function() {
									thisul.hide();
								})
								thisul.find("li").click(
										function() {
											thisinput.val($(this).find('a')
													.html());
											thisinput.attr("name", $(this)
													.attr("value"));
											thisul.hide();
										});
							} else {
								thisul.hide();
							}
						}
					}

					// 获取验证码
					$scope.timeDown = function() {
						if (!$scope.yzphone()) {
							return false;
						}
						var minute = 0, second = 0, Timer = null, intDiff = 59;// 时间默认
						$("#button2").attr('disabled', true);
						$("#button2").css("background", "#999");
						$(".inver_tip").css("display", "inline-block");
						Timer = setInterval(function() {
							if (intDiff > 0) {
								second = Math.floor(intDiff) - (minute * 60);
							}
							if (minute <= 9)
								minute = '0' + minute;
							if (second <= 9)
								second = '0' + second;
							$(".inver_tip").html(second + '秒');
							intDiff--;
							if (second <= 01) {
								clearInterval(Timer);
								setTimeout(function() {
									$("#button2").attr('disabled', false);
									$(".inver_tip").css("display", "none");
									$("#button2").css("background", "#ff8323");
								}, 1000)
							}
						}, 1000);
						var data = {
							'phone' : $scope.phone
						}
						PostService.getPhoneCode(objToStr(data)).success(
								function(response) {
									if (response.status == 1) {
										hmd.popupErrorInfo('短信发送成功！', 'ok');
									} else {
										hmd.popupErrorInfo(response.status);
									}
								});
					}

					// 验证手机号
					$scope.phone = '';
					$scope.yzphone = function() {
						var phone = $scope.phone;
						if (/^\s*$/.test(phone)) {
							$scope.phone_error_msg = '请输入您的手机号码';
							$scope.enable = true;
							return false;
						} else if (!(/^1[34578]\d{9}$/.test(phone))) {
							$scope.phone_error_msg = '您输入的手机号码格式不正确';
							$scope.enable = true;
							return false;
						} else {
							$scope.phone_error_msg = '';
							return true;
						}
						alertval();
					};

					// 验证手机号和验证码的一致性
					$scope.inverMessage = function() {
						alertval();
					}

					// 表单提交的验证
					function alertval() {
						if ($('#textfield3').val() == '请选择'
								|| $('#textfield4').val() == '请选择'
								|| $('#textfieldA').val() == '请选择'
								|| $scope.phone_error_msg !== ''
								|| $scope.name_error_msg !== ''
								|| $scope.lend_error_msg !== ''
								|| !$scope.verify) {
							$scope.enable = true;
						} else {
							$scope.enable = false;
						}
					}

					// 表单提交的接口
					$scope.submitMsg = '';
					$scope.processForm = function() {
						var dataVerify = {
							'phone' : $scope.phone,
							'code' : $scope.verify
						};

						PostService
								.checkPhoneCode(objToStr(dataVerify))
								.success(
										function(response) {
											if (response.status == 1) {
												var data = {
													'loanUsername' : $scope.realname,
													'sex' : $(
															"input[type='radio']:checked")
															.val(),
													'loanMoney' : $scope.lendnum,
													'phone' : $scope.phone,
													'loanVerify' : $scope.verify,
													'address' : $("#textfieldA")
															.attr("name")
												};

												PostService
														.lendSuccess(
																objToStr(data))
														.success(
																function(
																		response) {
																	if (response.status == 1) {
																		$(
																				'#msg')
																				.html(
																						'您的借款申请已经提交成功,三秒后回到首页！');
																		$(
																				'#alertBox')
																				.modal(
																						{
																							'backdrop' : 'static'
																						});
																		setTimeout(
																				function gotoindex() {
																					$(
																							'#alertBox')
																							.modal(
																									'hide');
																					$state
																							.go("index");
																				},
																				3000);
																	} else if (response.status == 1001) {
																		$(
																				'#msg')
																				.html(
																						'金额输入格式不正确，您可以输入整数或保留两位小数，如10000.00。');
																		$(
																				'#alertBox')
																				.modal(
																						'hide');
																		setTimeout(
																				function gotoindex() {
																					$(
																							'#alertBox')
																							.modal(
																									'hide');
																				},
																				3000);
																		return false;
																	} else {
																		hmd
																				.popupErrorInfo(response.status);
																	}
																});
											} else {
												hmd
														.popupErrorInfo(response.status);
											}
										});
					}

				})

		// 资产统计
		.controller(
				'asset_statistics',
				function($scope, $state, AuthService, PostService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'zichanManage',
						childMenu : 'stat'
					});
					$scope.total = '0.00';
					$scope.profit = '0.00';
					$scope.monthwithdraw = {
						"label" : "月取计划",
						"value" : '0.00'
					};
					$scope.monthsave = {
						"label" : "月存计划",
						"value" : '0.00'
					};
					$scope.monthmulti = {
						"label" : "月乘计划",
						"value" : '0.00'
					};

					hmd
							.managePostService(
									'statistic',
									PostService,
									'',
									$scope,
									function(response) {
										var _data = response.data[0], list_all = [], list_new = [], lists = [], _flag = false;
										$scope.total = _data['u_total'];
										$scope.donutchart = [
												{
													"label" : "可用余额",
													"value" : _data['u_balance']
												},
												{
													"label" : "待收收益",
													"value" : _data['u_interest_total_w']
												},
												{
													"label" : "待收本金",
													"value" : _data['u_investment_w']
												},
												{
													"label" : "可用代金券",
													"value" : _data['u_voucher']
												} /*
													 * , { "label":"冻结资金",
													 * "value":_data['u_frozen'] }
													 */];

										$($scope.donutchart)
												.each(
														function(index, element) {
															list_new
																	.push([
																			element['label'],
																			element['value'] ]);
															if (element.value) {
																_flag = true;
															}
														});
										if (_flag) {
											hmd
													.getPieAllDataByProduct(list_new);
										}
									});

					hmd
							.managePostService(
									'getTotalRevenue',
									PostService,
									'',
									$scope,
									function(res) {
										if (res.data.length > 0) {
											$scope.profit = res.data[0].totalRevenue;
											$scope.monthwithdraw.value = res.data[0].MonthFetch;
											$scope.monthsave.value = res.data[0].MonthSave;
											$scope.monthmulti.value = res.data[0].MonthRide;
										}
									});

					hmd
							.managePostService(
									'getMonthFetch',
									PostService,
									'',
									$scope,
									function(res) {
										if (res.data.length > 0) {
											var data_arr = [];
											$(res.data)
													.each(
															function(index,
																	element) {
																data_arr
																		.push({
																			'UExpectedDate' : element.UExpectedDate
																					.substring(
																							0,
																							7),
																			'UExpectedMoney' : element.UExpectedMoney
																		})
															});
											this.barchart = data_arr;
											hmd.getLineAllDataByProduct();
										} else {
											$('#barchart')
													.html(
															'<span style="font-size:20px">没有数据！<span>');
										}
									});

					$scope.changeLineChart = function(num, oid) {
						var $obj = $('#' + oid);
						$obj.find('li').removeClass('on');
						$($obj.find('li')[num]).addClass('on');
						var data = $scope.barchart
						if (num == 0) {
							hmd
									.managePostService(
											'getMonthFetch',
											PostService,
											'',
											$scope,
											function(response) {
												var data_arr = [];
												$(response.data)
														.each(
																function(index,
																		element) {
																	data_arr
																			.push({
																				'UExpectedDate' : element.UExpectedDate
																						.substring(
																								0,
																								7),
																				'UExpectedMoney' : element.UExpectedMoney
																			})
																});
												this.barchart = data_arr;
												hmd
														.getLineAllDataByProduct('月取计划');
											});
						}

						if (num == 1) {

							hmd
									.managePostService(
											'getMonthSave',
											PostService,
											'',
											$scope,
											function(response) {
												var data_arr = [];
												$(response.data)
														.each(
																function(index,
																		element) {
																	data_arr
																			.push({
																				'UExpectedDate' : element.UExpectedDate
																						.substring(
																								0,
																								7),
																				'UExpectedMoney' : element.UExpectedMoney
																			})
																});
												this.barchart = data_arr;
												hmd
														.getLineAllDataByProduct('月存计划');
											});

						}

						if (num == 2) {
							hmd
									.managePostService(
											'getMonthRide',
											PostService,
											'',
											$scope,
											function(response) {
												var data_arr = [];
												$(response.data)
														.each(
																function(index,
																		element) {
																	data_arr
																			.push({
																				'UExpectedDate' : element.UExpectedDate
																						.substring(
																								0,
																								7),
																				'UExpectedMoney' : element.UExpectedMoney
																			})
																});
												this.barchart = data_arr;
												hmd
														.getLineAllDataByProduct('月乘计划');
											});

						}
					}
				})

		// 投资管理 ---- 我的投资
		.controller(
				'myinvestCtrl',
				function(AuthService, $scope, $state, PostService, hmd) {
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 2;
					var date_start = $('#date_start'), date_end = $('#date_end'), tabMenu = $('#tabMenu'), _service = '', _code = '', str = '';
					$scope.getDataByDate = function() {
						getInvestDataByStatus(1);
					}

					function getInvestDataByStatus(currentPage) {
						_service = tabMenu.find('li.cur').find('a').attr(
								'for-service');
						_code = tabMenu.find('li.cur').find('a').attr('_code');
						str = 'status=' + _code + '&startDate='
								+ date_start.val() + '&endDate='
								+ date_end.val();
						hmd.managePostService(_service, PostService, str
								+ '&currentPage=' + currentPage, $scope,
								function(response) {
									$scope.books = response.data;
									$scope.totalItems = response.total;
									$scope.$broadcast("books_arr", response);
								});
					}

					$scope.reset = function() {
						$("#date_start").val("");
						$("#date_end").val("");
					};

				})

		.controller(
				'buyingCtrl',
				function(AuthService, $scope, $state, PostService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'investManage',
						childMenu : 'myinvest'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 2;

					$scope.$on('books_arr', function(event, data) {
						$scope.books = data.data;
						$scope.totalItems = data.total;
					});

					var date_start = $('#date_start'), date_end = $('#date_end'), tabMenu = $('#tabMenu'), _service = tabMenu
							.find('li.cur').find('a').attr('for-service'), _code = tabMenu
							.find('li.cur').find('a').attr('_code'), str = 'status='
							+ _code
							+ '&startDate='
							+ date_start.val()
							+ '&endDate=' + date_end.val();
					function getInvestDataByStatus(currentPage) {
						$scope.currentPage = currentPage;
						hmd.managePostService(_service, PostService, str
								+ '&currentPage=' + currentPage, $scope,
								function(response) {
									$scope.books = response.data;
									$scope.totalItems = response.total;
								});
					}
					function init() {
						getInvestDataByStatus(1);
					}
					init();
					$scope.getData = function(currentPage) {
						getInvestDataByStatus(currentPage);
					};

				})

		.controller(
				'returningCtrl',
				function(AuthService, $scope, $state, PostService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'investManage',
						childMenu : 'myinvest'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;

					$scope.$on('books_arr', function(event, data) {
						$scope.books = data.data;
						$scope.totalItems = data.total;
					});

					var date_start = $('#date_start'), date_end = $('#date_end'), tabMenu = $('#tabMenu'), _service = tabMenu
							.find('li.cur').find('a').attr('for-service'), _code = tabMenu
							.find('li.cur').find('a').attr('_code'), str = 'status='
							+ _code
							+ '&startDate='
							+ date_start.val()
							+ '&endDate=' + date_end.val();
					function getInvestDataByStatus(currentPage) {
						$scope.currentPage = currentPage;
						hmd.managePostService(_service, PostService, str
								+ '&currentPage=' + currentPage, $scope,
								function(response) {
									$scope.books = response.data;
									$scope.totalItems = response.total;
								});
					}
					function init() {
						getInvestDataByStatus(1);
					}
					init();
					$scope.getData = function(currentPage) {
						getInvestDataByStatus(currentPage);
					};

				})

		.controller(
				'clearedCtrl',
				function(AuthService, $scope, $state, PostService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'investManage',
						childMenu : 'myinvest'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;

					$scope.$on('books_arr', function(event, data) {
						$scope.books = data.data;
						$scope.totalItems = data.total;
					});

					var date_start = $('#date_start'), date_end = $('#date_end'), tabMenu = $('#tabMenu'), _service = tabMenu
							.find('li.cur').find('a').attr('for-service'), _code = tabMenu
							.find('li.cur').find('a').attr('_code'), str = 'status='
							+ _code
							+ '&startDate='
							+ date_start.val()
							+ '&endDate=' + date_end.val();
					function getInvestDataByStatus(currentPage) {
						$scope.currentPage = currentPage;
						hmd.managePostService(_service, PostService, str
								+ '&currentPage=' + currentPage, $scope,
								function(response) {
									$scope.books = response.data;
									$scope.totalItems = response.total;
								});
					}
					function init() {
						getInvestDataByStatus(1);
					}
					init();
					$scope.getData = function(currentPage) {
						getInvestDataByStatus(currentPage);
					};

				})

		.controller(
				'setnoticeCtrl',
				function($scope, $state, AuthService, PostService, hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'msgManage',
						childMenu : 'notice'
					});
					var userId = AuthService.getCookie('uid');
					var param = "userId=" + userId;
					PostService.getNoticeSet(param).success(function(res) {
						if (res.status == 1) {
							var data = res.data;
							for (var i = 0; i < data.length; i++) {
								var ob = data[i];
								switch (ob.operationTypeConversion) {
								case 10:
									if (ob.noticeType == 1) {
										$scope.recharge1 = true;
									} else if (ob.noticeType == 2) {
										$scope.recharge2 = true;
									} else if (ob.noticeType == 0) {
										$scope.recharge0 = true;
									}
									break;
								case 20:
									if (ob.noticeType == 1) {
										$scope.cash1 = true;
									} else if (ob.noticeType == 2) {
										$scope.cash2 = true;
									} else if (ob.noticeType == 0) {
										$scope.cash0 = true;
									}
									break;
								case 40:// 积分
									if (ob.noticeType == 1) {
										$scope.award1 = true;
									} else if (ob.noticeType == 2) {
										$scope.award2 = true;
									} else if (ob.noticeType == 0) {
										$scope.award0 = true;
									}
									break;
								case 50:// 活动推送
									if (ob.noticeType == 1) {
										$scope.active1 = true;
									} else if (ob.noticeType == 2) {
										$scope.active2 = true;
									} else if (ob.noticeType == 0) {
										$scope.active0 = true;
									}
									break;
								case 60:
									if (ob.noticeType == 1) {
										$scope.invest1 = true;
									} else if (ob.noticeType == 2) {
										$scope.invest2 = true;
									} else if (ob.noticeType == 0) {
										$scope.invest0 = true;
									}
									break;
								case 30:
									if (ob.noticeType == 1) {
										$scope.payinterest1 = true;
									} else if (ob.noticeType == 2) {
										$scope.payinterest2 = true;
									} else if (ob.noticeType == 0) {
										$scope.payinterest0 = true;
									}
									break;
								}
							}
						}
					});

					$scope.submitNotice = function() {
						var param = "userId=" + userId;
						var notictype = angular.element(document
								.getElementsByName('noticetype'));
						for (var i = 0; i < notictype.length; i++) {
							var option = angular.element(document
									.getElementsByName(notictype[i].value));
							var optiontype = [];
							for (var j = 0; j < option.length; j++) {
								if (option[j].checked) {
									optiontype.push(option[j].value);
								}
							}
							switch (notictype[i].value) {
							case 'recharge':
								if (optiontype.length > 0) {
									param += '&operation='
											+ optiontype.join(',');
								}
								break;
							case 'cash':
								if (optiontype.length > 0) {
									param += '&withdraw='
											+ optiontype.join(',');
								}
								break;
							case 'acvtive':
								if (optiontype.length > 0) {
									param += '&activities='
											+ optiontype.join(',');
								}
								break;
							case 'award':
								if (optiontype.length > 0) {
									param += '&consumption='
											+ optiontype.join(',');
								}
								break;
							case 'invest':
								if (optiontype.length > 0) {
									param += '&investmenti='
											+ optiontype.join(',');
								}
								break;
							case 'payinterest':
								if (optiontype.length > 0) {
									param += '&servicingi='
											+ optiontype.join(',');
								}
								break;
							}
						}
						$scope.noticeMsg = '';
						PostService.submitNoticeSet(param).success(
								function(res) {
									if (res.status == 1) {
										hmd.popupErrorInfo('通知设置成功！', 'ok');
									} else if (res.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										hmd.popupErrorInfo('通知设置失败！', 'error');
									}
								});
					};
				})
		.controller(
				'allMsgCtrl',
				function($scope, $state, AuthService, PostService, hmd) {// 获取用户消息列表
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'msgManage',
						childMenu : 'instation'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;
					$scope.list = [];
					$scope.Msg = '';
					$scope.getList = function(pageno) {
						var param = 'userId=' + AuthService.getCookie('uid')
								+ '&offset=' + pageno;
						PostService
								.getAllMsg(param)
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.totalItems = parseInt(res.data.totalNumber);
												$scope.list = res.data.list;
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.Msg = '暂无数据！';
											}
										});
					};
					$scope.getList($scope.currentPage);
					$scope.setReaded = function(uid, msgid) {
						var _d = $('#msg_' + msgid).attr('_data');
						if (_d == 1) {
							return false;
						}
						var _param = 'userId=' + uid + '&messageId=' + msgid;
						PostService.setMsgReaded(_param).success(function(res) {
							if (res.status == 1) {
								$('#msg_' + msgid).attr('_data', 1);
								$('#mg_' + msgid).hide();
							}
						});
					};
				})

		.controller(
				'readedMsgCtrl',
				function($scope, $state, AuthService, PostService, hmd) {// 获取用户消息列表
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'msgManage',
						childMenu : 'instation'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;
					$scope.Msg = '';
					$scope.getList = function(pageno) {
						var param = 'userId=' + AuthService.getCookie('uid')
								+ '&offset=' + pageno;
						PostService
								.getReadedMsg(param)
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.totalItems = parseInt(res.data.totalNumber);
												$scope.list = res.data.list;
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.Msg = '暂无数据！';
											}
										});
					};
					$scope.getList($scope.currentPage);
				})
		.controller(
				'readingMsgCtrl',
				function($scope, $state, AuthService, PostService, hmd) {// 获取用户消息列表
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'msgManage',
						childMenu : 'instation'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;
					$scope.Msg = '';
					$scope.getList = function(pageno) {
						var param = 'userId=' + AuthService.getCookie('uid')
								+ '&offset=' + pageno;
						PostService
								.getReadingMsg(param)
								.success(
										function(res) {
											if (res.status == 1) {
												$scope.totalItems = parseInt(res.data.totalNumber);
												$scope.list = res.data.list;
											} else if (res.status == 15) {
												AuthService.clearUserInfo();
												$state.go('login', {}, {
													reload : true
												});
											} else {
												$scope.Msg = '暂无数据！';
											}
										});
					};
					$scope.getList($scope.currentPage);
					$scope.setReaded = function(uid, msgid) {
						var _d = $('#msg_' + msgid).attr('_data');
						if (_d == 1) {
							return false;
						}
						var _param = 'userId=' + uid + '&messageId=' + msgid;
						PostService.setMsgReaded(_param).success(function(res) {
							if (res.status == 1) {
								$('#msg_' + msgid).attr('_data', 1);
							}
						});
					};
				})
		.controller(
				'awardCtrl',
				function($scope, $state, $location, AuthService, PostService,
						hmd) {
					$scope.$state = $state;
					$scope.$emit('childMenuState', {
						menu : 'rewardManage',
						childMenu : 'reward'
					});
					$scope.totalItems = 0;
					$scope.maxSize = 10;
					$scope.currentPage = 1;
					$scope.itemsPerPage = 20;
					$scope.itemlist = '';
					$scope.awardMsg = '';
					$scope.getAwardList = function(pageno) {
						var param = 'page=' + pageno;
						PostService.getAwardList(param).success(function(res) {
							if (res.status == 1) {
								$scope.totalItems = parseInt(res.total);
								$scope.itemlist = res.data;
								$scope.awardMsg = '';
							} else if (res.status == 15) {
								AuthService.clearUserInfo();
								$state.go('login', {}, {
									reload : true
								});
							} else {
								$scope.awardMsg = "暂无数据！";
							}
						});
					};
					$scope.getAwardList($scope.currentPage);
					$scope.link = '';
					$scope.createFriendLink = function() {
						var param = '';
						PostService.getFriendLink(param).success(
								function(res) {
									if (res.status == 1) {
										$scope.link = 'http://'
												+ $location.host() + '/#/reg/'
												+ res.data;
									} else if (res.status == 15) {
										AuthService.clearUserInfo();
										$state.go('login', {}, {
											reload : true
										});
									} else {
										$scope.link = '';
										hmd.popupErrorInfo(res.status);
									}
								});
					}
				})

		.controller(
				'protocolCtrl',
				function($rootScope, PostService, $stateParams, $scope,
						AuthService, hmd) {// 电子协议
					hmd.scrollToTop();
					var params = $stateParams.str.replace(/\%/g, ''), _pro_id = params
							.substring(params.lastIndexOf('=') + 1), statusCode_obj = {
						'118' : '_div_118',
						'119' : '_div_119',
						'123' : '_div_123'
					};
					$('#' + statusCode_obj[_pro_id]).show();
					$scope.protocolList = '';
					PostService
							.electronicAgreement(
									params + '&userId='
											+ AuthService.getCookie('uid'))
							.success(
									function(res) {
										if (res.status == 1) {
											var data = res.data[0], _date = data.bill, arr = _date
													.split('-'), year = arr[0], month = arr[1], date = arr[2]
													.substring(0, 2);
											$scope.protocolList = {
												'number' : data.number,// 证件号码
												'documentType' : data.documentType,// 证件类型
												'lenders' : data.lenders,// 出借人
												'amount' : data.amount,// 出借金额
												'lendersDate' : data.lendersDate,// 出借日期
												'nvestmentorizon' : data.nvestmentorizon,// 出借期限
												'creditor' : data.creditor,// 转让人
												'cardNumber' : data.cardNumber, // 转让人身份证号码
												'platformUserName' : data.platformUserName, // 平台用户名
												'name' : data.name, // 受让人
												'investmentAmount' : data.investmentAmount, // 出借金额
												'totalRevenue' : data.totalRevenue, // 预计到期转让对价
												'determinedDate' : data.determinedDate, // 出借日期
												'annualRrate' : data.annualRrate,// 年利率
												'monthmount' : data.monthmount, // 月取金额
												'bill' : data.bill,// 账单日 账单日 即
												// 资金的匹配日期
												'percentage' : data.percentage,// 百分比
												'investment' : data.investment, // 月取的投资期限
												'nper' : data.nper,// 月份
												'monthPercentage' : data.monthPercentage,
												'realNname' : data.realNname,
												year : year,
												month : month,
												date : date
											};
										}
									});

					PostService
							.creditorList(
									params + '&userId='
											+ AuthService.getCookie('uid'))
							.success(
									function(res) {
										if (res.status == 1) {
											var data = res.data;
											$(data)
													.each(
															function(index,
																	element) {
																element.credit_oid = (index + 1);
																element.interestRate = element.interestRate
																		+ '%';
																element.borrowerNumber = element.borrowerNumber
																		.split(' ');
															});
											$scope.creditor_info = data;
										} else {
											$scope.creditor_info = '';
										}
									});
				})

		.controller('schoolCtrl', function($rootScope) {
		})

		.controller(
				'updateInvCodeCtrl',
				function($rootScope, $scope, $state, PostService, $stateParams,
						AuthService, hmd, $interval) {
					if (!$stateParams.invid) {
						$state.go('space.home');
					}
					$scope.name = '';
					$scope.orderNo = '';
					$scope.info = '';
					$scope.phone = '';
					$scope.phonecode = '';
					var uname = AuthService.getCookie('user');
					var params = 'invId=' + $stateParams.invid;
					PostService.getManagerInfo(params).success(function(res) {
						if (res.status == 1) {
							$scope.name = res.data.name;
							$scope.orderNo = res.data.code;
							$scope.partment = res.data.org;
						} else if (res.status == 15) {
							AuthService.clearUserInfo();
							$state.go('login', {}, {
								reload : true
							});
						} else {
							hmd.popupErrorInfo('无该邀请码的邀请人信息！', 'error');
						}
					});
					$scope.reaccept = true;
					$scope.isRead = false;
					$scope.CheckIphone = function() {
						if (!(/^1[34578]\d{9}$/.test($scope.phone))) {
							$scope.iphoneMsg = '手机格式不符合要求，必须有效的手机号！';
							$scope.reaccept = true;
						} else {
							$scope.iphoneMsg = '';
							$scope.reaccept = false;
						}
					}
					$scope.submitManagerInfo = function() {
						if (!(/^1[34578]\d{9}$/.test($scope.phone))) {
							hmd.popupErrorInfo('手机格式不符合要求，必须有效的手机号！', 'error');
							return false;
						}
						if (!(/^\d{6}$/.test($scope.phonecode))) {
							hmd.popupErrorInfo('手机格验证码不符合要求，必须是六位数字！', 'error');
							return false;
						}
						if (!$scope.orderNo) {
							hmd.popupErrorInfo('员工邀请编号不可为空！', 'error');
							return false;
						}
						if (!uname) {
							hmd.popupErrorInfo('用户名不可为空！', 'error');
							return false;
						}
						var params = 'code=' + $scope.orderNo + '&username='
								+ uname;
						PostService.updateManagerInfoId(params).success(
								function(res) {
									if (res.status == 1) {
										$('#InvitBox').modal({
											'backdrop' : 'static'
										});
									} else if (res.status == 3) {
										hmd.popupErrorInfo('参数不合法！', 'error');
									} else {
										hmd.popupErrorInfo(res.status);
									}
								});
					};
					$scope.jump = function() {
						$state.go('space.home');
					}
					$scope.msg = '';
					$scope.getauthcode = function() {
						if (!(/^1[34578]\d{9}$/.test($scope.phone))) {
							hmd.popupErrorInfo('手机格式不符合要求，必须有效的手机号！', 'error');
							return false;
						}
						var maxtime = 60;
						$scope.reaccept = true;
						$scope.isRead = true;
						$scope.msg = maxtime + "秒后重新获取";
						var timer = $interval(function() {
							if (maxtime > 0) {
								--maxtime;
								$scope.msg = maxtime + "秒后重新获取";
							} else {
								$scope.reaccept = false;
								$scope.isRead = false;
								$scope.msg = '';
								if (angular.isDefined(timer)) {
									$interval.cancel(timer);
								}
							}
						}, 1000);
						var data = {
							phone : $scope.phone
						};
						PostService.getPhoneCode(objToStr(data)).success(
								function(res) {
									if (res.status == 1) {
										$scope.phoneCodeMsg = '验证码已发送';
									} else {
										$scope.phoneCodeMsg = '验证码发送失败，请稍后重试！';
									}
								});
					};

				})

		// 帮助中心-问题分类
		.controller('helpCtrl', function($rootScope, $scope, $location) {// 左侧导航
			$scope.path = $location.path();
		})

		.controller(
				'hotHelpCtrl',
				function($rootScope, $scope, $http, hmd) {// 热门问题
					hmd.scrollToTop();
					$http.jsonp(
							xhcms.url.DOMAIN
									+ '/help/helphot?callback=JSON_CALLBACK')
							.success(function(data) {
								$scope.list = data;
							});
				})

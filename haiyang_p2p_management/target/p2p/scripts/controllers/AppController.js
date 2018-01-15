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

angular.module('AppController', [])

		.controller(
				'loginCtrl',
				function($rootScope, $scope, $state, AdminService) { //将AdminService注入到了当前的loginCtrl中。

					$scope.errorMsg = '';

					$scope.login = function(username, password) {
						//拼接项目所发送的数据
						var str = 'username=' + username + '&password='
								+ password;
						// alert(username + " " + password);
						AdminService.signIn(str).success(function(response) {
							if (response.status == 1) {
								$rootScope.LoginAdmin = username;
								$state.go("home"); //改变状态
							} else if(response.status == 0) {
								$scope.errorMsg = '用户名或密码错误！';
							}
						}).error(function() {
							$scope.errorMsg = '网络异常，稍后重试！';
							$scope.refresh();
						});
					};
					$scope.hideMsg = function() {
						$scope.errorMsg = '';
					};
				})

		// 空间首页
		.controller(
				'homeCtrl',
				function($rootScope, $location, $scope, $state) {
					var arr = [];
					var len = 30;
					for (var i = 0; i < len; i++) {
						var strTem = '"a' + i + '":true';
						arr.push(strTem)
					}
					var str = "{" + arr.join(',') + '}';
					var obj = eval('(' + str + ')');
					$scope.rights = obj;
					if ($scope.rights.a1 || $scope.rights.a2
							|| $scope.rights.a28) {
						$(".menu_list>li").eq(0).css("display", "block");
					}
					if ($scope.rights.a7 || $scope.rights.a4
							|| $scope.rights.a5 || $scope.rights.a6
							|| $scope.rights.a29) {
						$(".menu_list>li").eq(1).css("display", "block");
					}

					if ($scope.rights.a3) {
						$(".menu_list>li").eq(2).css("display", "block")
					}
					if ($scope.rights.a8 || $scope.rights.a9
							|| $scope.rights.a10 || $scope.rights.a11
							|| $scope.rights.a30 || $scope.rights.a31) {
						$(".menu_list>li").eq(3).css("display", "block")
					}
					if ($scope.rights.a13 || $scope.rights.a14
							|| $scope.rights.a15 || $scope.rights.a16
							|| $scope.rights.a17 || $scope.rights.a18
							|| $scope.rights.a19 || $scope.rights.a20) {
						$(".menu_list>li").eq(4).css("display", "block")
					}
					if ($scope.rights.a21 || $scope.rights.a22) {
						$(".menu_list>li").eq(5).css("display", "block")
					}
					if ($scope.rights.a23) {
						$(".menu_list>li").eq(6).css("display", "block")
					}
					if ($scope.rights.a24 || $scope.rights.a25) {
						$(".menu_list>li").eq(7).css("display", "block")
					}
					if ($scope.rights.a26) {
						$(".menu_list>li").eq(8).css("display", "block")
					}
					if ($scope.rights.a27) {
						$(".menu_list>li").eq(9).css("display", "block")
					}
					$scope.path = $location.path();

					// 退出操作
					$scope.logout = function() {
						$rootScope.LoginAdmin = '';
						$state.go('login');
					}
				})

		// 产品列表
		.controller("productList", function($scope, $state, ProductService) {

			//页面加载过程中，这个函数会执行
			$scope.getProductList = function() {

				ProductService.getProductList().success(function(response) {
					//{status:1,data:[{},{},{}]}
					if (response.status == 1) {
						$scope.info = response.data;
					}
				});
			}
			// 调用函数
			$scope.getProductList();

			// 根据产品ID隐藏删除按钮的判断函数
			$scope.isHide = function(value) {
				// if (value != 1 || value != 2 || value != 3) {
				// return false;
				// } else {
				return true;
				// }
			}

			// 产品删除
			$scope.productDel = function(proId) {
				var str = 'proId=' + proId;
				ProductService.delProduct(str).success(function(response) {
					if (response.status == 1) {
						$scope.getProductList();
					}
				})
			}

			// 根据ID获取产品信息
			$scope.viewProductById = function(proId) {
				var str = 'proId=' + proId
				ProductService.getProductById(str).success(function(response) {
					if (response.status == 1) {
						$scope.view = response.data;
						$scope.colseDown = true;
						$scope.recordList = false;
						$('#myModal_b').modal();
					}
				});
			};

			$scope.hide = function() {
				if (!$scope.recordList) {
					if ($scope.colseDown) {
						$('#myModal_b').modal('hide');
						$scope.recordList = true;
						$scope.colseDown = false;
					} else {
						$scope.recordList = true;
					}
				} else {
					$('#myModal_b').modal('hide');
				}
			}
		})
		// 产品添加
		.controller(
				"productAdd",
				function($scope, $state, ProductService) {
					$scope.saveProduct = function() {
						var str = "";
						for ( var x in $scope.productInfo) {
							if (x === "proEarningRate") {
								var rateStr = "";
								for (var y = 0; y < $scope.productInfo.proEarningRate.length; y++) {
									rateStr += '"'
											+ $scope.productInfo.proEarningRate[y].month
											+ '":'
											+ $scope.productInfo.proEarningRate[y].incomeRate
											+ ","
								}
								rateStr = '{'
										+ rateStr.substr(0, rateStr.length - 1)
										+ '}';
								str += "&proEarningRates=" + rateStr;
							} else {
								str += "&" + x + "=" + $scope.productInfo[x];
							}
						}
						if (str.substring(0, 1) === '&') {
							str = str.substring(1);
						}
						alert(str);

						ProductService.saveProduct(str).success(
								function(response) {
									if (response.status == 1) {
										$state.go("home.productlist");
									}
								})

					}

					$scope.cancelProduct = function() {
						$state.go("home.productlist");
					}
					// 设置利率
					$scope.addEarningRate = function() {
						var options = {
							backdrop : "static"
						};
						$('#myModal_b').modal(options);

					}
					// 添加月利率设置
					$scope.addField = function() {

						if ($scope.productInfo.proEarningRate == null) {
							$scope.productInfo.proEarningRate = [ {
								"month" : "",
								"incomeRate" : ""
							} ];
						} else {
							$scope.productInfo.proEarningRate.push({
								"month" : "",
								"incomeRate" : ""
							});
						}

					}
				})
		// 修改产品
		.controller(
				"productEdit",
				function($scope, $state, $stateParams, ProductService) {
					var proId = $stateParams.proId;
					var str = "proId=" + proId

					$scope.productInfo = "";
					// 调用匿名函数,商品信息回显
					(function() {
						ProductService.getProductById(str).success(
								function(response) {
									if (response.status == 1) {
										$scope.productInfo = response.data;
									}
								})
					})();

					// 真正提交修改
					$scope.commitProduct = function(proId) {
						var str = "";
						for ( var x in $scope.productInfo) {
							if (x === "proEarningRate") {
								var rateStr = "";
								for (var y = 0; y < $scope.productInfo.proEarningRate.length; y++) {
									rateStr += '"'
											+ $scope.productInfo.proEarningRate[y].month
											+ '":'
											+ $scope.productInfo.proEarningRate[y].incomeRate
											+ ","
								}
								rateStr = '{'
										+ rateStr.substr(0, rateStr.length - 1)
										+ '}';
								str += "&proEarningRates=" + rateStr;
							} else {
								str += "&" + x + "=" + $scope.productInfo[x];
							}
						}
						if (str.substring(0, 1) === '&') {
							str = str.substring(1);
						}
						alert(str);

						ProductService.commitProduct(str).success(
								function(response) {
									if (response.status == 1) {
										$state.go("home.productlist");
									}
								});

					}

					$scope.cancelProduct = function() {
						$state.go("home.productlist");
					}

					// 设置利率
					$scope.change = function(proId) {
						var str = 'proId=' + proId;
						// 获取当前利率
						ProductService.getRatesById(str).success(
								function(response) {
									if (response.status == 1) {
										$scope.productInfo.proEarningRate = response.data;
										var options = {
											backdrop : "static"
										};
										$('#myModal_b').modal(options);
									}
								});
					}
				})

		// 债权录入
		.controller(
				'entering',
				function($scope, $state, AuthService, PostService, hmd,
						checkParamService, $stateParams) {

					$scope.alertMsgs = []
					$scope.params = {
						// 默认值
						contractNo : undefined, // 借款Id（合同编号）
						debtorsName : undefined, // 债务人
						debtorsId : undefined, // 身份证号
						loanPurpose : undefined, // 借款用途
						loanType : undefined, // 借款类型（标的类型）
						loanPeriod : undefined, // 原始期限（月）源
						loanStartDate : undefined, // 原始借款开始日期
						loanEndDate : undefined, // 原始借款到期日期
						repaymentStyle : 11601, // 还款方式 radius
						repaymenMoney : undefined, // 期供金额（元）
						debtMoney : undefined, // 债权金额（元）
						debtMonthRate : undefined, // 债权年化利率（%// ）
						debtTransferredMoney : undefined, // 债权转入金额
						debtTransferredPeriod : undefined, // 债权可用期（月）
						debtTransferredDate : undefined, // 债权转入日期
						debtRansferOutDate : undefined, // 债权转出日期
						creditor : undefined
					// 债权人
					}

					function getDateVal() {
						$scope.params.loanStartDate = $("#dLoanStartDate")
								.val()
						$scope.params.loanEndDate = $("#dLoanEndDate").val()
						$scope.params.debtTransferredDate = $(
								"#dDebtTransferredDate").val()
						$scope.params.debtRansferOutDate = $(
								"#dDebtRansferOutDate").val()
					}
					// 表单验证
					function formInvail() {
						var msg = []
						var debtorsId = $("#dDebtorsId").val(), loanPeriod = $(
								"#dLoanPeriod").val(), debtMoney = $(
								"#dDebtMoney").val(), repaymenMoney = $(
								"#dRepaymenMoney").val(), debtMonthRate = $(
								"#dDebtMonthRate").val(), debtTransferredMoney = $(
								"#dDebtTransferredMoney").val(), debtTransferredPeriod = $(
								"#dDebtTransferredPeriod").val();
						if (!checkParamService.AuthIDcard(debtorsId)) {
							msg.push("身份证号码格式不正确！");
						}
						if (loanPeriod < 0 || !loanPeriod
								|| !loanPeriod.search(/\D/)) {
							msg.push("原始期限必须为大于0的数字");
						}
						if (debtMoney < 0 || !debtMoney
								|| !debtMoney.search(/\D/)) {
							msg.push("债权金额必须为大于0的数字");
						}
						if (repaymenMoney < 0 || !repaymenMoney
								|| !repaymenMoney.search(/\D/)) {
							msg.push("期限金额必须为大于0的数字");
						}
						if (debtMonthRate < 0 || !debtMonthRate
								|| !debtMonthRate.search(/\D/)) {
							msg.push("债权月利率必须为大于0的数字");
						}
						if (debtTransferredMoney < 0 || !debtTransferredMoney
								|| !debtTransferredMoney.search(/\D/)) {
							msg.push("债权转入金额必须为大于0的数字");
						}
						if (debtTransferredPeriod < 0 || !debtTransferredPeriod
								|| !debtTransferredPeriod.search(/\D/)) {
							msg.push("债权可用期限必须为大于0的数字");
						}
						if (!$("#dRepaymenDates").val()) {
							msg.push("还款日不可为空");
						}

						if ($stateParams.dId) {
							for (var i = 0; i < $scope.params.length - 2; i++) {
								if (!$scope.params[i]) {
									msg.unshift("所有债权录入数据不能为空！")
									break;
								}
							}
						} else {
							for ( var i in $scope.params) {
								if (!$scope.params[i]) {
									msg.unshift("所有债权录入数据不能为空！")
									break;
								}
							}
						}
						if (msg.length >= 1) {
							hmd.popupErrorInfo(msg[0], "error")
							return !!msg.length
						}
					}
					// 提交
					$scope.entering = function() {
						getDateVal();
						if (formInvail()) {
							return;
						}

						var str = ""
						for ( var i in $scope.params) {
							str += "&" + i + "=" + $scope.params[i]

						}
						str = str.replace(/undefined/g, "") + "&repaymenDate="
								+ $("#dRepaymenDates").val();

						console.info("str============" + str);

						PostService.entryDebet(str).success(function(response) {
							if (response.status == 1) {
								hmd.popupErrorInfo("债权录入成功！", "ok");
								$scope.params = '';
							} else {
								hmd.popupErrorInfo(response.status);
							}
						});

					}

					$scope.reset = function() {
						for ( var i in $scope.params) {
							$scope.params[i] = ""
						}
						$scope.params.repaymentStyle = 11601
						$scope.params.repaymenDate = 7
					}
				})
		.controller(
				'multiple',
				function($scope, AuthService, FileUploader, hmd) {
					
					var uploader = $scope.uploader = new FileUploader({
						url : '/itcast_p2p_action/creditor/upload'
					});

					uploader.filters
							.push({
								name : 'customFilter',
								fn : function(item /* {File|FileLikeObject} */,
										options) {
									var type = '|'
											+ item.type.slice(item.type
													.lastIndexOf('/') + 1)
											+ '|';
									var condition = ('|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet|x-excel|x-msdownload|'
											.indexOf(type) !== -1)
											&& (this.queue.length < 10)
									return true;
								}
							});

					// 上传文件失败
					uploader.onWhenAddingFileFailed = function(
							item /* {File|FileLikeObject} */, filter, options) {
						hmd.popupErrorInfo('添加文件失败！', 'error');
					};

					uploader.onSuccessItem = function(fileItem, response,
							status, headers) {
						if (response.status == 1) {
							fileItem.isSuccess = true;
							fileItem.isError = false;
						} else {
							if (response.status == 101) {
								var str = '导入数据失败,第' + response.data.info
										+ '行，第' + response.data.errorCell
										+ '列数据有误';
								hmd.popupErrorInfo(str, 'error');
							} else {
								hmd.popupErrorInfo(response.status);
							}
							fileItem.isSuccess = false;
							fileItem.isError = true;
						}
					};
				})
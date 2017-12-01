var option = {};
option.url = {
	'api_admin' : '/haiyang_p2p_action/admin/',
	'api_account' : '/haiyang_p2p_action/account/',
	'api_user' : '/haiyang_p2p_action/user/',
	'api_accountrecord' : '/haiyang_p2p_action/accountrecord/',
	'api_product' : '/haiyang_p2p_action/product/',
	'api_creditor' : '/haiyang_p2p_action/creditor/',
	'api_match' : '/haiyang_p2p_action/matchManagement/',
	'api_message' : '/haiyang_p2p_action/',
	'api_UsersFunds' : '/haiyang_p2p_action/UsersFunds/'
};
option.header = {
	'headers' : {
		'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8;'
	}
};
angular
		.module('AppCommonService', [ 'ngCookies' ])
		.factory(
				'AdminService',
				function($http) { //将$http注入，就可以向服务器发送请求
					return {
						signIn : function($str) {
							//alert($str);
							return $http.post(option.url.api_account + 'login',
									$str, option.header);
							// /haiyang_p2p_action/account/login
						}
					}
				})

		.factory('AuthService', [ '$cookieStore', function($cookieStore) {
			var token = $cookieStore.get('token');
			var cachedToken = null;
			return {
				isAuthenticated : isAuthenticated,
				setToken : setToken,
				getToken : getToken,
				clearToken : clearToken,
				setCookie : setCookie,
				getCookie : getCookie,
				delCookie : delCookie
			};

			function setToken(token) {
				cachedToken = token;
				$cookieStore.put('xhtoken', token);
			}

			function getToken() {
				if (!cachedToken) {
					cachedToken = $cookieStore.get('xhtoken');
				}
				return cachedToken;
			}

			function clearToken() {
				cachedToken = null;
				$cookieStore.remove('xhtoken');
			}

			function isAuthenticated() {
				return !!getToken();
			}

			function setCookie($key, $value) {
				$cookieStore.put($key, $value);
			}

			function getCookie($key) {
				return $cookieStore.get($key);
			}

			function delCookie($key) {
				$cookieStore.remove($key);
			}
		} ])

		// 产品管理
		.factory(
				'ProductService',
				function($http) {
					return {
						saveProduct : function($str) {
							return $http.post(option.url.api_product
									+ 'addProduct', $str, option.header);
						},

						getProductList : function() {
							return $http.post(option.url.api_product
									+ 'findAllProduct', option.header);
							// /haiyang_p2p_action/product/findAllProduct
						},

						getProductById : function($str) {
							return $http.post(option.url.api_product
									+ 'findProductById', $str, option.header);
							// /haiyang_p2p_action/product/findProductById
						},
						// 根据产品来获取利率信息
						getRatesById : function($str) {
							return $http.post(option.url.api_product
									+ 'findRates', $str, option.header);
						},
						// 提交修改操作
						commitProduct : function($str) {
							return $http.post(option.url.api_product
									+ 'modifyProduct', $str, option.header);
						},
						// 删除产品
						delProduct : function($str) {
							return $http.post(option.url.api_product
									+ 'delProduct', $str, option.header);
						}
					}
				})

		.factory(
				'PostService',
				function($http) {
					return {
						// 录入债权
						entryDebet : function($str) {
							return $http.post(option.url.api_creditor
									+ 'addCreditor', $str, option.header);

							// /haiyang_p2p_action/creditor/addCreditor
						}
					}
				})

		.factory(
				'hmd',
				function() {
					function Controller_Class() {
						return new Controller_Class.fn.init();
					}
					Controller_Class.fn = Controller_Class.prototype = {
						constructor : 'Controller_Class',
						version : '1.0',
						getListData : function(func, PostService, parm, scope) {
							PostService[func](parm).success(function(response) {
								if (response.status == 1) {
									scope.books = response.data;
								} else {
									var otable = $('#otable');
									otable.find('tr.ng-scope').remove();
								}
							}).error(function(message) {
							});
						},
						/**
						 * @description 给对象数组或数字数组进行排序，对象数组中有一项是数字*
						 * @use [].sort(hmd.sort);
						 */
						sort : function(a, b) {
							if (typeof a === 'object') {
								return a.index - b.index;
							} else if (typeof a === 'string'
									|| typeof a === 'number') {
								return a - b;
							}
						},
						/* * @description 判断对象是否为空，空返回false，否则返回true */
						isObjNull : function(obj) {
							var flag = false;
							for ( var index in obj) {
								if (!!index) {
									flag = true;
								}
							}
							return flag;
						},
						/**
						 * @description 将一个串转化成数组*
						 * @param str
						 *            eg: 'pProductName=11&pAmount=22'*
						 * @param separator1
						 *            第一个分隔符，比如像上面的'&',如果不传此参数，默认为'&' *
						 * @param separator2
						 *            第二个分隔符，比如像上面的'=',如果不传此参数，默认为'=' *
						 * @return 会返回这样格式的数组:[{'name' : 'pProductName','value' :
						 *         11},{'name' : 'pAmount','value' : 22}]
						 */
						transformStringToArray : function(str, separator1,
								separator2) {
							var sep_a = !!separator1 ? separator1 : '&', sep_b = !!separator2 ? separator2
									: '=', arr = str.split(sep_a), obj_arr = [];
							for (var i = 0, len = arr.length; i < len; i++) {
								var element = arr[i], _arr = element
										.split(sep_b);
								obj_arr.push({
									name : _arr[0],
									value : _arr[1]
								});
							}
							return obj_arr;
						},

						/**
						 * @description 错误信息显示*
						 * @param code
						 *            就是后台返回的 status*
						 * @param status
						 *            三个状态error(错误图标),ok(成功图标),attention(警告图标)
						 */
						popupErrorInfo : function(code, status) {
							var _doc = document, _div = _doc
									.createElement('div'), _width = $(_doc.body)
									.width() / 2, _height = $(_doc.body)
									.height() / 2, current_class;
							_div.id = 'error_info_2015032848';
							_div.className = 'modal-dialog';
							if (arguments.length == 1) {
								if (code == 1) {
									current_class = 'ico-ok';
								} else {
									current_class = 'ico-error';
								}
								_div.innerHTML = '<div class="modal-content"> <div class="modal-header" style="padding:10px 15px;"> <h3 id="">提示</h3> </div> <div class="modal-body"> <div class="my-modal-tips"> <div class="dialog-content"> <p class="ico '
										+ current_class
										+ '">'
										+ this.presentStatus(code)
										+ '</p> </div> </div> </div> </div>';
							} else if (arguments.length > 1) {
								if (status === 'ok') {
									current_class = 'ico-ok';
								} else if (status === 'error') {
									current_class = 'ico-error';
								} else if (status === 'attention') {
									current_class = 'ico-attention';
								}
								_div.innerHTML = '<div class="modal-content"> <div class="modal-header" style="padding:10px 15px;"> <h3 id="">提示</h3> </div> <div class="modal-body"> <div class="my-modal-tips"> <div class="dialog-content"> <p class="ico '
										+ current_class
										+ '">'
										+ code
										+ '</p> </div> </div> </div> </div>';
							}
							document.body.appendChild(_div);
							_div.style.cssText = ' left: '
									+ (_width - $(_div).width() / 2) + 'px;  ';
							setTimeout(function() {
								$(_div).remove();
							}, 1000);
						},

						/** @description 数据查询统一方法 */
						managePostService : function(func, PostService, parm,
								scope, callback) {
							var self = this;
							PostService[func](parm).success(function(response) {
								if (response.status == 1) {
									if (!!callback) {
										callback.call(self, response);
									}
								} else {
									self.popupErrorInfo(response.status);
								}
							}).error(function(message) {
								console.log(message)
							});
						},

						/* @description 导出统一方法 */
						exportPostService : function(func, PostService, parm,
								scope) {
							PostService[func](parm);
						},
						/** @description 导出的参数要根据查询按钮的属性来设置 */
						setExportParamsByQueryAttr : function($obj, param) {
							for ( var i in param) {
								$obj.attr(i, param[i]);
							}
						},
						/** @description 将数据转化成表格，仅限两列表格 */
						getDataToHtml : function(data) {
							var tr_arr = [];
							$(data).each(function(index, element) {
								tr_arr.push('<tr>');
								for ( var i in this) {
									tr_arr.push('<td>' + this[i] + '</td>');
								}
								tr_arr.push('</tr>');
							});
							return tr_arr.join('');
						},
						/** @description 返回上一页 */
						goBack : function(state, url) {
							state.go(url);
						},
						/** @description 刷新本页面 */
						reload : function(state, url) {
							state.go(url, {}, {
								'reload' : true
							});
						},
						/** @description 回到页面顶部 */
						scrollToTop : function() {
							window.scrollTo(0, 0);
						},
						presentStatus : function(status) {
							var status_obj = {
								'-999' : '系统异常',
								'-9999' : '系统异常',
								'-1' : '债权跑批数据为负数',
								'-2' : '投资跑批数据为负数',
								'0' : '失败',
								'1' : '成功',
								'2' : '没有可用结果',
								'3' : '参数不符要求',
								'4' : '没通过实名认证',
								'5' : '已经添加过银行卡信息',
								'6' : '银行卡号已经被占用',
								'7' : '没有此用户',
								'8' : '令牌伪造',
								'9' : '待匹配的资金id不正确',
								'10' : '权重值输入不正确',
								'11' : '修改失败',
								'12' : '缓存存储异常',
								'13' : 'token为空',
								'14' : '用户名为空',
								'15' : '用户未登录',
								'16' : '投资方式不能为空',
								'17' : '投资金额不能大于账户余额',
								'18' : '没有选择产品',
								'19' : '投资金额不能为空',
								'20' : '每月提取利息不能小于0',
								'21' : '每月提取利息不能大于每月赢取利息',
								'22' : '借款申请金额格式错误',
								'23' : '姓名只能为中文',
								'24' : '未选中性别',
								'25' : '手机格式错误',
								'26' : '验证码不能为空',
								'27' : '验证码输入不正确',
								'28' : '字典表组名不能为空！',
								'29' : '字典表选项名不能为空！',
								'30' : '字典表选项值不能为空！',
								'31' : '组名存在',
								'32' : '选项名存在',
								'33' : '未选择要删除的id',
								'34' : 'id必须是数字',
								'35' : '未选择要更新的id',
								'36' : '分页号不能为空',
								'37' : '分页参数不能为空',
								'38' : '借款Id（合同编号）不能为空',
								'39' : '债务人不能为空',
								'40' : '身份证号不能为空',
								'41' : '借款用途不能为空',
								'42' : '借款类型（标的类型）不能为空',
								'43' : '原始期限（月）不能为空',
								'44' : '原始借款开始日期不能为空',
								'45' : '原始借款到期日期不能为空',
								'46' : '还款方式不能为空',
								'47' : '还款日不能为空',
								'48' : '还款金额（元）不能为空',
								'49' : '债权金额（元）不能为空',
								'50' : '债权年化利率（%）不能为空',
								'51' : '债权转入金额不能为空',
								'52' : '债权转入日期不能为空',
								'53' : '债权转入期限（月）不能为空',
								'54' : '债权转出日期不能为空',
								'55' : '债权人不能为空',
								'56' : '身份证号长度为数字字母',
								'57' : '债权状态不能修改',
								'58' : '债权状态不能为空',
								'59' : '债权编号不能为空',
								'60' : '债权状态不能删除',
								'61' : '未选中需要下载的数据',
								'62' : '审核状态不能为空',
								'63' : '债权转让表Id为空或格式不正确',
								'64' : '债权转让表权重值输入不正确！',
								'65' : '用户锁定',
								'66' : '用户名密码不正确',
								'67' : '手机已经被注册',
								'68' : '用户名格式不正确',
								'69' : '用户名不能为纯数字',
								'70' : '用户名已经存在',
								'71' : '密码为空',
								'72' : '密码为8-16位数字或字母组合',
								'73' : '邀请码格式不正确',
								'74' : '员工不存在',
								'75' : '注册失败',
								'76' : '老密码不能为空',
								'77' : '新密码不能为空',
								'78' : 'token过期',
								'79' : '新密码不能与旧密码相同',
								'80' : '手机不能为空',
								'81' : '添加失败',
								'82' : '姓名证件不匹配',
								'83' : '匹配结果未确认',
								'84' : '匹配结果已确认',
								'85' : '匹配结果未清算',
								'86' : '匹配结果已清算',
								'87' : '投资金额为100的整数倍',
								'88' : '购买期限不能小于1个月',
								'89' : '输入的投资类型必须是数字',
								'90' : '投资类型不能为空',
								'91' : '输入的产品名必须是数字',
								'92' : '期限必须是数字',
								'93' : '每月赢取利息必须是数字',
								'94' : '每月提取利息必须是数字',
								'95' : '购买期限不能小于12个月',
								'96' : '购买金额最小值必须大于100',
								'97' : '购买金额必须是100的整数倍',
								'98' : '充值金额不能为空',
								'99' : '请选择银行充值',
								'100' : '导入数据为空',
								'101' : '导入数据失败，xx条出现错误',
								'102' : '导入数据失败，导入文件不存在',
								'103' : '输入的页码不能小于1',
								'104' : '期限不能大于36个月',
								'105' : '起始日期不能大于截止日期',
								'106' : '提现金额不能为空',
								'107' : '提现金额不能小于0',
								'108' : '提现密码不能为空',
								'109' : '提现金额不能大于可用余额',
								'110' : '提现金额必须大于手续费',
								'111' : '提现密码不正确',
								'112' : '请输入汉字',
								'113' : '债权未审核',
								'114' : '无可用期限',
								'115' : '可用期数为0无法进行提前结清',
								'116' : '无待匹配资金',
								'117' : '无待匹配债权',
								'118' : '今日已执行过匹配，请勿再次匹配!',
								'119' : '匹配日志对象为null',
								'120' : '匹配日志集合为null',
								'121' : '匹配请求为null',
								'122' : '待匹配资金集合为空',
								'123' : '待匹配债权集合为空',
								'124' : '无匹配结果',
								'125' : '转换请求为null',
								'126' : '转换响应结果为null',
								'127' : '匹配日志po为null',
								'128' : '运营人员集合为空',
								'129' : '支付密码认证失败',
								'130' : '支付密码长度不足',
								'131' : '支付密码有特殊字符',
								'132' : '结算失败',
								'133' : '支付密码与登陆密码相同',
								'134' : '投资金额过多',
								'135' : '待匹配资金总额为零或小于零',
								'136' : '待匹配债权总额为为零或小于零',
								'137' : '待匹配资金对象为空',
								'138' : '新支付密码不能与原支付密码相等',
								'139' : '原支付密码错误',
								'140' : '该用户已锁定',
								'141' : '匹配后响应对象为null',
								'142' : '无匹配结果',
								'143' : '规则引擎匹配请求对象为null',
								'144' : '登陆密码不能与支付密码相同',
								'145' : '参数名集合为空',
								'146' : '参数值集合为空',
								'147' : '该用户已经进行过实名验证',
								'148' : '其他用户正在操作，请稍等',
								'149' : '未选中需要待匹配债权队列退出的数据',
								'150' : '投资金额必须是数字',
								'151' : '原密码错误',
								'152' : '操作时间超时',
								'153' : '债权结算失败',
								'154' : '输入短信验证码错误次数过多，请重新获取',
								'155' : '手机验证码已失效',
								'156' : '图片验证码已失效',
								'157' : '未选中退出队列',
								'158' : '申请借款金额不能超过1亿',
								'159' : '资金已结算成功',
								'160' : '资金结算进行中 ',
								'161' : '债权已结算成功或债权结算进行中 ',
								'162' : '资金结算失败 ',
								'163' : '导入文件不存在 ',
								'164' : '数据中存在非付款中状态的数据',
								'165' : '文件中付款状态存在问题 ',
								'166' : '导入数据错误  ',
								'167' : '上传失败  ',
								'168' : '资金结算失败  ',
								'169' : '债权待匹配队列有正在匹配的数据  ',
								'170' : '债权待匹配队列数据为空  ',
								'171' : '债权自动跑批未成功不能提前结清操作  ',
								'172' : '宕机处理时间不能在当前时间之后  ',
								'173' : '该类型的产品不能进行提前结清  ',
								'174' : '邮箱格式不正确 ',
								'175' : '您输入的旧邮箱不正确 ',
								'176' : '您输入的新邮箱和旧邮箱一致 ',
								'177' : '该邮箱已经存在，请更换一个邮箱号'
							};
							return status_obj[status];
						}
					};
					var init = Controller_Class.fn.init = function() {
					};
					init.prototype = Controller_Class.fn;
					$.extend(Controller_Class.fn, {
					/** @description 这里扩展公共方法 */
					});
					return Controller_Class();
				})
		.factory(
				'checkParamService',
				function() {
					return {
						AuthIDcard : AuthIDcard
					};
					// 验证身份证
					function AuthIDcard(idCard) {
						var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,
								8, 4, 2, 1 ];
						var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
						function isTrueValidateCodeBy18IdCard(a_idCard) {
							var sum = 0;
							if (a_idCard[17].toLowerCase() == 'x') {
								a_idCard[17] = 10;
							}
							for (var i = 0; i < 17; i++) {
								sum += Wi[i] * a_idCard[i];
							}
							var valCodePosition = sum % 11;
							if (a_idCard[17] == ValideCode[valCodePosition]) {
								return true;
							} else {
								return false;
							}
						}

						function isValidityBrithBy18IdCard(idCard18) {
							var year = idCard18.substring(6, 10);
							var month = idCard18.substring(10, 12);
							var day = idCard18.substring(12, 14);
							var temp_date = new Date(year,
									parseFloat(month) - 1, parseFloat(day));
							if (temp_date.getFullYear() != parseFloat(year)
									|| temp_date.getMonth() != parseFloat(month) - 1
									|| temp_date.getDate() != parseFloat(day)) {
								return false;
							} else {
								return true;
							}
						}

						function isValidityBrithBy15IdCard(idCard15) {
							var year = idCard15.substring(6, 8);
							var month = idCard15.substring(8, 10);
							var day = idCard15.substring(10, 12);
							var temp_date = new Date(year,
									parseFloat(month) - 1, parseFloat(day));
							if (temp_date.getYear() != parseFloat(year)
									|| temp_date.getMonth() != parseFloat(month) - 1
									|| temp_date.getDate() != parseFloat(day)) {
								return false;
							} else {
								return true;
							}
						}

						function trim(str) {
							return str.replace(/(^\s*)|(\s*$)/g, "");
						}

						idCard = trim(idCard.replace(/ /g, ""));
						if (idCard.length == 15) {
							return isValidityBrithBy15IdCard(idCard);
						} else if (idCard.length == 18) {
							var a_idCard = idCard.split("");
							if (isValidityBrithBy18IdCard(idCard)
									&& isTrueValidateCodeBy18IdCard(a_idCard)) {
								return true;
							} else {
								return false;
							}
						} else {
							return false;
						}
					}
				})

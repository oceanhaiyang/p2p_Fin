var option = {
    'url':{
        'api_user':'/haiyang_p2p_action/user/', //用户相关
        'api_investment':'/haiyang_p2p_action/investment/', 
        'api_productRate':'/haiyang_p2p_action/productRate/',
        'api_product':'/haiyang_p2p_action/product/', 
        'api_productAccount':'/haiyang_p2p_action/productaccount/',
        'api_acount':'/haiyang_p2p_action/account/',
        'api_verification':'/haiyang_p2p_action/verification/',
        'api_emailAuth':'/haiyang_p2p_action/emailAuth/',
        'api_paymentpwd':'/haiyang_p2p_action/paymentpwd/',
        'api_extracts':'/haiyang_p2p_action/extracts/',  //提现与支付功能
        'api_bankcardInfo':'/haiyang_p2p_action/bankCardInfo/',
        'api_charges':'/haiyang_p2p_action/charges/'
    },
    'header':{
        'headers':{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
        }
    }
};

angular.module('AppCommonService', ['ngCookies','ui.router'])
    .factory('AuthService', ['$cookieStore','$rootScope',function($cookieStore,$rootScope) {
        var token = $.cookie('token');
        var cachedToken;
        return {
            isAuthenticated: isAuthenticated,
            setToken: setToken,
            getToken: getToken,
            clearToken: clearToken,
            setCookie:setCookie,
            getCookie:getCookie,
            delCookie:delCookie,
            clearUserInfo:clearUserInfo
        };
	
        function setToken(token) {
            cachedToken = token;
            $.cookie('token',token);
        }

        function getToken() {
            if (!cachedToken) {
                cachedToken = $.cookie('token');
                if(typeof cachedToken == 'undefined'){
                    cachedToken = '';
                }
            }
            return cachedToken;
        }

        function clearToken() {
            cachedToken = null;
            $.removeCookie('token')
        }

        function isAuthenticated() {
            return !!getToken();
        }
    
        function setCookie($key,$value){
            $.cookie($key,$value);
        }
    
        function getCookie($key){
            return $.cookie($key);
        }
  
        function delCookie($key){
            $.removeCookie($key)
        }
        
        function clearUserInfo(){
            delCookie('token');
            delCookie('uid');
            delCookie('user');
            $rootScope.loginName ='';
        }
    }])
    
    .factory('TokenInterceptor', function ($q, $location, AuthService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if (AuthService.getToken()) {
                    config.headers.Authorization = 'xinhe ' + AuthService.getToken();
                    config.headers.token = AuthService.getToken();
                }else{
                    config.headers.token ='';
                }
                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/');
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401) {
                    $location.path("/");
                }
                return $q.reject(rejection);
            }
        };
    })
    
    .factory('PostService', function($http) { 
        return {
        	//验证用户名是否可用
            checkUserName:function ($str){
                return $http.post(option.url.api_user + 'validateUserName', $str, option.header);
                //相当于$http.post('/haiyang_p2p_action/user/validateUserName', $str, option.header);
            },
            //验证手机是否可用
            checkPhone:function ($str){
                return $http.post(option.url.api_user + 'validatePhone', $str, option.header);
                ///haiyang_p2p_action/user/validatePhone
            },
            
           //注册校验验证码的正确性
            yzAuthCaptcha:function($str){
                return $http.post(option.url.api_user + 'codeValidate',$str,option.header);
                // /haiyang_p2p_action/user/codeValidate
            },
            
            //获取随机UUID
            getUuid:function(){
            	return $http.post(option.url.api_user + 'uuid','',option.header);
                // /haiyang_p2p_action/user/uuid
            },
            
            //验证码
            getImg:function($uuid){
                return option.url.api_user+"validateCode?tokenUuid=" + $uuid+'&time='+ new Date().getTime();
                // /haiyang_p2p_action/user/validateCode
            },
            
            //短信验证码发送
            getPhoneCode:function($str){
                return $http.post(option.url.api_verification+'sendMessage', $str, option.header);
                // /haiyang_p2p_action/verification/sendMessage
            },
         
            //短信验证码验证方法
            checkPhoneCode:function($str){
                return $http.post(option.url.api_verification+'validateSMS', $str, option.header);
                // /haiyang_p2p_action/verification/validateSMS
            },
            
                
            
            //获取用户安全详细信息
            getUserSafeInfo:function($str){
                return $http.post(option.url.api_user+'userSecureDetailed', $str, option.header);
                // /haiyang_p2p_action/user/userSecureDetailed
            },
            
            //实名认证
            authIdentity:function($str){
                return $http.post(option.url.api_verification+'verifiRealName', $str, option.header);
                // /haiyang_p2p_action/verification/verifiRealName
            },
            
            //邮箱绑定认证
            authEmail:function($str){
                return $http.post(option.url.api_verification+'auth', $str, option.header);
                // /haiyang_p2p_action/emailAuth/auth
            },
            //修改邮箱
            modifyEmail:function($str){
                return $http.post(option.url.api_emailAuth+'updateEmail', $str, option.header);
                // /haiyang_p2p_action/emailAuth/updateEmail
            },
            
            //设置支付密码
            setPayPwd:function($str){
                return $http.post(option.url.api_paymentpwd+'getPaymentPwd', $str, option.header);
                // /haiyang_p2p_action/paymentpwd/getPaymentPwd
            },
            
            //修改支付密码
            updatePayPwd:function($str){
                return $http.post(option.url.api_paymentpwd+'updatePaymentPwd', $str, option.header);
                // /haiyang_p2p_action/paymentpwd/updatePaymentPwd
            },
            
            //找回支付密码
            backPayPwd:function($str){
                return $http.post(option.url.api_paymentpwd+'updateNewPaymentPwd', $str, option.header);
            },
            //购买产品时，对帐户余额进行验证
            checkAccount:function($str){
                return $http.post(option.url.api_investment + 'checkAccount',$str, option.header);
                // /haiyang_p2p_action/investment/checkAccount
            },
            
            //根据产品ID获取产品的年收益率
            getYearInterest:function($str){
                return $http.post(option.url.api_productRate+'yearInterest',$str,option.header);
                // /haiyang_p2p_action/productRate/yearInterest
            },
            
            //修改密码
            modifyPwd:function($str){
                return $http.post(option.url.api_user + 'updatePassword', $str, option.header);
            },
            
          
            
            //获取用户银行卡信息
            getCashInfo:function($str){
                return $http.post(option.url.api_bankcardInfo+'findBankInfoByUsername', $str, option.header);
            },
            
            //获取银行信息
            getAllBank:function($str){
                return $http.post(option.url.api_bankcardInfo+'findAllBanks', $str, option.header);
            },
            
            //绑定银行卡时获取当前用户信息
            getBankUserInfo:function($str){
                return $http.post(option.url.api_bankcardInfo+'findUserInfo', $str, option.header);
            },
            
            // 获取省份
            getProvince:function($str){
                return $http.post(option.url.api_bankcardInfo+'findProvince', $str, option.header);
            },
            
            //获取市区信息
            getCity:function($str){
                return $http.post(option.url.api_bankcardInfo+'findCity', $str, option.header);
            },
            
            //银行卡绑定
            addBankCardInfo:function($str){
                return $http.post(option.url.api_bankcardInfo+'addBankCardInfo', $str, option.header);
            },              
            
            //保存借款信息
            lendSuccess:function($str){
                return $http.post('/P2P_action/userLoan/saveUserLoan', $str, option.header);
            },
            
            //用户账户主页图
            personCenter:function($str){
                return $http.post(option.url.api_user+'accountHomepage', $str, option.header);
            },
            
          
            
            //获取用户的账户信息
            statistic:function($str){
            	return $http.post('/P2P_action/charges/propertyStatistics', $str, option.header);
            },
            
            //月乘
            getMonthRide:function($str){
                return $http.post('/P2P_action/charges/MonthRide', $str, option.header);
            },
            //月取
            getMonthFetch:function($str){
                return $http.post('/P2P_action/charges/MonthFetch', $str, option.header);
            },
            //月存
            getMonthSave:function($str){
                return $http.post('/P2P_action/charges/MonthSave', $str, option.header);
            },
            //获取总的可用额
            getTotalRevenue:function($str){
                return $http.post('/P2P_action/charges/totalRevenue', $str, option.header);
            },
            
            //购买中的计划
            getProductAccountBuying:function($str){
                return $http.post(option.url.api_charges+'ProductAccountBuying', $str, option.header);
            },
            
          
            
            //交易记录
            record:function($str){
                return $http.post('/P2P_action/accountrecord/findMoreAccountRecord', $str, option.header);
            },
            
            getAbleAccout:function(){
                return $http.post(option.url.api_extracts+'extractMoney', '', option.header);
                // /haiyang_p2p_extracts/extractMoney
            },
            
           
            
            //月取计划
            withdraw:function($str){
                return $http.post(option.url.api_charges+'addMayTake',$str,option.header);
                // /haiyang_p2p_action/charges/addMayTake
            },
            
          
            
            //获取当前用户所有的站内信息
            getAllMsg:function($str){
                return $http.post('/P2P_action/api/list',$str,option.header);
            },
            
         
            //退出
            logout:function($str){
                return $http.post(option.url.api_user + 'logout',$str,option.header);
                //  //haiyang_p2p_action/user/logout
            },
            
          
            //找回支付密码，发送短信验证
            getPhoneCodeByToken:function(){
                return $http.post(option.url.api_verification+'tokensendSMS','',option.header);
            },
            
            //手机绑定
            addPhoneAuth:function($str){
                return $http.post(option.url.api_verification + 'addPhone',$str,option.header);
            },
            //修改手机后绑定
            updatePhone:function($str){
                return $http.post(option.url.api_user+'addPhone', $str, option.header);
            },
           
            findAllProduct:function(){
            	return $http.post(option.url.api_product+'findAllProduct',option.header);
            }
	
        };
    })
    
    .factory('UserService',function ($http,AuthService) {
        return {
        	//登录
            signIn: function($str) {
                return $http.post(option.url.api_user+'login',$str,option.header);
                // //haiyang_p2p_action/user/login
            },
            
            //退出
            logOut: function() {
                AuthService.clearToken();
            },
            
            //注册
            register: function($str) {
                return $http.post(option.url.api_user+'signup',$str,option.header);
                // //haiyang_p2p_action/user/signup
            },
            
          
            
            //获取用户安全等级
            getSafeLevel:function($str){
                return $http.post(option.url.api_user + 'userSecure', $str, option.header);
            }
    
        }
    })
    
    .factory('checkParamService',function(){
        return {
            checkUname:checkUname,
            checkPwd:checkPwd,
            checkRePwd:checkRePwd,
            getUserLevel:getUserLevel,
            AuthIDcard:AuthIDcard,
            checkMoney:checkMoney,
            checkCaptcha:checkCaptcha
        };
        function checkUname(name){
            if(!name || /^\s*$/.test(name)){
                return {
                    msg:"用户名不能为空",
                    isTrue:false
                };
            }else if(/^\d+$/.test(name)){
                return {
                    msg:"用户名不能为纯数字",
                    isTrue:false
                };
            }else if(!/^[A-Za-z0-9_\u4E00-\u9FA5]+$/.test(name)){
                return {
                    msg:"用户名不符合规则",
                    isTrue:false
                };
            }else if(strLength(name)<6 || strLength(name)>14){
                return {
                    msg:"用户名长度应在6到14位之间",
                    isTrue:false
                };
            }else{
                return {
                    msg:"",
                    isTrue:true
                };
            }
        }
        
        function checkPwd(pwd){
            if(!pwd || /^\s*$/.test(pwd)){
                return {
                    msg:"密码不可为空",
                    isTrue:false,
                    strong:1
                };
            }else{
                if(!/^[a-zA-Z0-9]+$/.test(pwd)){
                    return {
                        msg:"密码格式错误,只能为数字,字母或数字母混合!",
                        isTrue:false,
                        strong:1
                    };
                }else{
                    var S_level = checkStrong(pwd);
                    switch (S_level) {
                        case 0:
                            return {
                                msg:"密码长度不符合要求，必须8-16位！",
                                isTrue:false,
                                strong:1
                            };
                            break;
                        case 1:
                            return {
                                msg:"",
                                isTrue:true,
                                strong:2
                            };
                            break;
                        case 2:
                            return {
                                msg:"",
                                isTrue:true,
                                strong:3
                            };
                            break;
                        default:
                            return {
                                msg:"",
                                isTrue:true,
                                strong:4
                            };
                    }
                }
            }  
        }
        
        function checkRePwd(pwd,re_pwd){
            if(pwd != re_pwd){
                return {
                    msg:"输入的密码不一致！",
                    isTrue:false
                };
            }else{
                return {
                    msg:"",
                    isTrue:true
                };
            }
        }

        function getUserLevel(scope,UserService){
            scope.levelPercent= 0;
            scope.levelMsg = '';
            scope.phoneAuth = 0;
            scope.IDAuth = 0;
            scope.payPwdAuth = 0;
            scope.emailAuth = 0;
            UserService.getSafeLevel('').success(function (res) {
                if(res.status == 1){
                    var data = res.data[0];
                    scope.phoneAuth = data.phoneStatus;
                    scope.IDAuth = data.realNameStatus;
                    scope.payPwdAuth = data.payPwdStatus;
                    scope.emailAuth = data.emailStatus;
                    var total = scope.phoneAuth + scope.IDAuth+scope.payPwdAuth+scope.emailAuth;
                    switch(total) {
                        case 1:
                            scope.levelPercent = 25;
                            scope.levelMsg = '低';
                            break;
                        case 2:
                            scope.levelPercent = 50;
                            scope.levelMsg = '中';
                            break;
                        case 3:
                            scope.levelPercent = 75;
                            scope.levelMsg = '较高';
                            break;
                        case 4:
                            scope.levelPercent = 100;
                            scope.levelMsg = '高';
                            break;
                    }
                }else{
                    scope.levelMsg = '弱';
                }
            }).error(function (res) {
                scope.levelMsg = '弱';
            });
        }
        
        function checkMoney(money){
            if(!money.replace(/\s/g,'') || money == '0.00' || money == 0 || money == '0.0'){
                return {
                    'msg':'金额数不可为空或0',
                    'isTrue':false
                };
            }else if(!/^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[0-9]{1,2})$/.test(money)){
                return {
                    'msg':'金额数必须是数字且型如100,100.00,100.0',
                    'isTrue':false
                };
            }else{
                return {
                    'msg':'',
                    'isTrue':true
                };
            }
        }
        
        function checkCaptcha(captcha){
            if(!captcha.replace(/\s/g,'')){
                return {
                    'msg':'验证码不可为空！',
                    'isTrue':false
                };
            }else if(!(/^\w{4}$/.test(captcha))){
                return {
                    'msg':'验证码输入有误！',
                    'isTrue':false
                };
            }else{
                return {
                    'msg':'',
                    'isTrue':true
                };
            }
        }
        
        //返回密码的强度级别  
        function checkStrong(sPW) {
            if (sPW.length < 8 || sPW.length > 16) {
                return 0;
            }    
            if(/^[0-9]+$/.test(sPW) || /^[a-zA-Z]+$/.test(sPW) ){
                return 1;
            }else{
                if(sPW.length <12){
                    return 2;
                }else{
                    return 3;
                }
            }
        }
        
        //校验字符串长度
        function strLength(str){
            var sl1=str.length;
            var strLen=0;
            for(var i=0;i<sl1;i++){
                if(str.charCodeAt(i)>255) {
                    strLen+=2;
                }else {
                    strLen++;
                }
            }
            return strLen;
        }
        //验证身份证
        function AuthIDcard(idCard){
            var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ]; 
            var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
	  
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0;
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;
                }
                for ( var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i];
                }
                var valCodePosition = sum % 11;
                if (a_idCard[17] == ValideCode[valCodePosition]) {   
                    return true;   
                } else {   
                    return false;   
                }   
            }   

            function isValidityBrithBy18IdCard(idCard18){
                var year =  idCard18.substring(6,10);
                var month = idCard18.substring(10,12);
                var day = idCard18.substring(12,14);
                var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
                if(temp_date.getFullYear()!=parseFloat(year)
                    ||temp_date.getMonth()!=parseFloat(month)-1
                    ||temp_date.getDate()!=parseFloat(day)){
                    return false;
                }else{
                    return true;
                }
            }

            function isValidityBrithBy15IdCard(idCard15){   
                var year =  idCard15.substring(6,8);
                var month = idCard15.substring(8,10);
                var day = idCard15.substring(10,12);
                var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
                if(temp_date.getYear()!=parseFloat(year)
                    ||temp_date.getMonth()!=parseFloat(month)-1
                    ||temp_date.getDate()!=parseFloat(day)){
                    return false;
                }else{
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
                if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){
                    return true;
                }else {
                    return false;
                }
            } else {
                return false;
            }

        }
    })
    
    .factory('hmd',['$state','AuthService',function($state,AuthService){
        function Controller_Class(){
            return new Controller_Class.fn.init();
        }
        Controller_Class.fn = Controller_Class.prototype = {		
            constructor : 'Controller_Class',
            version : '1.0',
            getListData : function(func,PostService,parm,scope){
                PostService[func](parm).success(function(response){
                    if(response.status == 1){
                        scope.books = response.data;		            
			            
                    }else{
                        var otable = $('#otable');
                        otable.find('tr.ng-scope').remove();
			            
                    }
                });
            },
            /*
             * @description 判断ie版本
             * @params isIE6  isIE7  isIE8
             */
            isIEVersion : function(status){
                var isIE=!!window.ActiveXObject,
                _version = {
                    isIE6 : function(){
                        return isIE&&!window.XMLHttpRequest
                    },
                    isIE7 : function(){
                        return isIE&&!isIE6&&!isIE8
                    },
                    isIE8 : function(){
                        return isIE&&!!document.documentMode
                    }
                };
		    	
                return _version[status]();
            },
            /*
             * @description 设置cookie
             */
            cookie : {            	
                setCookie : function(name,value,time){
                    var strsec = time ? this.getsec(time) : 0,
                    exp = new Date();
                    exp.setTime(exp.getTime() + strsec*1);
                    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
                },
                
                getsec : function(str){
                    var str1=str.substring(1,str.length)*1;
                    var str2=str.substring(0,1);
                    if (str2=="s")
                    {
                        return str1*1000;
                    }
                    else if (str2=="h")
                    {
                        return str1*60*60*1000;
                    }
                    else if (str2=="d")
                    {
                        return str1*24*60*60*1000;
                    }
                },
                
                getCookie : function(name){
                    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                    if(arr=document.cookie.match(reg)){
                        return (arr[2]);
                    }
                    else{
                        return null;
                    }
                },
                
                removeCookie : function(name){
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var cval=this.getCookie(name);
                    if(cval!=null){
                        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
                    }
                }
            },
            
            slider : function(){
                var glide = $('.slider').glide({
                    //autoplay:true,//是否自动播放 默认值 true如果不需要就设置此值
		
                    animationTime:500, //动画过度效果，只有当浏览器支持CSS3的时候生效
                    arrows:true, //是否显示左右导航器
                    arrowsWrapperClass: "arrowsWrapper",//滑块箭头导航器外部DIV类名
                    arrowMainClass: "slider-arrow",//滑块箭头公共类名
                    arrowRightClass:"slider-arrow--right",//滑块右箭头类名
                    arrowLeftClass:"slider-arrow--left",//滑块左箭头类名
                    arrowRightText:">",//定义左右导航器文字或者符号也可以是类
                    arrowLeftText:"<",
		
                    nav:true, //主导航器也就是本例中显示的小方块
                    navCenter:true, //主导航器位置是否居中
                    navClass:"slider-nav",//主导航器外部div类名
                    navItemClass:"slider-nav__item", //本例中小方块的样式
                    navCurrentItemClass:"slider-nav__item--current" //被选中后的样式
                });
            },
            
            /*
			 * @description 给对象数组或数字数组进行排序，对象数组中有一项是数字
			 * @use [].sort(hmd.sort);
			*/
            sort : function(a,b){
                if(typeof a === 'object'){
                    return a.index - b.index;
                }else if(typeof a === 'string' || typeof a === 'number'){
                    return a-b;
                }            	
            },
            
            /*
            * @description 将一个串转化成数组
            * @param str eg: 'pProductName=11&pAmount=22'
            * @param separator1 第一个分隔符，比如像上面的'&',如果不传此参数，默认为'&' 
            * @param separator2 第二个分隔符，比如像上面的'=',如果不传此参数，默认为'=' 
            * @return 会返回这样格式的数组:[{'name' : 'pProductName','value' : 11},{'name' : 'pAmount','value' : 22}]
            */
            transformStringToArray : function(str,separator1,separator2){
                var sep_a = !!separator1 ? separator1 : '&',
                sep_b = !!separator2 ? separator2 : '=',
                arr = str.split(sep_a),
                obj_arr = [];
                for(var i=0,len=arr.length;i<len;i++){
                    var element = arr[i],
                    _arr = element.split(sep_b);
                    obj_arr.push({
                        name: _arr[0],
                        value : _arr[1]
                    });
                }
                return obj_arr;
            },
            
            loadScript : function(url){
                var doc = document,
                script = doc.createElement('script');
                script.type = 'text/javascript';				
                script.src = url;
                doc.getElementsByTagName('head')[0].appendChild(script);
            },
            
            /*
			 * @description 错误信息显示
			 * @param code 就是后台返回的 status
			 * @param status 三个状态error(错误图标),ok(成功图标),attention(警告图标)
			 */
            popupErrorInfo : function(code,status){
                var _doc = document,
                _div = _doc.createElement('div'),
                _width = $(_doc.body).width()/2,
                _height = $(_doc.body).height()/2,
                current_class;
                _div.id = 'error_info_2015032848';
                _div.className = 'modal-dialog';
                if(arguments.length == 1){
                    if(code == 1){
                        current_class = 'ico-ok';
                    }else{
                        current_class = 'ico-error';
                    }					
                    _div.innerHTML = '<div class="modal-content"> <div class="modal-header" style="padding:10px 15px;"> <h3 id="">提示</h3> </div> <div class="modal-body"> <div class="my-modal-tips"> <div class="dialog-content"> <p class="ico '+current_class+'">'+this.presentStatus(code)+'</p> </div> </div> </div> </div>';

                } else if(arguments.length > 1) {
                    if(status === 'ok'){
                        current_class = 'ico-ok';
                    }else if(status === 'error'){
                        current_class = 'ico-error';
                    }else if(status === 'attention'){
                        current_class = 'ico-attention';
                    }
                    _div.innerHTML = '<div class="modal-content"> <div class="modal-header" style="padding:10px 15px;"> <h3 id="">提示</h3> </div> <div class="modal-body"> <div class="my-modal-tips"> <div class="dialog-content"> <p class="ico '+current_class+'">'+code+'</p> </div> </div> </div> </div>';

                }
									
                document.body.appendChild(_div);
				
                _div.style.cssText = ' left: '+(_width-$(_div).width()/2)+'px;  ';
				
                setTimeout(function(){
                    $(_div).remove();
                },1000);							
				
            }, 
            
            /*
			 * @description 数据查询统一方法
			 */
            managePostService : function(func,PostService,parm,scope,callback){
                var self = this;
                PostService[func](parm).success(function(response){
                    if(response.status == 1){	
                        if(!!callback){
                            callback.call(self,response);
                        }			            
                    }else if(parseInt(response.status) == 15){
                        self.redirectLogin();
                    }else{
                        self.popupErrorInfo(response.status);
                    }
                });
            },
            
            //登录过期跳转登录页面
            redirectLogin: function(){
                AuthService.clearUserInfo();
                $state.go('login',{},{
                    reload:true
                });
            },
            
            /** @description 导出统一方法*/
            exportPostService : function(func,PostService,parm,scope){
                PostService[func](parm);
            },
            
            /** @description 导出的参数要根据查询按钮的属性来设置*/
            setExportParamsByQueryAttr : function($obj,param){				
                for(var i in param){
                    $obj.attr(i,param[i]);
                }
            },
            /** @description 将数据转化成表格，仅限两列表格*/
            getDataToHtml : function(data){
                var tr_arr = [];
                $(data).each(function(index,element){
                    tr_arr.push('<tr>');
                    for(var i in this){
                        tr_arr.push('<td>'+this[i]+'</td>');
                    }
                    tr_arr.push('</tr>');
                });
                return tr_arr.join('');
            },
            /* * @description 返回上一页 */
            goBack : function(state,url){
                state.go(url);
            },
            /*
             * @description 刷新本页面
             */
            reload : function(state,url){
                state.go(url,{},{
                    'reload':true
                });
            },
            /** @description 回到页面顶部*/
            scrollToTop : function(){
                if(arguments.length>0){
                    window.scrollTo(0,arguments[0]);
                }else{
                    window.scrollTo(0,0);
                }
            },
            
            presentStatus : function(status){
                var status_obj = {
                    '-9999' : '系统异常',
                    '-999' : '系统异常',
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
                    '10': '权重值输入不正确',
                    '11':'修改失败',
                    '12':'缓存存储异常',
                    '13':'token为空',
                    '14':'用户名为空',
                    '15':'用户未登录',
                    '16':'投资方式不能为空',
                    '17':'投资金额不能大于账户余额',
                    '18':'没有选择产品',
                    '19':'投资金额不能为空',
                    '20':'每月提取利息不能小于0',
                    '21':'每月提取利息不能大于每月赢取利息',
                    '22':'借款申请金额格式错误',
                    '23':'请输入中文姓名',
                    '24':'未选中性别',
                    '25':'手机格式错误',
                    '26':'验证码不能为空',
                    '27':'验证码输入不正确',
                    '28':'字典表组名不能为空！',
                    '29':'字典表选项名不能为空！',
                    '30':'字典表选项值不能为空！',
                    '31':'组名存在',
                    '32':'选项名存在',
                    '33':'未选择要删除的id',
                    '34':'id必须是数字',
                    '35':'未选择要更新的id',
                    '36':'分页号不能为空',
                    '37':'分页参数不能为空',
                    '38':'借款Id（合同编号）不能为空',
                    '39':'债务人不能为空',
                    '40':'身份证号不能为空',
                    '41':'借款用途不能为空',
                    '42':'借款类型（标的类型）不能为空',
                    '43':'原始期限（月）不能为空',
                    '44':'原始借款开始日期不能为空',
                    '45':'原始借款到期日期不能为空',
                    '46':'还款方式不能为空',
                    '47':'还款日不能为空',
                    '48':'还款金额（元）不能为空',
                    '49':'债权金额（元）不能为空',
                    '50':'债权年化利率（%）不能为空',
                    '51':'债权转入金额不能为空',
                    '52':'债权转入日期不能为空',
                    '53':'债权转入期限（月）不能为空',
                    '54':'债权转出日期不能为空',
                    '55':'债权人不能为空',
                    '56':'身份证号长度为数字字母',
                    '57':'债权状态不能修改',
                    '58':'债权状态不能为空',
                    '59':'债权编号不能为空',
                    '60':'债权状态不能删除',
                    '61':'未选中需要下载的数据',
                    '62':'审核状态不能为空',
                    '63':'债权转让表Id为空或格式不正确',
                    '64':'债权转让表权重值输入不正确！',
                    '65':'用户锁定',
                    '66':'用户名密码不正确',
                    '67':'手机已经被注册',
                    '68':'用户名格式不正确',
                    '69':'用户名不能为纯数字',
                    '70':'用户名已经存在',
                    '71':'密码为空',
                    '72':'密码为8-16位数字或字母组合',
                    '73':'邀请码格式不正确',
                    '74':'员工不存在',
                    '75':'注册失败',
                    '76':'老密码不能为空',
                    '77':'新密码不能为空',
                    '78':'token过期',
                    '79':'新密码不能与旧密码相同',
                    '80':'手机不能为空',
                    '81':'添加失败',
                    '82':'姓名证件不匹配',
                    '83':'匹配结果未确认',
                    '84':'匹配结果已确认',
                    '85':'匹配结果未清算',
                    '86':'匹配结果已清算',
                    '87':'投资金额为100的整数倍',
                    '88':'购买期限不能小于1个月',
                    '89':'输入的投资类型必须是数字',
                    '90':'投资类型不能为空',
                    '91':'输入的产品名必须是数字',
                    '92':'期限必须是数字',
                    '93':'每月赢取利息必须是数字',
                    '94':'每月提取利息必须是数字',
                    '95':'购买期限不能小于12个月',
                    '96':'购买金额最小值必须大于100',
                    '97':'购买金额必须是100的整数倍',
                    '98':'充值金额不能为空',
                    '99':'请选择银行充值',
                    '100':'导入数据为空',
                    '101':'导入数据失败，xx条出现错误',
                    '102':'导入数据失败，导入文件不存在',
                    '103':'输入的页码不能小于1',
                    '104':'期限不能大于36个月',
                    '105':'起始日期不能大于截止日期',
                    '106':'提现金额不能为空',
                    '107':'提现金额不能小于0',
                    '108':'支付密码不能为空',
                    '109':'提现金额不能大于可用余额',
                    '110':'提现金额必须大于手续费',
                    '111':'支付密码不正确',
                    '112':'请输入汉字',
                    '113':'债权未审核',
                    '114':'无可用期限',
                    '115':'可用期数为0无法进行提前结清',
                    '116':'无待匹配资金',
                    '117':'无待匹配债权',
                    '118':'今日已执行过匹配，请勿再次匹配!',
                    '119':'匹配日志对象为null',
                    '120':'匹配日志集合为null',
                    '121':'匹配请求为null',
                    '122':'待匹配资金集合为空',
                    '123':'待匹配债权集合为空',
                    '124':'无匹配结果',
                    '125':'转换请求为null',
                    '126':'转换响应结果为null',
                    '127':'匹配日志po为null',
                    '128':'运营人员集合为空',
                    '129':'支付密码认证失败',
                    '130':'支付密码长度不足',
                    '131':'支付密码有特殊字符',
                    '132':'结算失败',
                    '133':'支付密码与登陆密码相同',
                    '134':'投资金额过多',
                    '135':'待匹配资金总额为零或小于零',
                    '136':'待匹配债权总额为为零或小于零',
                    '137':'待匹配资金对象为空',
                    '138':'新支付密码不能与原支付密码相等',
                    '139':'原支付密码错误',
                    '140':'该用户已锁定',
                    '141':'匹配后响应对象为null',
                    '142':'无匹配结果',
                    '143':'规则引擎匹配请求对象为null',
                    '144':'登陆密码不能与支付密码相同',
                    '145':'参数名集合为空',
                    '146':'参数值集合为空',
                    '147':'该用户已经进行过实名验证',
                    '148':'其他用户正在操作，请稍等',
                    '149':'未选中需要待匹配债权队列退出的数据',
                    '150':'投资金额必须是数字',
                    '151': '原密码错误',
                    '152': '操作时间超时',
                    '153': '债权结算失败',
                    '154': '输入短信验证码错误次数过多，请重新获取',
                    '155': '手机验证码已失效',
                    '156': '图片验证码已失效',
                    '157': '未选中退出队列',
                    '158': '申请借款金额不能超过1亿',
                    '159': '资金已结算成功',
                    '160': '资金结算进行中 ',
                    '161': '债权已结算成功或债权结算进行中 ',
                    '162': '资金结算失败 ',
                    '163': '导入文件不存在 ',
                    '164': '数据中存在非付款中状态的数据',
                    '165': '文件中付款状态存在问题 ',
                    '166': '导入数据错误  ',
                    '167': '上传失败  ',
                    '168': '资金结算失败  ',
                    '169': '债权待匹配队列有正在匹配的数据  ',
                    '170': '债权待匹配队列数据为空  ',
                    '171': '债权自动跑批未成功不能提前结清操作  ',
                    '172': '宕机处理时间不能在当前时间之后  ',
                    '173': '该类型的产品不能进行提前结清  ',
                    '174': '邮箱格式不正确 ',
                    '175': '您输入的旧邮箱不正确 ',
                    '176': '您输入的新邮箱和旧邮箱一致 ',
                    '177': '该邮箱已经存在，请更换一个邮箱号'
                };
                return status_obj[status];
            }
        };
        
        var init = Controller_Class.fn.init = function(){};
        init.prototype = Controller_Class.fn; 
        $.extend(Controller_Class.fn,{
            /*
             * @description 画饼图
             */            
            
            getPieAllDataByProduct : function(_arr){
                $('#donutchart').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: '资产总计'
                    },
                    
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '百分比',
                        data: _arr
                    }]
                });
            },
            
            /*
             * @description 画折线
             */
            getLineAllDataByProduct : function(_s){
                var _str = !!_s ? _s : '月取计划'
                var oid = 'barchart';
                $('#'+oid).html('');
                var data = !!this.barchart ? this.barchart : [];
                if(data.length > 0){
                    var data_sort = [],
                    data_time = [],
                    data_time_new = [],
                    data_time_copy = [],
                    min_value,max_value,
                    data_money = [];
                    $(data).each(function(index,element){
                        var UExpectedDate = element.UExpectedDate,
                        _arr = UExpectedDate.split('-'),
                        _year = _arr[0],
                        _m = _arr[1],
                        _month = _m.length == 1 ? '0'+_m : _m,
                        _date = _year+'.'+_month;
                        data_sort.push({
                            index:_date,
                            value:!!element.UExpectedMoney ? element.UExpectedMoney : 0
                        })	                    
	            		                  		
                    });
                    
                    data_sort = data_sort.sort(this.sort);
                    $(data_sort).each(function(index,element){
                        if(data_sort.length >= 10){
                            if((index+1)%2 == 0){
                                data_time.push('');
                            }else{
                                data_time.push(element.index);
                            }
                        }else{
                            data_time.push(element.index);
                        }
                        data_time_copy.push(element.index);
                        data_money.push(element.value);  
                    });
	                
                    $('#barchart').highcharts({
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: _str
                        },
					        
                        xAxis: {
                            categories: data_time
                        },
                        yAxis: {
                            title: {
                                text: '金额'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: false
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: '待收收益',
                            data: data_money
                        }]
                    });                 		                    	
	           
                }
                if(data.length == 0){
                    $('#'+oid).html('<span style="font-size:20px">没有数据！<span>');
                }
            }
        });
        return Controller_Class();
		
    }])
    
    .service('MetaService', function() {
        var title = 'P2P网贷平台 P2P信贷投资理财';
        var metaKeywords = '';
        var metaDescription = '';
        return {
            set: function(newTitle,newKeywords,newMetaDescription) {
                title = newTitle; 
                metaKeywords = newKeywords;
                metaDescription = newMetaDescription;
            },
            metaTitle: function(){
                return title;
            },
            metaKeywords: function() {
                return metaKeywords;
            },
            metaDescription: function() {
                return metaDescription;
            }
        }
    });
angular.module('AppRouterService', ['ui.router'])
    .config(function($locationProvider,$stateProvider, $urlRouterProvider) {
        $urlRouterProvider
        .when('', '/')
        .otherwise('404');
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'IndexCtrl'
        })
        .state("login", {
            url: "/login",
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        //我要借款
        .state("lending", {
            url: "/lending",
            templateUrl: 'views/lending.html',
            controller: 'lendCtrls',
        	access:{
                'requiredAuth':true
            }
        })
        
        .state("reg", {
            url: "/reg/:code",
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        })
        
        .state("backpwd", {
            url: "/backpwd",
            templateUrl: 'views/backpwd.html',
            controller: 'backPwdCtrl'
        })
        
        .state('space', {
            url: '/space',
            templateUrl: 'views/space/space.html',
            controller: "myspaceCtrl",
            abstract: !0,
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.home', {
            url: '',
            templateUrl: 'views/space/home.html',
            controller: 'homeCtrl',
            access:{
                'requiredAuth':true
            }
        })	
        
        //交易记录
        .state('space.record', {
            url: '/record',
            templateUrl: 'views/space/record.html',
            controller: 'recordCtrl',
            abstract: !0,
            access:{
                'requiredAuth':true
            }
        })
        
        //全部交易记录
        .state('space.record.dealAll', {
            url: '',
            templateUrl: 'views/space/home/dealAll.html',
            controller: 'deelAllCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //充值记录
        .state('space.record.rechargeinfo', {
            url: '/rechargeinfo',
            templateUrl: 'views/space/home/recharge.html',
            controller: 'rechargeInfoCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //提现记录
        .state('space.record.deposit', {
            url: '/deposit',
            templateUrl: 'views/space/home/deposit.html',
            controller: 'depositCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        
        //投资记录
        .state('space.record.invest', {
            url: '/invest',
            templateUrl: 'views/space/home/invest.html',
            controller: 'investSpaceCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //收益记录
        .state('space.record.earnings', {
            url: '/earnings',
            templateUrl: 'views/space/home/earnings.html',
            controller: 'earningsCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //回收本金
        .state('space.record.principal', {
            url: '/principal',
            templateUrl: 'views/space/home/principal.html',
            controller: 'principalCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.record.lending', {
            url: '/lending',
            templateUrl: 'views/space/home/lending.html',
            controller: 'lendingCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.record.repayment', {
            url: '/repayment',
            templateUrl: 'views/space/home/repayment.html',
            controller: 'repaymentCtrl',
            access:{
                'requiredAuth':true
            }
        })
			
        .state('space.statistics', {
            url: '/statistics',
            templateUrl: 'views/space/statistics.html',
            controller: 'asset_statistics',
            access:{
                'requiredAuth':true
            }
        })
        
        //我的投资
        .state('space.myinvest', {
            url: '/myinvest',
            templateUrl: 'views/space/myinvest.html',
            abstract: !0,
            controller:'myinvestCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //投资 --  购买中计划
        .state('space.myinvest.buying',{
            url:'',
            templateUrl:'views/space/myinvest/buying.html',
            controller:'buyingCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //回款中计划    
        .state('space.myinvest.returning',{
            url:'/returning',
            templateUrl:'views/space/myinvest/returning.html',
            controller:'returningCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //已结清计划
        .state('space.myinvest.cleared',{
            url:'/cleared',
            templateUrl:'views/space/myinvest/cleared.html',
            controller:'clearedCtrl',
            access:{
                'requiredAuth':true
            }
        })
			
        .state('space.security', {
            url: "/security/:flag",
            templateUrl: 'views/space/setcecurity.html',
            controller: 'setCecurityCtrl',
            access: {
                requiredAuth: true
            }
        })
        
        .state('space.authrealname', {
            url: "/authrealname",
            templateUrl: 'views/space/authrealname.html',
            controller: 'authRealNameCtrl',
            access: {
                requiredAuth: true
            }
        })

        
        .state("moto", {
            url: "/moto",
            templateUrl: 'views/moto.html',
            controller: 'motoCtrl'
        })
        
        .state("protocol", {
            url: "/protocol/:str",
            templateUrl: 'views/protocol.html',
            controller: 'protocolCtrl'
        })

        //个人中心 充值
        .state("space.recharge", {
            url: "/recharge",
            templateUrl: 'views/space/recharge.html',
            controller: 'rechargeCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //个人中心 提现
        .state("space.cashnew", {
            url: "/cashnew",
            templateUrl: 'views/space/cashnew.html',
            controller: 'cashNewCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //个人中心 银行卡信息
        .state("space.bankinfo", {
            url: "/bankinfo",
            templateUrl: 'views/space/bankinfo.html',
            controller: 'bankInfoCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //帮助中心
        .state("help", {
            url: "/helper",
            templateUrl: 'views/help.html',
            controller:'helpCtrl'
        })
        
        //投资学堂
        .state("school", {
            url: "/school",
            templateUrl: 'views/school.html',
            controller:'schoolCtrl'
        })
        
        .state('space.setnotice',{
            url:"/setnotice",
            templateUrl:"views/space/setnotice.html",
            controller: 'setnoticeCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //站内信
        .state('space.allmsg',{
            url:"/allmsg",
            templateUrl:"views/space/message/allmessage.html",
            controller: 'allMsgCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.readedmsg',{
            url:"/readedmsg",
            templateUrl:"views/space/message/readedmessage.html",
            controller: 'readedMsgCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.readingmsg',{
            url:"/readingmsg",
            templateUrl:"views/space/message/readingmessage.html",
            controller: 'readingMsgCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        //邀请奖励
        .state('space.award',{
            url:"/award",
            templateUrl:"views/space/award.html",
            controller: 'awardCtrl',
            access:{
                'requiredAuth':true
            }
        })
        
        .state('space.invitcode', {
            url: "/invitcode/:invid",
            templateUrl: 'views/space/invitcode.html',
            controller: 'updateInvCodeCtrl',
            access: {
                requiredAuth: true
            }
        })
       
        .state("404", {
            url: "/404",
            templateUrl: 'views/404.html'
        })	
        //$locationProvider.html5Mode(!0);
    })
    .config(function($sceProvider) {
        $sceProvider.enabled(false);
    })
    
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    })
    
    .run(function($rootScope, $state, AuthService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
            if(toState.access != null && toState.access.requiredAuth && !AuthService.isAuthenticated() && !AuthService.getToken()){
                event.preventDefault();
                $state.go('login');
            }
        });
        $rootScope.loginName = '';
        if (AuthService.isAuthenticated() && AuthService.getToken()) {
            $rootScope.loginName = AuthService.getCookie('user');
        }

    });
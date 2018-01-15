'use strict';
var app = angular.module('app', [ 'AppRouterService', 'AppController',
		'AppCommonService', 'AppDirective', 'angularFileUpload' ]);

//定义了一个模块app
//代表
//['AppRouterService', 'AppController','AppCommonService', 'AppDirective', 'angularFileUpload' ]   这些
//上面这段代码，代表我们自己的app模块与这些模块有关系。

//  AppRouterService------->AppRouterService.js
// AppController ---------->AppController.js
// AppCommonService-------->AppCommonService.js
'';
angular.module('AppDirective', [])
.controller('PaginationController',['$scope','$attrs','$parse',function($scope,$attrs,$parse){var self=this,ngModelCtrl={$setViewValue:angular.noop},setNumPages=$attrs.numPages?$parse($attrs.numPages).assign:angular.noop;this.init=function(ngModelCtrl_,config){ngModelCtrl=ngModelCtrl_;this.config=config;ngModelCtrl.$render=function(){self.render()};if($attrs.itemsPerPage){$scope.$parent.$watch($parse($attrs.itemsPerPage),function(value){self.itemsPerPage=parseInt(value,10);$scope.totalPages=self.calculateTotalPages()})}else{this.itemsPerPage=config.itemsPerPage}};this.calculateTotalPages=function(){var totalPages=this.itemsPerPage<1?1:Math.ceil($scope.totalItems/this.itemsPerPage);return Math.max(totalPages||0,1)};this.render=function(){$scope.page=parseInt(ngModelCtrl.$viewValue,10)||1};$scope.selectPage=function(page){if($scope.page!==page&&page>0&&page<=$scope.totalPages){ngModelCtrl.$setViewValue(page);ngModelCtrl.$render()}};$scope.getText=function(key){return $scope[key+'Text']||self.config[key+'Text']};$scope.noPrevious=function(){return $scope.page===1};$scope.noNext=function(){return $scope.page===$scope.totalPages};$scope.$watch('totalItems',function(){$scope.totalPages=self.calculateTotalPages()});$scope.$watch('totalPages',function(value){setNumPages($scope.$parent,value);if($scope.page>value){$scope.selectPage(value)}else{ngModelCtrl.$render()}})}]).constant('paginationConfig',{itemsPerPage:10,boundaryLinks:false,directionLinks:true,firstText:'First',previousText:'Previous',nextText:'Next',lastText:'Last',rotate:true}).directive('pagination',['$parse','paginationConfig',function($parse,paginationConfig){return{restrict:'EA',scope:{totalItems:'=',firstText:'@',previousText:'@',nextText:'@',lastText:'@'},require:['pagination','?ngModel'],controller:'PaginationController',templateUrl:'views/pager/pagination.html',replace:true,link:function(scope,element,attrs,ctrls){var paginationCtrl=ctrls[0],ngModelCtrl=ctrls[1];if(!ngModelCtrl){return}var maxSize=angular.isDefined(attrs.maxSize)?scope.$parent.$eval(attrs.maxSize):paginationConfig.maxSize,rotate=angular.isDefined(attrs.rotate)?scope.$parent.$eval(attrs.rotate):paginationConfig.rotate;scope.boundaryLinks=angular.isDefined(attrs.boundaryLinks)?scope.$parent.$eval(attrs.boundaryLinks):paginationConfig.boundaryLinks;scope.directionLinks=angular.isDefined(attrs.directionLinks)?scope.$parent.$eval(attrs.directionLinks):paginationConfig.directionLinks;paginationCtrl.init(ngModelCtrl,paginationConfig);if(attrs.maxSize){scope.$parent.$watch($parse(attrs.maxSize),function(value){maxSize=parseInt(value,10);paginationCtrl.render()})}function makePage(number,text,isActive){return{number:number,text:text,active:isActive}}function getPages(currentPage,totalPages){var pages=[];var startPage=1,endPage=totalPages;var isMaxSized=(angular.isDefined(maxSize)&&maxSize<totalPages);if(isMaxSized){if(rotate){startPage=Math.max(currentPage-Math.floor(maxSize/2),1);endPage=startPage+maxSize-1;if(endPage>totalPages){endPage=totalPages;startPage=endPage-maxSize+1}}else{startPage=((Math.ceil(currentPage/maxSize)-1)*maxSize)+1;endPage=Math.min(startPage+maxSize-1,totalPages)}}for(var number=startPage;number<=endPage;number++){var page=makePage(number,number,number===currentPage);pages.push(page)}if(isMaxSized&&!rotate){if(startPage>1){var previousPageSet=makePage(startPage-1,'...',false);pages.unshift(previousPageSet)}if(endPage<totalPages){var nextPageSet=makePage(endPage+1,'...',false);pages.push(nextPageSet)}}return pages}var originalRender=paginationCtrl.render;paginationCtrl.render=function(){originalRender();if(scope.page>0&&scope.page<=scope.totalPages){scope.pages=getPages(scope.page,scope.totalPages)}}}}}]).constant('pagerConfig',{itemsPerPage:10,previousText:'« Previous',nextText:'Next »',align:true}).directive('pager',['pagerConfig',function(pagerConfig){return{restrict:'EA',scope:{totalItems:'=',previousText:'@',nextText:'@'},require:['pager','?ngModel'],controller:'PaginationController',templateUrl:'template/pagination/pager.html',replace:true,link:function(scope,element,attrs,ctrls){var paginationCtrl=ctrls[0],ngModelCtrl=ctrls[1];if(!ngModelCtrl){return}scope.align=angular.isDefined(attrs.align)?scope.$parent.$eval(attrs.align):pagerConfig.align;paginationCtrl.init(ngModelCtrl,pagerConfig)}}}])
.directive("datepicker",function(){
	  return {
	    restrict:"A",
		scope:{
			datestart: "=",
			dateend: "="
		},
	    link:function(scope,element,attr){
			$(element).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {			
                    scope.$apply();
                },
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
               	changeYear: true,				
				numberOfMonths: 1,
				beforeShow: function() { $(element).val('') }, 
				onClose: function( selectedDate ) { 
					if(!!attr['nextid']){
						if(attr['datestart'] === "datestart"){
							$( "#"+attr['nextid'] ).datepicker( "option", "minDate", selectedDate ); 
						}
						if(attr['datestart'] === "dateend"){
							$( "#"+attr['nextid'] ).datepicker( "option", "maxDate", selectedDate ); 
						}
					}
					
					
				}
            });
	    }
	  };
	});
angular.module('ui.slider', []).value('uiSliderConfig',{}).directive('uiSlider', ['uiSliderConfig', '$timeout', function(uiSliderConfig, $timeout) {
    uiSliderConfig = uiSliderConfig || {};
    return {
        require: 'ngModel', //当前的uiSlider指令是对表单进行增强操作
        
        compile: function () {
            return function (scope, elm, attrs, ngModel) {
                function parseNumber(n, decimals) {
                    return (decimals) ? parseFloat(n) : parseInt(n, 10);
                }
                var options = angular.extend(scope.$eval(attrs.uiSlider) || {}, uiSliderConfig);
                var prevRangeValues = {
                    min: null,
                    max: null
                };
                var properties = ['min', 'max', 'step'];
                
                var useDecimals = (!angular.isUndefined(attrs.useDecimals)) ? true : false;
                var init = function() {
                    if (angular.isArray(ngModel.$viewValue) && options.range !== true) {
                        options.range = true;
                    }
                    angular.forEach(properties, function(property) {
                        if (angular.isDefined(attrs[property])) {
                            options[property] = parseNumber(attrs[property], useDecimals);
                        }
                    });
                    elm.slider(options);
                    init = angular.noop;
                };
                angular.forEach(properties, function(property) {
                    attrs.$observe(property, function(newVal) {
                        if (!!newVal) {
                            init();
                            options[property] = parseNumber(newVal, useDecimals);
                            elm.slider('option', property, parseNumber(newVal, useDecimals));
                            ngModel.$render();
                        }
                    });
                });
                attrs.$observe('disabled', function(newVal) {
                    init();
                    elm.slider('option', 'disabled', !!newVal);
                });
                scope.$watch(attrs.uiSlider, function(newVal) {
                    init();
                    if(newVal !== undefined) {
                        elm.slider('option', newVal);
                    }
                }, true);
                $timeout(init, 0, true);
                elm.bind('slide', function(event, ui) {
                    ngModel.$setViewValue(ui.values || ui.value);
                    scope.$apply();
                });
                ngModel.$render = function() {
                    init();
                    var method = options.range === true ? 'values' : 'value';
                    if (!options.range && isNaN(ngModel.$viewValue) && !(ngModel.$viewValue instanceof Array)) {
                        ngModel.$viewValue = 0;
                    }
                    else if (options.range && !angular.isDefined(ngModel.$viewValue)) {
                        ngModel.$viewValue = [0,0];
                    }
                    if (options.range === true) {
                        if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
                            ngModel.$viewValue[0] = options.min;
                        }
                        if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
                            ngModel.$viewValue[1] = options.max;
                        }
                        if (ngModel.$viewValue[0] > ngModel.$viewValue[1]) {
                            if (prevRangeValues.min >= ngModel.$viewValue[1]) {
                                ngModel.$viewValue[0] = prevRangeValues.min;
                            }
                            if (prevRangeValues.max <= ngModel.$viewValue[0]) {
                                ngModel.$viewValue[1] = prevRangeValues.max;
                            }
                        }
                        prevRangeValues.min = ngModel.$viewValue[0];
                        prevRangeValues.max = ngModel.$viewValue[1];
                    }
                    elm.slider(method, ngModel.$viewValue);
                };
                scope.$watch(attrs.ngModel, function() {
                    if (options.range === true) {
                        ngModel.$render();
                    }
                }, true);
                function destroy() {
                    elm.slider('destroy');
                }
                elm.bind('$destroy', destroy);
            };
        }
    };
}]);

angular.module('AppDirective', [])
    .controller('PaginationController',['$scope','$attrs','$parse',function($scope,$attrs,$parse){
        var self=this,
        ngModelCtrl={
            $setViewValue:angular.noop
        },
        setNumPages=$attrs.numPages?$parse($attrs.numPages).assign:angular.noop;
        this.init=function(ngModelCtrl_,config){
            ngModelCtrl=ngModelCtrl_;
            this.config=config;
            ngModelCtrl.$render=function(){
                self.render()
            };
            if($attrs.itemsPerPage){
                $scope.$parent.$watch($parse($attrs.itemsPerPage),function(value){
                    self.itemsPerPage=parseInt(value,10);
                    $scope.totalPages=self.calculateTotalPages()
                })
            }else{
                this.itemsPerPage=config.itemsPerPage
            }
        };
        this.calculateTotalPages=function(){
            var totalPages=this.itemsPerPage<1?1:Math.ceil($scope.totalItems/this.itemsPerPage);
            return Math.max(totalPages||0,1)
        };
        
        this.render=function(){
            $scope.page=parseInt(ngModelCtrl.$viewValue,10)||1
        };
        
        $scope.selectPage=function(page){
            if($scope.page!==page&&page>0&&page<=$scope.totalPages){
                ngModelCtrl.$setViewValue(page);
                ngModelCtrl.$render()
            }
        };
    
        $scope.getText=function(key){
            return $scope[key+'Text']||self.config[key+'Text']
        };
        
        $scope.noPrevious=function(){
            return $scope.page===1
        };
        
        $scope.noNext=function(){
            return $scope.page===$scope.totalPages
        };
        
        $scope.$watch('totalItems',function(){
            $scope.totalPages=self.calculateTotalPages()
        });
        $scope.$watch('totalPages',function(value){
            setNumPages($scope.$parent,value);
            if($scope.page>value){
                $scope.selectPage(value)
            }else{
                ngModelCtrl.$render()
            }
        })
    }]).constant('paginationConfig',{
        itemsPerPage:10,
        boundaryLinks:false,
        directionLinks:true,
        firstText:'First',
        previousText:'Previous',
        nextText:'Next',
        lastText:'Last',
        rotate:true
    }).directive('pagination',['$parse','paginationConfig',function($parse,paginationConfig){
        return{
            restrict:'EA',
            scope:{
                totalItems:'=',
                firstText:'@',
                previousText:'@',
                nextText:'@',
                lastText:'@'
            },
            require:['pagination','?ngModel'],
            controller:'PaginationController',
            templateUrl:'views/pager/pagination.html',
            replace:true,
            link:function(scope,element,attrs,ctrls){
                var paginationCtrl=ctrls[0],ngModelCtrl=ctrls[1];
                if(!ngModelCtrl){
                    return
                }
                var maxSize=angular.isDefined(attrs.maxSize)?scope.$parent.$eval(attrs.maxSize):paginationConfig.maxSize,rotate=angular.isDefined(attrs.rotate)?scope.$parent.$eval(attrs.rotate):paginationConfig.rotate;
                scope.boundaryLinks=angular.isDefined(attrs.boundaryLinks)?scope.$parent.$eval(attrs.boundaryLinks):paginationConfig.boundaryLinks;
                scope.directionLinks=angular.isDefined(attrs.directionLinks)?scope.$parent.$eval(attrs.directionLinks):paginationConfig.directionLinks;
                paginationCtrl.init(ngModelCtrl,paginationConfig);
                if(attrs.maxSize){
                    scope.$parent.$watch($parse(attrs.maxSize),function(value){
                        maxSize=parseInt(value,10);
                        paginationCtrl.render()
                    })
                }
                function makePage(number,text,isActive){
                    return{
                        number:number,
                        text:text,
                        active:isActive
                    }
                }
                function getPages(currentPage,totalPages){
                    var pages=[];
                    var startPage=1,endPage=totalPages;
                    var isMaxSized=(angular.isDefined(maxSize)&&maxSize<totalPages);
                    if(isMaxSized){
                        if(rotate){
                            startPage=Math.max(currentPage-Math.floor(maxSize/2),1);
                            endPage=startPage+maxSize-1;
                            if(endPage>totalPages){
                                endPage=totalPages;
                                startPage=endPage-maxSize+1
                            }
                        }else{
                            startPage=((Math.ceil(currentPage/maxSize)-1)*maxSize)+1;
                            endPage=Math.min(startPage+maxSize-1,totalPages)
                        }
                    }
                    for(var number=startPage;number<=endPage;number++){
                        var page=makePage(number,number,number===currentPage);
                        pages.push(page)
                    }
                    if(isMaxSized&&!rotate){
                        if(startPage>1){
                            var previousPageSet=makePage(startPage-1,'...',false);
                            pages.unshift(previousPageSet)
                        }
                        if(endPage<totalPages){
                            var nextPageSet=makePage(endPage+1,'...',false);
                            pages.push(nextPageSet)
                        }
                    }
                    return pages
                }
                var originalRender=paginationCtrl.render;
                paginationCtrl.render=function(){
                    originalRender();
                    if(scope.page>0&&scope.page<=scope.totalPages){
                        scope.pages=getPages(scope.page,scope.totalPages)
                    }
                }
            }
        }
    }]).constant('pagerConfig',{
        itemsPerPage:10,
        previousText:'« Previous',
        nextText:'Next »',
        align:true
    }).directive('pager',['pagerConfig',function(pagerConfig){
        return{
            restrict:'EA',
            scope:{
                totalItems:'=',
                previousText:'@',
                nextText:'@'
            },
            require:['pager','?ngModel'],
            controller:'PaginationController',
            templateUrl:'template/pagination/pager.html',
            replace:true,
            link:function(scope,element,attrs,ctrls){
                var paginationCtrl=ctrls[0],ngModelCtrl=ctrls[1];
                if(!ngModelCtrl){
                    return
                }
                scope.align=angular.isDefined(attrs.align)?scope.$parent.$eval(attrs.align):pagerConfig.align;
                paginationCtrl.init(ngModelCtrl,pagerConfig)
            }
        }
    }])
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
                    changeMonth: true,
                    changeYear:true,
                    showButtonPanel: true,
                    numberOfMonths: 1,
                    onSelect: function (date) {
                        if(this.id === "date_start"){
                            scope.datestart = date;
                        }
                        if(this.id === "date_end"){
                            scope.dateend = date;
                        }
                        scope.$apply();
                    },
                    onClose: function( selectedDate ) { 
                        if(this.id === 'date_start'){
                            $( "#date_end" ).datepicker( "option", "minDate", selectedDate ); 
                        }
                        if(this.id === 'date_end'){
                            $( "#date_start" ).datepicker( "option", "maxDate", selectedDate ); 
                        }
					
                    }
                });
            }
        };
    })
    // 资产统计--折线图
    .directive('barChart', function(){
        return{
            restrict: 'E',
            scope: {
                barchart: '='
            },
            link: function(scope, elem, attrs){
            }
        }
    })
    // 资产统计--饼图
    .directive('donutChart', function(){
        return{
            restrict: 'E',
            scope: {
                donutchart: '='
            },
            link: function(scope, elem, attrs){
            }
        }
    })

    .factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {
        var $transition = function(element, trigger, options) {
            options = options || {};
            var deferred = $q.defer();
            var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];
            var transitionEndHandler = function(event) {
                $rootScope.$apply(function() {
                    element.unbind(endEventName, transitionEndHandler);
                    deferred.resolve(element);
                });
            };

            if (endEventName) {
                element.bind(endEventName, transitionEndHandler);
            }
            $timeout(function() {
                if ( angular.isString(trigger) ) {
                    element.addClass(trigger);
                } else if ( angular.isFunction(trigger) ) {
                    trigger(element);
                } else if ( angular.isObject(trigger) ) {
                    element.css(trigger);
                }
                if ( !endEventName ) {
                    deferred.resolve(element);
                }
            });

            deferred.promise.cancel = function() {
                if ( endEventName ) {
                    element.unbind(endEventName, transitionEndHandler);
                }
                deferred.reject('Transition cancelled');
            };
            return deferred.promise;
        };

        var transElement = document.createElement('trans');
        var transitionEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionend'
        };
        var animationEndEventNames = {
            'WebkitTransition': 'webkitAnimationEnd',
            'MozTransition': 'animationend',
            'OTransition': 'oAnimationEnd',
            'transition': 'animationend'
        };
        function findEndEventName(endEventNames) {
            for (var name in endEventNames){
                if (transElement.style[name] !== undefined) {
                    return endEventNames[name];
                }
            }
        }
        $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
        $transition.animationEndEventName = findEndEventName(animationEndEventNames);
        return $transition;
    }])

    .directive('carousel', [function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            controller: 'CarouselController',
            require: 'carousel',
            templateUrl: 'views/pager/carousel.html',
            scope: {
                interval: '=',
                noTransition: '=',
                noPause: '='
            }
        };
    }])

    .directive('slide', function() {
        return {
            require: '^carousel',
            restrict: 'EA',
            transclude: true,
            replace: true,
            templateUrl: 'views/pager/slide.html',
            scope: {
                active: '=?'
            },
            link: function (scope, element, attrs, carouselCtrl) {
                carouselCtrl.addSlide(scope, element);
	  
                scope.$on('$destroy', function() {
                    carouselCtrl.removeSlide(scope);
                });

                scope.$watch('active', function(active) {
                    if (active) {
                        carouselCtrl.select(scope);
                    }
                });
            }
        };
    })
    .controller('CarouselController', ['$scope', '$timeout', '$interval', '$transition', function ($scope, $timeout, $interval, $transition) {
        var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1,
        currentInterval, isPlaying;
        self.currentSlide = null;
        var destroyed = false;
        self.select = $scope.select = function(nextSlide, direction) {
            var nextIndex = slides.indexOf(nextSlide);
            if (direction === undefined) {
                direction = nextIndex > currentIndex ? 'next' : 'prev';
            }
            if (nextSlide && nextSlide !== self.currentSlide) {
                if ($scope.$currentTransition) {
                    $scope.$currentTransition.cancel();
                    $timeout(goNext);
                } else {
                    goNext();
                }
            }
            function goNext() {
                if (destroyed) {
                    return;
                }
                if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                    nextSlide.$element.addClass(direction);
                    var reflow = nextSlide.$element[0].offsetWidth;
                    angular.forEach(slides, function(slide) {
                        angular.extend(slide, {
                            direction: '', 
                            entering: false, 
                            leaving: false, 
                            active: false
                        });
                    });
                    angular.extend(nextSlide, {
                        direction: direction, 
                        active: true, 
                        entering: true
                    });
                    angular.extend(self.currentSlide||{}, {
                        direction: direction, 
                        leaving: true
                    });
                    $scope.$currentTransition = $transition(nextSlide.$element, {});
                    (function(next,current) {
                        $scope.$currentTransition.then(
                            function(){
                                transitionDone(next, current);
                            },
                            function(){
                                transitionDone(next, current);
                            }
                            );
                    }(nextSlide, self.currentSlide));
                } else {
                    transitionDone(nextSlide, self.currentSlide);
                }
                self.currentSlide = nextSlide;
                currentIndex = nextIndex;
                restartTimer();
            }
            function transitionDone(next, current) {
                angular.extend(next, {
                    direction: '', 
                    active: true, 
                    leaving: false, 
                    entering: false
                });
                angular.extend(current||{}, {
                    direction: '', 
                    active: false, 
                    leaving: false, 
                    entering: false
                });
                $scope.$currentTransition = null;
            }
        };
        $scope.$on('$destroy', function () {
            destroyed = true;
        });
        self.indexOfSlide = function(slide) {
            return slides.indexOf(slide);
        };

        $scope.next = function() {
            var newIndex = (currentIndex + 1) % slides.length;
            if (!$scope.$currentTransition) {
                return self.select(slides[newIndex], 'next');
            }
        };

        $scope.prev = function() {
            var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
            if (!$scope.$currentTransition) {
                return self.select(slides[newIndex], 'prev');
            }
        };

        $scope.isActive = function(slide) {
            return self.currentSlide === slide;
        };

        $scope.$watch('interval', restartTimer);
        $scope.$on('$destroy', resetTimer);

        function restartTimer() {
            resetTimer();
            var interval = +$scope.interval;
            if (!isNaN(interval) && interval > 0) {
                currentInterval = $interval(timerFn, interval);
            }
        }

        function resetTimer() {
            if (currentInterval) {
                $interval.cancel(currentInterval);
                currentInterval = null;
            }
        }

        function timerFn() {
            var interval = +$scope.interval;
            if (isPlaying && !isNaN(interval) && interval > 0) {
                $scope.next();
            } else {
                $scope.pause();
            }
        }

        $scope.play = function() {
            if (!isPlaying) {
                isPlaying = true;
                restartTimer();
            }
        };
        $scope.pause = function() {
            if (!$scope.noPause) {
                isPlaying = false;
                resetTimer();
            }
        };

        self.addSlide = function(slide, element) {
            slide.$element = element;
            slides.push(slide);
            if(slides.length === 1 || slide.active) {
                self.select(slides[slides.length-1]);
                if (slides.length == 1) {
                    $scope.play();
                }
            } else {
                slide.active = false;
            }
        };

        self.removeSlide = function(slide) {
            var index = slides.indexOf(slide);
            slides.splice(index, 1);
            if (slides.length > 0 && slide.active) {
                if (index >= slides.length) {
                    self.select(slides[index-1]);
                } else {
                    self.select(slides[index]);
                }
            } else if (currentIndex > index) {
                currentIndex--;
            }
        };

    }])
    .directive('dtoggle', function(){ // 帮助中心-问题分类
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var parentElement = angular.element(element);
                var brotherElement = angular.element(parentElement.parent().siblings()[0]);
                parentElement.bind('click', toggle);
                function toggle() {
                    parentElement.toggleClass('cur');
                    brotherElement.animate({
                        height:'toggle', 
                        opacity:'toggle'
                    }, "slow");
                };
            }
        };
    })
    .directive('currentyear', function(dateFilter){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.format = "yyyy";
                var currentElement = angular.element(element);
                currentElement.text(dateFilter(new Date(), scope.format));
            }
        };
    })
    .directive('msgtoggle', function(){ 
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var parentElement = angular.element(element);
                var brotherElement = angular.element(parentElement.parent().siblings()[0]);
                parentElement.bind('click', toggle);
                function toggle() {
                    var h = parentElement.html();
                    if(h == '展开 ∨'){
                        parentElement.html('收起 ∧');
                    }else{
                        parentElement.html('展开 ∨');
                    }
                    brotherElement.animate({
                        height:'toggle', 
                        opacity:'toggle'
                    }, "slow");
                };
            }
        };
    })








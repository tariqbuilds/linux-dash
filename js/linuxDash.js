var linuxDash = angular.module('linuxDash', ['ngRoute']);

////////////////// Routing /////////////////////////////
linuxDash.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
          when('/basic-info', {
            templateUrl: 'templates/sections/basic-info.html',
          }).
          when('/network', {
            templateUrl: 'templates/sections/network.html',
          }).
          when('/system-stats', {
            templateUrl: 'templates/sections/system-stats.html',
          }).
          when('/accounts', {
            templateUrl: 'templates/sections/accounts.html',
          }).
          when('/apps', {
            templateUrl: 'templates/sections/applications.html',
          }).
          otherwise({
            redirectTo: '/basic-info'
          });
    }]);

////////////////// Global Application //////////////////
linuxDash.controller('body', function ($scope, server, $route, $location) {
    $scope.backgroundColors = [
        'rgba(244,226,201,0.5)',
        'rgba(79,142,247,0.2)',
        'rgb(236,236,236)',
        'white'
    ];

    $scope.setBackground = function (color) {
        document.body.style.backgroundColor  = color;
    };
});

/**
 * Gets data from server and runs callbacks on response.data.data 
 */
linuxDash.service('server',[ '$http', function ($http) {
  
  this.get = function (moduleName, callback) {
        return $http.get('module.php?module=' + moduleName).then(function (response) {
            return callback(response.data.data);
        });
  };

}]);

/**
 * Sidebar for SPA
 */
linuxDash.directive('navBar',function ($location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/app/navbar.html',
    link: function (scope) {
        scope.items = [
            'basic-info',
            'network',
            'system-stats',
            'accounts',
            'apps'
        ];

        scope.getNavItemName = function (url) {
            return url.replace('-', ' ');
        };

        scope.isActive = function(route) {
            return '/' + route === $location.path();
        };
    }
  };

});


////////////////// UI Element Directives //////////////////

/**
 * Shows loader 
 */
linuxDash.directive('loader', function() {
  return {
    restrict: 'E',
    scope: {
        width: '@'
    },
    template: '<div class="loader"></div>'
  }; 
});

/**
 * Top Bar for widget 
 */
linuxDash.directive('topBar', function() {
  return {
    restrict: 'E',
    scope: {
        heading: '=',
        refresh: '&',
        lastUpdated: '='
    },
    templateUrl: 'templates/app/ui-elements/top-bar.html',
    link: function(scope, element, attrs){
        var $refreshBtn = element.find('refresh-btn').eq(0);

        if (typeof attrs.noRefreshBtn !== 'undefined') {
            $refreshBtn.remove();
        } 
    }
  };
});

/**
 * Shows refresh button and calls 
 * provided expression on-click
 */
linuxDash.directive('refreshBtn', function() {
  return {
    restrict: 'E',
    scope: {
        refresh: '&'
    },
    template: '<button ng-click="refresh()">&olarr;</button>'
  };
});

/**
 * Message shown when no data is found from server 
 */
linuxDash.directive('noData', function() {
  return {
    restrict: 'E',
    template: 'No Data'
  };
});

/**
 * Displays last updated timestamp for widget
 */
linuxDash.directive('lastUpdate', function() {
  return {
    restrict: 'E',
    scope: {
        timestamp: '='
    },
    templateUrl: 'templates/app/ui-elements/last-update.html'
  };
});

////////////////// Plugin Directives //////////////////
///
/**
 * Fetches and displays static data
 */
linuxDash.directive('staticDataPlugin', ['$timeout', 'server', function($timeout, server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        staticData: '='
    },
    templateUrl: 'templates/app/static-data-plugin.html',
    link: function (scope, element) {

        scope.getData = function () {

            // for each peice of static data to be shown
            scope.staticData.forEach(function (staticObj) {

                // get the resp from the server and assign it to obj.data 
                server.get(staticObj.module, function (serverResponseData) {
                    staticObj.data = serverResponseData;
                });

            });

            scope.lastGet = new Date().getTime();
        };

        scope.getData();
    }
  };
}]);

/**
 * ng-repeat filter which slices 
 * array to start from specified index
 * http://jsfiddle.net/2ZzZB/56/
 */
linuxDash.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input)
            return input.slice(start);
    }
});

/**
 * Fetches and displays table data
 */
linuxDash.directive('tableDataPlugin', [ 'server', function(server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        moduleName: '@',
        tableHeaders: '=',
        objectTable: '='
    },
    templateUrl: 'templates/app/table-data-plugin.html',
    link: function (scope, element) {
        scope.currentPage = 0;
        scope.pageSize = 5;
        scope.numberOfPages = function () {
            if (scope.tableRows)
                return Math.ceil(scope.tableRows.length / scope.pageSize);                
        };

        scope.getData = function () {
            delete scope.tableRows;

            server.get(scope.moduleName, function (serverResponseData) {
                scope.tableRows = serverResponseData;
                scope.lastGet = new Date().getTime();

                if(serverResponseData.length < 1) {
                    scope.emptyResult = true;
                }
            });
        };

        scope.getData();
    }
  };
}]);

/**
 * Fetches and displays data as line chart at a certain refresh rate
 */
linuxDash.directive('lineChartPlugin', ['$interval', '$compile', 'server', function($interval, $compile, server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        moduleName: '@',
        refreshRate: '=',
        maxValue: '=',
        minValue: '=',
        getDisplayValue: '=',
        metrics: '='
    },
    templateUrl: 'templates/app/line-chart-plugin.html',
    link: function (scope, element) {
        
        // smoothieJS - Create new chart
        var chart = new SmoothieChart({
            borderVisible:false,
            sharpLines:true,
            grid: {
                fillStyle:'#ffffff',
                strokeStyle:'rgba(232,230,230,0.93)',
                sharpLines:true,
                millisPerLine:3000,
                borderVisible:false
            },
            labels:{
                fontSize:11,
                precision:0,
                fillStyle:'#0f0e0e'
            },
            maxValue: parseInt(scope.maxValue),
            minValue: parseInt(scope.minValue),
            horizontalLines: [{ value: 5, color: '#eff', lineWidth: 1 }]
        });

        // smoothieJS - set up canvas element for chart
        canvas = element.find('canvas')[0],
        series = new TimeSeries();
        chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 2 });
        chart.streamTo(canvas, 1000);
        
        // update data on chart
        scope.getData = function () {
            server.get(scope.moduleName, function (serverResponseData) {
                scope.lastGet = new Date().getTime();
                
                // update chart with this response
                series.append(scope.lastGet, scope.getDisplayValue(serverResponseData));

                // update the metrics for this chart
                scope.metrics.forEach(function (metricObj) {
                    metricObj.data = metricObj.generate(serverResponseData) ;
                });

            });
        };

        // set the directive-provided interval 
        // at which to run the chart update
        $interval(scope.getData, scope.refreshRate);
    }
  };
}]);

/**
 * Fetches and displays data as line chart at a certain refresh rate
 * 
 */
linuxDash.directive('multiLineChartPlugin', ['$interval', '$compile', 'server', function($interval, $compile, server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        moduleName: '@',
        refreshRate: '=',
        maxValue: '=',
        minValue: '=',
        getDisplayValue: '=',
        metrics: '='
    },
    templateUrl: 'templates/app/multi-line-chart-plugin.html',
    link: function (scope, element) {
        
        // smoothieJS - Create new chart
        var chart = new SmoothieChart({
            borderVisible:false,
            sharpLines:true,
            grid: {
                fillStyle:'#ffffff',
                strokeStyle:'rgba(232,230,230,0.93)',
                sharpLines:true,
                borderVisible:false
            },
            labels:{
                fontSize:12,
                precision:0, 
                fillStyle:'#0f0e0e'
            },
            maxValue: parseInt(scope.maxValue),
            minValue: parseInt(scope.minValue),
            horizontalLines: [{ value: 1, color: '#ecc', lineWidth: 1 }]
        });

        var seriesOptions = [
          { strokeStyle: 'rgba(255, 0, 0, 1)', lineWidth: 2 },
          { strokeStyle: 'rgba(0, 255, 0, 1)', lineWidth: 2 },
          { strokeStyle: 'rgba(0, 0, 255, 1)', lineWidth: 2 },
          { strokeStyle: 'rgba(255, 255, 0, 1)', lineWidth: 1 }
        ];

        // smoothieJS - set up canvas element for chart
        var canvas = element.find('canvas')[0];
        var seriesArray = [];

        // get the data once to set up # of lines on chart
        server.get(scope.moduleName, function (serverResponseData) {

            serverResponseData.forEach(function (obj, key) {
                
                seriesArray[key] = new TimeSeries();
                chart.addTimeSeries(seriesArray[key], seriesOptions[key]);
                scope.metrics[key].color = seriesOptions[key].strokeStyle;
            });

        });

        chart.streamTo(canvas, 1000);
        
        // update data on chart
        scope.getData = function () {
            server.get(scope.moduleName, function (serverResponseData) {
                scope.lastGet = new Date().getTime();
                
                // update chart with current response
                serverResponseData.forEach(function (item, key) {
                    seriesArray[key].append(scope.lastGet, scope.getDisplayValue(serverResponseData[key]));
                });

                // update the metrics for this chart
                scope.metrics.forEach(function (metricObj) {

                    metricObj.data = metricObj.generate(serverResponseData) ;
                });

            });
        };

        $interval(scope.getData, scope.refreshRate);
    }
  };
}]);

/**
 * Base plugin structure 
 */
linuxDash.directive('plugin', function() {
    return {
        restrict: 'E',
        transclude: true,
        // scope: {
        //     heading: '@',
        //     lastUpdated: '=',
        //     onRefresh: '&',
        // },
        templateUrl: 'templates/app/base-plugin.html'
    }
});

/**
 * Progress bar element 
 */
linuxDash.directive('progressBarPlugin',function() {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        width: '@',
        moduleName: '@',
        name: '@',
        value: '@',
        max: '@'
    },
    templateUrl: 'templates/app/progress-bar-plugin.html'
  };
});
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
 * 
 * @param int width
 * @return {[type]} [description]
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
 * 
 * @param int width
 * @return {[type]} [description]
 */
linuxDash.directive('navBar',function ($location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/navbar.html',
    link: function (scope) {
        scope.items = [
            'basic-info',
            'network',
            'system-stats',
            'accounts'
        ];

        scope.getSidebarItemName = function (url) {
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
 * 
 * @param int width
 * @return {[type]} [description]
 */
linuxDash.directive('loader', function() {
  return {
    restrict: 'E',
    scope: {
        width: '@'
    },
    templateUrl: 'templates/plugins/ui-elements/loader.html'
  }; 
});

/**
 * Top Bar for widget 
 * 
 * @param int width
 * @return {[type]} [description]
 */
linuxDash.directive('topBar', function() {
  return {
    restrict: 'E',
    scope: {
        heading: '=',
        refresh: '&',
        lastUpdated: '='
    },
    templateUrl: 'templates/plugins/ui-elements/top-bar.html',
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
 * 
 * @param expression refresh
 */
linuxDash.directive('refreshBtn', function() {
  return {
    restrict: 'E',
    scope: {
        refresh: '&'
    },
    templateUrl: 'templates/plugins/ui-elements/refresh-button.html'
  };
});

/**
 * Displays last updated timestamp for widget
 * 
 * @param expression refresh
 */
linuxDash.directive('lastUpdate', function() {
  return {
    restrict: 'E',
    scope: {
        timestamp: '='
    },
    templateUrl: 'templates/plugins/ui-elements/last-update.html'
  };
});

////////////////// Plugin Directives //////////////////
///
/**
 * Fetches and displays static data
 * 
 * @param  string heading
 * @param  collection staticData
 */
linuxDash.directive('staticDataPlugin', ['$timeout', 'server', function($timeout, server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        staticData: '='
    },
    templateUrl: 'templates/plugins/static-data-plugin.html',
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
 * Fetches and displays table data
 * 
 * @param  string heading
 * @param  collection tableData
 */
linuxDash.directive('tableDataPlugin', [ 'server', function(server) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        moduleName: '@',
        tableHeaders: '=',
    },
    templateUrl: 'templates/plugins/table-data-plugin.html',
    link: function (scope, element) {
        scope.rowLimit = 10;

        scope.getData = function () {
            server.get(scope.moduleName, function (serverResponseData) {
                scope.tableRows = serverResponseData;
                scope.lastGet = new Date().getTime();
            });
        };

        scope.getData();
    }
  };
}]);

/**
 * Fetches and displays data as line chart at a certain refresh rate
 * 
 * @param  string heading
 * @param  collection tableData
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
    templateUrl: 'templates/plugins/line-chart-plugin.html',
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
 * @param  string heading
 * @param  collection tableData
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
    templateUrl: 'templates/plugins/multi-line-chart-plugin.html',
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
 * 
 * 
 * @param  string heading
 * @param  collection tableData
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
        templateUrl: 'templates/plugins/base-plugin.html'
    }
});

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
    templateUrl: 'templates/plugins/progress-bar-plugin.html'
  };
});
 var linuxDash = angular.module('linuxDash', ['ngRoute']);

////////////////// Routing /////////////////////////////
linuxDash.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
          when('/system-status', {
            templateUrl: 'templates/sections/system-status.html',
          }).
          when('/basic-info', {
            templateUrl: 'templates/sections/basic-info.html',
          }).
          when('/network', {
            templateUrl: 'templates/sections/network.html',
          }).
          when('/accounts', {
            templateUrl: 'templates/sections/accounts.html',
          }).
          when('/apps', {
            templateUrl: 'templates/sections/applications.html',
          }).
          otherwise({
            redirectTo: '/system-status'
          });
          
    }]);

////////////////// Global Application //////////////////
linuxDash.controller('body', function ($scope, serverAddress) {
    $scope.serverSet = false;

    serverAddress.configure().then(function (res) {
        $scope.serverSet = true;
    });

});

/**
 * Figures out which server-side file works and sets it to localStorage
 */
linuxDash.service('serverAddress', ['$q', function ($q) {

    this.configure = function () {
        return  $q.when(localStorage.setItem('serverFile','server/'));
    }

}]);

/**
 * Gets data from server and runs callbacks on response.data.data 
 */
linuxDash.service('server', ['$http', function ($http) {

    this.get = function (moduleName, callback) {
        var serverAddress = localStorage.getItem('serverFile');
        var moduleAddress = serverAddress + '?module=' + moduleName;

        return $http.get(moduleAddress).then(function (response) {
            return callback(response.data);
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
            'system-status',
            'basic-info',
            'network',
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

/**
 * Fetches and displays table data
 */
linuxDash.directive('tableData', [ 'server', function(server) {
  return {
    restrict: 'E',
    scope: {
        heading: '@',
        moduleName: '@'
    },
    templateUrl: 'templates/app/table-data-plugin.html',
    link: function (scope, element) {

        scope.sortByColumn = null;

        // set the column to sort by
        scope.setSortColumn = function (column) {

            // if the column is already being sorted
            // reverse the order
            if (column === scope.sortByColumn) {
                scope.sortByColumn = '-' + column;
            }
            else {
                scope.sortByColumn = column;
            }
        };

        scope.getData = function () {
            delete scope.tableRows;

            server.get(scope.moduleName, function (serverResponseData) {
                
                if (serverResponseData.length > 0) {
                    scope.tableHeaders = Object.keys(serverResponseData[0]);
                }

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
 * Fetches and displays table data
 */
linuxDash.directive('keyValueList', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {
        heading: '@',
        moduleName: '@',
    },
    templateUrl: 'templates/app/key-value-list-plugin.html',
    link: function (scope, element) {

        scope.getData = function () {
            delete scope.tableRows;

            server.get(scope.moduleName, function (serverResponseData) {
                scope.tableRows = serverResponseData;
                scope.lastGet = new Date().getTime();

                if(Object.keys(serverResponseData).length === 0) {
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
                fillStyle: '#ffffff',
                strokeStyle: 'rgba(232,230,230,0.93)',
                sharpLines: true,
                millisPerLine: 3000,
                borderVisible: false
            },
            labels:{
                fontSize: 11,
                precision: 0,
                fillStyle: '#0f0e0e'
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

                // change graph colour depending on usage
                if (scope.maxValue / 4 * 3 < scope.getDisplayValue(serverResponseData)) {
                    chart.seriesSet[0].options.strokeStyle = 'rgba(255, 89, 0, 1)';
        		    chart.seriesSet[0].options.fillStyle = 'rgba(255, 89, 0, 0.2)';
        		}
        		else if (scope.maxValue / 3 < scope.getDisplayValue(serverResponseData)) {
        		    chart.seriesSet[0].options.strokeStyle = 'rgba(255, 238, 0, 1)';
        		    chart.seriesSet[0].options.fillStyle = 'rgba(255, 238, 0, 0.2)';
        		}
        		else {
        		    chart.seriesSet[0].options.strokeStyle = 'rgba(0, 255, 0, 1)';
        		    chart.seriesSet[0].options.fillStyle = 'rgba(0, 255, 0, 0.2)';
        		}

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

            var numberOfLines = Object.keys(serverResponseData[0]).length;

            for (var x=0; x < numberOfLines; x++) {
                seriesArray[x] = new TimeSeries();
                chart.addTimeSeries(seriesArray[x], seriesOptions[x]);
                scope.metrics[x].color = seriesOptions[x].strokeStyle;
            }

        });

        chart.streamTo(canvas, 1000);
        
        // update data on chart
        scope.getData = function () {
            server.get(scope.moduleName, function (serverResponseData) {
                scope.lastGet = new Date().getTime();
                
                var keyCount = 0;
                var maxAvg = 0;

                // update chart with current response
                for(var key in serverResponseData[0]) {
                    seriesArray[keyCount].append(scope.lastGet, scope.getDisplayValue(serverResponseData[0][key]));
                    keyCount++;
                    maxAvg = Math.max(maxAvg, serverResponseData[0][key]);
                }


                // update the metrics for this chart
                scope.metrics.forEach(function (metricObj) {
                    metricObj.data = metricObj.generate(serverResponseData) ;
                });

                // define a minimum average of one
                maxAvg = Math.max(maxAvg, 1);
                // round up the average and set the maximum scale
                var len = parseInt(Math.log10(maxAvg));
                var div = Math.pow(10, len);
                chart.options.maxValue = Math.ceil(maxAvg / div) * div;
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


/**
 * Theme switcher 
 */
linuxDash.directive('themeSwitcher',['$location', function($location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/app/theme-switcher.html',
    link: function (scope) {

        // alternate themes available
        scope.themes = [
            {
                name: 'winter',
            },
            {
                name: 'summer',
            },
            {
                name: 'spring',
            },
            {
                name: 'fall',
            },
        ];

        scope.themeSwitcherOpen = false;

        scope.switchTheme = function (theme) {

            if(theme.selected) {
                scope.setDefaultTheme();
                return;
            }

            scope.removeExistingThemes();
            theme.selected = true;
            document.getElementsByTagName('html')[0].className = theme.name;
            localStorage.setItem('theme', theme.name);
        };

        scope.toggleThemeSwitcher = function () {
            scope.themeSwitcherOpen = !scope.themeSwitcherOpen;
        };

        scope.removeExistingThemes = function () {
            scope.themes.forEach(function (item) {
                item.selected = false;
            });
        };

        scope.setDefaultTheme = function () {
            scope.removeExistingThemes();
            document.getElementsByTagName('html')[0].className = '';
            localStorage.setItem('theme', null);
        };

        // on load, check if theme was set in localStorage
        if(localStorage.getItem('theme')) {

            scope.themes.forEach(function (theme) {
                
                if(theme.name === localStorage.getItem('theme'))
                {
                    scope.switchTheme(theme);
                }

            });
        }
    }
  };
}]);

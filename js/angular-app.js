var linuxDash = angular.module('linuxDash', []);

////////////////// Global Application //////////////////
linuxDash.controller('body', function ($scope, server) {
    
    $scope.basicInfo = [
        {name: 'OS', module: 'issue' },
        {name: 'Hostname', module: 'hostname' },
        {name: 'Server Time', module: 'time' },
        {name: 'Server Uptime', module: 'uptime' },
    ];

    $scope.ipTableConfig = [
        'Name',
        'IP Address'
    ];

    $scope.psTableConfig = [
        'USER',
        'PID',
        '%CPU',
        '%MEM',
        'VSZ',
        'RSS',
        'TTY',
        'STAT',
        'START',
        'TIME',
        'COMMAND' 
    ];

    $scope.netstatTableConfig = [
        'Connections',
        'IP Address'
    ];

    $scope.usersTableConfig = [
        'Account Type',
        'User',
        'Home Directory'
    ];

    $scope.onlineTableConfig = [
        'Who',
        'From',
        'Last Login',
        'Idle'
    ];

    $scope.lastloginTableConfig = [
        'Who',
        'From',
        'Last Login',
    ];

    // get max ram available on machone
    server.get('mem', function (resp) {
        $scope.maxRam = resp[1];
        $scope.minRam = 0;
    });

    $scope.ramToDisplay = function (serverResponseData) {
        return serverResponseData[2];
    };

    $scope.ramMetrics = [
        {
            name: 'Used',
            generate: function (serverResponseData) {
                var ratio = serverResponseData[2] / serverResponseData[1];
                var percentage = parseInt(ratio * 100);

                return percentage.toString() + ' %';
            }
        },
        {
            name: 'Free',
            generate: function (serverResponseData) {
                return serverResponseData[3].toString() + ' MB';
            }
        } 
    ];
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
    templateUrl: '/templates/plugins/ui-elements/loader.html'
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
    templateUrl: '/templates/plugins/ui-elements/refresh-button.html'
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
    templateUrl: '/templates/plugins/ui-elements/last-update.html'
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
    templateUrl: '/templates/plugins/static-data-plugin.html',
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
    templateUrl: '/templates/plugins/table-data-plugin.html',
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
linuxDash.directive('lineChartPlugin', ['$interval', 'server', function($interval, server) {
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
    templateUrl: '/templates/plugins/line-chart-plugin.html',
    link: function (scope, element) {
        
        // smoothieJS - Create new chart
        var chart = new SmoothieChart({
            maxValue: parseInt(scope.maxValue),
            minValue: parseInt(scope.minValue),
            horizontalLines: [{ value: 0, color: '#ffffff', lineWidth: 1 }]
        });

        // smoothieJS - set up canvas element for chart
        canvas = element.find('canvas')[0],
        series = new TimeSeries();
        chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
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
    templateUrl: '/templates/plugins/progress-bar-plugin.html'
  };
});

////////////////// Widget Directives //////////////////
///
linuxDash.directive('diskSpace',[ 'server', '$interval', function(server, $interval) {
  return {
    restrict: 'E',
    isoloate: true,
    templateUrl: '/templates/disk-space.html',
    link: function (scope, element) {

        scope.heading = "Disk Partitions";

        var getData = function () {
            server.get('df', function (serverResponseData) {
                scope.diskSpaceData = serverResponseData;
            });  
        };

        getData();

        scope.getKB = function (stringSize) { 
            var lastChar = stringSize.slice(-1),
                size = parseInt(stringSize);

            switch (lastChar){
                case 'M': return size * 1024;
                case 'G': return size * 1048576;
                default: return size;
            }
        };
    }
  };
}]);

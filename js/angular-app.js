var linuxDash = angular.module('linuxDash', []);

linuxDash.constant('requestUrl', 'module.php?module=');

linuxDash.controller('body', function ($scope, $http, requestUrl) {
    
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
    $http.get(requestUrl + 'mem').then(function (resp) {
        $scope.maxRam = resp.data.data[1];
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
 * Loader directive
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
    templateUrl: '/templates/plugins/loader-plugin.html'
  };
});

/**
 * Fetches and displays static data
 * 
 * @param  string heading
 * @param  collection staticData
 */
linuxDash.directive('staticDataPlugin', [ '$http', '$timeout', 'requestUrl', function($http, $timeout, requestUrl) {
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
            scope.staticData.forEach(function (staticObj) {

                $http.get(requestUrl + staticObj.module)
                    .then(function (resp) {
                        staticObj.data = resp.data.data;
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
linuxDash.directive('tableDataPlugin', [ '$http', 'requestUrl', function($http, requestUrl) {
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
        
            $http.get(requestUrl + scope.moduleName).then(function (resp) {
                scope.tableRows = resp.data.data;
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
linuxDash.directive('lineChartPlugin', [ '$http', '$interval', 'requestUrl', function($http, $interval, requestUrl) {
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
        
            $http.get(requestUrl + scope.moduleName).then(function (serverResponse) {
                scope.currentData = serverResponse.data.data;
                scope.lastGet = new Date().getTime();
                
                // update chart with this response
                series.append(scope.lastGet, scope.getDisplayValue(scope.currentData));

                // update the metrics for this chart
                scope.metrics.forEach(function (metricObj) {
                    metricObj.data = metricObj.generate(scope.currentData) ;
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

linuxDash.directive('diskSpace',[ '$http', '$interval', 'requestUrl', function($http, $interval, requestUrl) {
  return {
    restrict: 'E',
    isoloate: true,
    templateUrl: '/templates/disk-space.html',
    link: function (scope, element) {

        scope.heading = "Disk Partitions";

        var getData = function () {
            $http.get(requestUrl + 'df').then(function (resp) {
                scope.diskSpaceData = resp.data.data;
            });  
        };

        getData();

        scope.getInt = function (stringToParse) { return parseInt(stringToParse); }
    }
  };
}]);

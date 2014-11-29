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
        minValue: '='
    },
    templateUrl: '/templates/plugins/line-chart-plugin.html',
    link: function (scope, element) {
        
        // smoothie
        var chart = new SmoothieChart({
                      grid: { strokeStyle:'#ccc', fillStyle:'#eee',
                              lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
                      labels: { fillStyle:'rgb(60, 0, 0)' },
                      maxValue: parseInt(scope.maxValue),
                      minValue: parseInt(scope.minValue),
                      horizontalLines: [{ value: 0, color: '#ffffff', lineWidth: 1 }]
                    });

        // canvas = document.getElementById('smoothie-chart'),
        canvas = element.find('canvas')[0],
        series = new TimeSeries();

        chart.addTimeSeries(series, { strokeStyle:'rgb(0, 105, 0)', fillStyle:'rgba(0, 0, 0, 0.2)', lineWidth:3 });
        chart.streamTo(canvas, 1093);

        /********************************/        
        scope.getData = function () {
        
            $http.get(requestUrl + scope.moduleName).then(function (resp) {
                scope.currentData = resp.data.data;
                series.append(new Date().getTime(), scope.currentData[2]);
                scope.lastGet = new Date().getTime();
            });

        };

        scope.getData();

        $interval(scope.getData, scope.refreshRate);
    }
  };
}]);

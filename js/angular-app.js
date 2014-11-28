var linuxDash = angular.module('linuxDash', []);

linuxDash.controller('body', function ($scope) {
    
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
linuxDash.directive('staticDataPlugin', [ '$http', function($http) {
  return {
    restrict: 'E',
    isoloate: true,
    scope: {
        heading: '@',
        staticData: '='
    },
    templateUrl: '/templates/plugins/static-data-plugin.html',
    link: function (scope, element) {

        scope.staticData.forEach(function (staticObj) {
            
            $http.get('module.php?module=' + staticObj.module)
                .then(function (resp) {
                    staticObj.data = resp.data.data;
                });

        });
    }
  };
}]);

/**
 * Fetches and displays table data
 * 
 * @param  string heading
 * @param  collection tableData
 */
linuxDash.directive('tableDataPlugin', [ '$http', function($http) {
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

        $http.get('module.php?module=' + scope.moduleName).then(function (resp) {
            scope.tableRows = resp.data.data;
        });
    }
  };
}]);

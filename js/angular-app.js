var linuxDash = angular.module('linuxDash', []);

linuxDash.controller('body', function ($scope) {
    
    $scope.basicInfo = [
        {name: 'OS', module: 'issue' },
        {name: 'Hostname', module: 'hostname' },
        {name: 'Server Time', module: 'time' },
        {name: 'Server Uptime', module: 'uptime' },
    ];

    $scope.ip = {
        tableConfig: [
            'Name',
            'IP Address'
        ],

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
 * @param  collection staticData
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

        $http.get('module.php?module=' + scope.moduleName).then(function (resp) {
            scope.tableRows = resp.data.data;
        });
    }
  };
}]);

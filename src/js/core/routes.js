angular.module('linuxDash').config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/loading', {
    templateUrl: 'src/js/templates/pages/loading.html',
      controller: [
        '$scope', '$location', '$rootScope',
        function appLoadController($scope, $location, $rootScope) {

          var loadUrl = localStorage.getItem('currentTab') || 'system-status'
          var loadLinuxDash = function () {
            $location.path(loadUrl)
          }

          $rootScope.$on('start-linux-dash', loadLinuxDash)
        }],
    }).
    when('/system-status', {
      templateUrl: 'src/js/templates/pages/system-status.html',
    }).
    when('/basic-info', {
      templateUrl: 'src/js/templates/pages/basic-info.html',
    }).
    when('/network', {
      templateUrl: 'src/js/templates/pages/network.html',
    }).
    when('/accounts', {
      templateUrl: 'src/js/templates/pages/accounts.html',
    }).
    when('/apps', {
      templateUrl: 'src/js/templates/pages/apps.html',
    }).
    otherwise({
      redirectTo: '/loading'
    })
}])

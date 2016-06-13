function appLoadController($scope, $location, $rootScope) {
  var loadUrl = localStorage.getItem('currentTab') || 'system-status'
  var loadLinuxDash = function () {
    $location.path(loadUrl)
  }

  $rootScope.$on('start-linux-dash', loadLinuxDash)
}

function routesFn($routeProvider) {

  $routeProvider

    .when('/loading', {
      template: [
        '<div class="lead" style="text-align: center;">',
          '<loader></loader>',
          'Loading...',
        '</div>',
      ].join(''),
      controller: ['$scope', '$location', '$rootScope', appLoadController],
    })

    .when('/system-status', {
      template: [
        '<ram-chart></ram-chart> ',
        '<cpu-avg-load-chart></cpu-avg-load-chart> ',
        '<cpu-utilization-chart></cpu-utilization-chart> ',
        '<cpu-temp></cpu-temp> ',
        '<ram-intensive-processes></ram-intensive-processes> ',
        '<cpu-intensive-processes></cpu-intensive-processes> ',
        '<disk-space></disk-space> ',
        '<swap-usage></swap-usage> ',
        '<docker-processes></docker-processes> ',
        '<make-plugins-draggable></make-plugins-draggable>',
      ].join(''),
    })

    .when('/basic-info', {
      template: [
        '<machine-info></machine-info>',
        '<memory-info></memory-info>',
        '<cpu-info></cpu-info>',
        '<scheduled-crons></scheduled-crons>',
        '<cron-history></cron-history>',
        '<io-stats></io-stats>',
        '<make-plugins-draggable></make-plugins-draggable>',
      ].join(''),
    })

    .when('/network', {
    template: [
        '<upload-transfer-rate-chart></upload-transfer-rate-chart> ',
        '<download-transfer-rate-chart></download-transfer-rate-chart> ',
        '<ip-addresses></ip-addresses> ',
        '<network-connections></network-connections> ',
        '<arp-cache-table></arp-cache-table> ',
        '<ping-speeds></ping-speeds> ',
        '<bandwidth></bandwidth> ',
        '<make-plugins-draggable></make-plugins-draggable>',
      ].join(''),
    })

    .when('/accounts', {
      template: [
        '<server-accounts></server-accounts> ',
        '<logged-in-accounts></logged-in-accounts> ',
        '<recent-logins></recent-logins> ',
        '<make-plugins-draggable></make-plugins-draggable>',
      ].join(''),
    })

    .when('/apps', {
      template: [
        '<common-applications></common-applications>',
        '<memcached></memcached>',
        '<redis></redis>',
        '<pm2></pm2>',
        '<make-plugins-draggable></make-plugins-draggable>',
      ].join(''),
    })
    .otherwise({
      redirectTo: '/loading'
    })
}

angular.module('linuxDash').config(['$routeProvider', routesFn])

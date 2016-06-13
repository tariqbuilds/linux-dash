angular.module('linuxDash').directive('refreshBtn', function () {
  return {
    scope: {
      refresh: '&'
    },
    template: '<button class="ld-refresh-btn" ng-click="refresh()">↺</button>'
  }
})

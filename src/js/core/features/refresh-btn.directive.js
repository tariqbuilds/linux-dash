angular.module('linuxDash').directive('refreshBtn', function () {
  return {
    scope: {
      refresh: '&'
    },
    template: '<button ng-click="refresh()">↺</button>'
  }
})

angular.module('linuxDash').directive('lastUpdate', function () {
 return {
    scope: {
      timestamp: '='
    },
    template: '\
      <span ng-hide="timestamp">Loading...</span>\
      <small alt="Last Update Timestamp">\
        <span ng-show="timestamp">{{ timestamp | date:"hh:mm:ss a" }}</span>\
      </small>\
    '
  }
})

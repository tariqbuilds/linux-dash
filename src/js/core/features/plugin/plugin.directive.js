angular.module('linuxDash').directive('plugin', function() {
  return {
    transclude: true,
    templateUrl: 'src/js/core/features/plugin/plugin.html',
  }
})

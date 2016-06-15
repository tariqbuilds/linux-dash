angular.module('linuxDash').directive('plugin', ['$rootScope', function($rootScope) {
  return {
    transclude: true,
    templateUrl: 'src/js/core/features/plugin/plugin.html',
    link: function (s) {

      if ($rootScope.hiddenPlugins.indexOf(s.moduleName) > -1)
        s.isHidden = true

      s.toggleVisibility = function () {
        s.isHidden = !s.isHidden

        if (s.isHidden)
          $rootScope.$emit('hide-plugin', s.moduleName)
        else
          $rootScope.$emit('show-plugin', s.moduleName)
      }

    }
  }
}])

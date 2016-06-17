angular.module('linuxDash').directive('plugin', ['$rootScope', function($rootScope) {
  return {
    transclude: true,
    templateUrl: 'src/js/core/features/plugin/plugin.html',
    link: function (s, el, attr) {

      if (attr.hasOwnProperty('chartPlugin'))
        s.isChartPlugin = true

      if ($rootScope.hiddenPlugins.indexOf(s.moduleName) > -1)
        s.isHidden = true

      s.toggleWidth = function () {
        el.find('div')[0].removeAttribute('style')
        s.enlarged = !s.enlarged
      }

      s.toggleVisibility = function () {
        s.isHidden = !s.isHidden

        if (s.isHidden) {
          $rootScope.$emit('hide-plugin', s.moduleName)
        } else {
          $rootScope.$emit('show-plugin', s.moduleName)
          if (s.isChartPlugin) s.reInitializeChart()
        }
      }

    }
  }
}])

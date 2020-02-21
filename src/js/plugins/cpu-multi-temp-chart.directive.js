angular.module('linuxDash').directive('cpuMultiTempChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: '\
      <multi-line-chart-plugin \
          heading="CPU Multi Temp" \
          module-name="cpu_multi_temp" \
          units="units"> \
      </multi-line-chart-plugin> \
    ',
    link: function(scope) {
      scope.units = 'ºC'
    }
  }
}])

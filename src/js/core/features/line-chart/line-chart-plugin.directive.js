angular.module('linuxDash').directive('lineChartPlugin', [
  '$interval', '$compile', 'server', '$window',
  function ($interval, $compile, server, $window) {
    return {
      scope: {
        heading: '@',
        moduleName: '@',
        refreshRate: '=',
        maxValue: '=',
        minValue: '=',
        getDisplayValue: '=',
        metrics: '=',
        color: '@'
      },
      templateUrl: 'src/js/core/features/line-chart/line-chart-plugin.html',
      link: function(scope, element) {

        scope.initializing = true

        // wrap the entire plugin into an initializing function
        var start_rendering_line_chart = function () {

          if (!scope.color)
            scope.color = '0, 255, 0'

          var series, w, h, canvas

          angular.element($window).bind('resize', function() {
            canvas.width = w
            canvas.height = h
          })

          // smoothieJS - Create new chart
          var chart = new SmoothieChart({
            borderVisible: false,
            sharpLines: true,
            grid: {
              fillStyle: '#ffffff',
              strokeStyle: 'rgba(232,230,230,0.93)',
              sharpLines: true,
              millisPerLine: 3000,
              borderVisible: false
            },
            labels: {
              fontSize: 11,
              precision: 0,
              fillStyle: '#0f0e0e'
            },
            maxValue: parseInt(scope.maxValue),
            minValue: parseInt(scope.minValue),
            horizontalLines: [{
              value: 5,
              color: '#eff',
              lineWidth: 1
            }]
          })

          // smoothieJS - set up canvas element for chart
          canvas  = element.find('canvas')[0]
          series  = new TimeSeries()
          w       = canvas.width
          h       = canvas.height

          chart.addTimeSeries(series, {
            strokeStyle: 'rgba(' + scope.color + ', 1)',
            fillStyle: 'rgba(' + scope.color + ', 0.2)',
            lineWidth: 2
          })

          chart.streamTo(canvas, 1000)

          var dataCallInProgress = false

          // update data on chart
          scope.getData = function() {

            if(scope.initializing)
              scope.initializing = false

            if (dataCallInProgress) return

            dataCallInProgress = true

            server.get(scope.moduleName, function(serverResponseData) {

              if (serverResponseData.length < 1) {
                scope.emptyResult = true
                return
              }

              dataCallInProgress = false
              scope.lastGet      = new Date().getTime()

              // change graph colour depending on usage
              if (scope.maxValue / 4 * 3 < scope.getDisplayValue(serverResponseData)) {
                chart.seriesSet[0].options.strokeStyle = 'rgba(255, 89, 0, 1)'
                chart.seriesSet[0].options.fillStyle = 'rgba(255, 89, 0, 0.2)'
              } else if (scope.maxValue / 3 < scope.getDisplayValue(serverResponseData)) {
                chart.seriesSet[0].options.strokeStyle = 'rgba(255, 238, 0, 1)'
                chart.seriesSet[0].options.fillStyle = 'rgba(255, 238, 0, 0.2)'
              } else {
                chart.seriesSet[0].options.strokeStyle = 'rgba(' + scope.color + ', 1)'
                chart.seriesSet[0].options.fillStyle = 'rgba(' + scope.color + ', 0.2)'
              }

              // update chart with this response
              series.append(scope.lastGet, scope.getDisplayValue(serverResponseData))

              // update the metrics for this chart
              scope.metrics.forEach(function(metricObj) {
                metricObj.data = metricObj.generate(serverResponseData)
              })

            })
          }

          // set the directive-provided interval
          // at which to run the chart update
          var intervalRef = $interval(scope.getData, scope.refreshRate)
          var removeInterval = function() {
            $interval.cancel(intervalRef)
          }

          element.on("$destroy", removeInterval)
        }

        // only start rendering plugin when we know the scale of max/min for the canvas chart (smoothie)
        var stopWatching = scope.$watch('maxValue', function (n, o) {
          if (n) {
            start_rendering_line_chart()
            stopWatching()
          }
        })


      }
    }
  }
])

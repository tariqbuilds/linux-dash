'use strict'

require('angular')

angular.module('linuxDash', ['ngRoute'])

const ngRoute   = require('angular-route')
const smoothie  = require('smoothie')
const linuxDash = angular.module('linuxDash')
const directive = angular.module('linuxDash').directive

linuxDash.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/loading', {
    template: `
      <div class="lead" style="text-align: center;">
        <loader></loader>
        Loading...
      </div>
    `,
      controller: [
        '$scope', '$location', '$rootScope',
        function appLoadController($scope, $location, $rootScope) {

          let loadUrl = localStorage.getItem('currentTab') || 'system-status'
          let loadLinuxDash = () =>$location.path(loadUrl)
          $rootScope.$on('start-linux-dash', loadLinuxDash)

        }],
    }).
    when('/system-status', {
      template: `
        <ram-chart></ram-chart>
        <cpu-avg-load-chart></cpu-avg-load-chart>
        <cpu-utilization-chart></cpu-utilization-chart>
        <cpu-temp></cpu-temp>
        <ram-intensive-processes></ram-intensive-processes>
        <cpu-intensive-processes></cpu-intensive-processes>
        <disk-space></disk-space>
        <swap-usage></swap-usage>
        <docker-processes></docker-processes>
      `,
    }).
    when('/basic-info', {
      template: `
        <machine-info></machine-info>
        <memory-info></memory-info>
        <cpu-info></cpu-info>
        <scheduled-crons></scheduled-crons>
        <cron-history></cron-history>
        <io-stats></io-stats>
      `,
    }).
    when('/network', {
      template: `
        <upload-transfer-rate-chart></upload-transfer-rate-chart>
        <download-transfer-rate-chart></download-transfer-rate-chart>
        <ip-addresses></ip-addresses>
        <network-connections></network-connections>
        <arp-cache-table></arp-cache-table>
        <ping-speeds></ping-speeds>
        <bandwidth></bandwidth>
      `,
    }).
    when('/accounts', {
      template: `
        <server-accounts></server-accounts>
        <logged-in-accounts></logged-in-accounts>
        <recent-logins></recent-logins>
      `,
    }).
    when('/apps', {
      template: `
        <common-applications></common-applications>
        <memcached></memcached>
        <redis></redis>
        <pm2></pm2>
      `,
    }).
    otherwise({
      redirectTo: '/loading'
    })
}])

/**
 * Service which gets data from server
 * via HTTP or Websocket (if supported)
 */
linuxDash.service('server', [
  '$http', '$rootScope', '$location',
  class serverService {

    constructor($http, $rootScope, $location) {
      this.websocket = {
        connection: null,
        onMessageEventHandlers: {}
      }

      this.$http      = $http
      this.$rootScope = $rootScope
      this.$location  = $location
    }

    establishWebsocketConnection() {

      let server = this
      let protocol = (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
      let websocketUrl = protocol + window.location.hostname + ':' + window.location.port

      if (server.websocket.connection === null) {

        server.websocket.connection = new WebSocket(websocketUrl)

        server.websocket.connection.onopen = function() {
          server.$rootScope.$broadcast("start-linux-dash", {})
          server.$rootScope.$apply()
          console.info('Websocket connection is open')
        }

        server.websocket.connection.onmessage = function(event) {

          let response = JSON.parse(event.data)
          let moduleName = response.moduleName
          let moduleData = JSON.parse(response.output)

          if (!!server.websocket.onMessageEventHandlers[moduleName]) {
            server.websocket.onMessageEventHandlers[moduleName](moduleData)
          } else {
            console.info("Websocket could not find module", moduleName, "in:", server.websocket.onMessageEventHandlers)
          }

        }

        server.websocket.connection.onclose = function() {
          server.websocket.connection = null
        }
      }
    }

    checkIfWebsocketsAreSupported() {

      let server = this

      let websocketSupport = {
        browser: null,
        server: null,
      }

      // does browser support websockets?
      if (window.WebSocket) {

        websocketSupport.browser = true

        // does backend support websockets?
        server.$http.get("/websocket").then(function(response) {

          // if websocket_support property exists and is trurthy
          // websocketSupport.server will equal true.
          websocketSupport.server = !!response.data["websocket_support"]

        }).catch(function websocketNotSupportedByServer() {

          websocketSupport.server = false
          server.$rootScope.$broadcast("start-linux-dash", {})

        }).then(function finalDecisionOnWebsocket() {

          if (websocketSupport.browser && websocketSupport.server) {

            server.establishWebsocketConnection()

          } else {
            // rootScope event not propogating from here.
            // instead, we manually route to url
            server.$location.path('/system-status')
          }

        })

      }
    }

    get(moduleName, callback) {

      let server = this

      // if we have a websocket connection
      if (server.websocket.connection) {

        // and the connection is ready
        if (server.websocket.connection.readyState === 1) {

          // set the callback as the event handler
          // for server response.
          //
          // Callback instance needs to be overwritten
          // each time for this to work. Not sure why.
          server.websocket.onMessageEventHandlers[moduleName] = callback

          //
          server.websocket.connection.send(moduleName)

        } else {
          console.log("Websocket not ready yet.", moduleName)
        }

      }
      // otherwise
      else {

        let moduleAddress = 'server/?module=' + moduleName

        return this.$http.get(moduleAddress).then(function(response) {
          return callback(response.data)
        })

      }
    }
  }
])

linuxDash.run([
  'server', '$location', '$rootScope',
  (server, $location, $rootScope) => {

    server.checkIfWebsocketsAreSupported()

    let currentRoute = $location.path()
    let currentTab = (currentRoute === '/loading')? 'system-status': currentRoute
    localStorage.setItem('currentTab', currentTab)

    $location.path('/loading')
  }
])

directive('navBar', ['$location', function($location) {
  return {
    template: `
      <ul>
        <li ng-class="{active: isActive(navItem) }" ng-repeat="navItem in items">
          <a href="#/{{navItem}}">
              {{getNavItemName(navItem)}}
          </a>
        </li>
      </ul>
    `,
    link: function(scope) {
      scope.items = [
        'system-status',
        'basic-info',
        'network',
        'accounts',
        'apps'
      ]

      scope.getNavItemName = function(url) {
        return url.replace('-', ' ')
      }

      scope.isActive = function(route) {
        return '/' + route === $location.path()
      }
    }
  }

}])

directive('loader', function() {
  return {
    scope: {
      width: '@'
    },
    template: `
      <div class="spinner">
       <div class="rect1"></div>
       <div class="rect2"></div>
       <div class="rect3"></div>
       <div class="rect4"></div>
       <div class="rect5"></div>
      </div>
    `
  }
})

directive('topBar', function() {
  return {
    scope: {
      heading: '=',
      refresh: '&',
      lastUpdated: '=',
      info: '=',
    },
    template: `
      <div class="top-bar">
        <last-update timestamp="lastUpdated"></last-update>
        <span class="qs">
          {{ heading }}
          <span class="popover above" ng-if="info">
            {{ info }}
          </span>
        </span>
        <refresh-btn refresh="refresh()"></refresh-btn>
      </div>
    `,
    link: function(scope, element, attrs) {
      let $refreshBtn = element.find('refresh-btn').eq(0)

      if (typeof attrs.noRefreshBtn !== 'undefined') {
        $refreshBtn.remove()
      }
    }
  }
})

directive('refreshBtn', () => (
  {
    scope: {
      refresh: '&'
    },
    template: `<button ng-click="refresh()">↺</button>`
  }
))

directive('noData', () => ({ template: 'No Data' }))

directive('lastUpdate', () =>
  ({
    scope: {
      timestamp: '='
    },
    template: `
      <span ng-hide="timestamp">Loading...</span>
      <small alt="Last Update Timestamp">
        <span ng-show="timestamp">{{ timestamp | date:'hh:mm:ss a' }}</span>
      </small>
    `
  })
)

directive('tableData', ['server', '$rootScope', (server, $rootScope) =>
  ({
    scope: {
      heading: '@',
      info: '@',
      moduleName: '@',
      width: '@',
      height: '@'
    },
    template: `
      <plugin
        heading="{{ heading }}"
        last-updated="lastGet"
        on-refresh="getData()"
        info="{{ info }}">

        <loader ng-if="!tableRows"></loader>

        <div ng-show="tableRows">

          <table class="table-data-plugin" width="{{ width }}" height="{{ height }}">
            <thead>
                      <tr class="table-data-filter-container" ng-show="tableRows.length">
                          <th colspan="{{ tableHeaders.length }}" class="filter-container">
                              <input class="filter" ng-model="keyword" placeholder="Search">
                          </th>
                      </tr>
              <tr>
                <th ng-repeat="header in tableHeaders track by $index">
                  <a href="" ng-click="setSortColumn(header)">{{ header }}</a>
                  <span class="column-sort-caret">
                    {{ (header === sortByColumn && !sortReverse) ? '&#9650;': ''; }}
                    {{ (header === sortByColumn && sortReverse) ? '&#9660;': ''; }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="row in tableRows | filter:keyword">
                <td ng-repeat="header in tableHeaders track by $index">
                  {{ row[header] }}
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <no-data ng-show="emptyResult"></no-data>
      </plugin>
    `,
    link: function(scope, element) {

      scope.sortByColumn = null
      scope.sortReverse = null

      // set the column to sort by
      scope.setSortColumn = function(column) {

        // if the column is already being sorted
        // reverse the order
        if (column === scope.sortByColumn) {
          scope.sortReverse = !scope.sortReverse
        } else {
          scope.sortByColumn = column
        }

        scope.sortTableRows()
      }

      scope.sortTableRows = function() {
        scope.tableRows.sort(function(currentRow, nextRow) {

          let sortResult = 0

          if (currentRow[scope.sortByColumn] < nextRow[scope.sortByColumn]) {
            sortResult = -1
          } else if (currentRow[scope.sortByColumn] === nextRow[scope.sortByColumn]) {
            sortResult = 0
          } else {
            sortResult = 1
          }

          if (scope.sortReverse) {
            sortResult = -1 * sortResult
          }

          return sortResult
        })
      }

      scope.getData = function() {
        delete scope.tableRows

        server.get(scope.moduleName, function(serverResponseData) {

          if (serverResponseData.length > 0) {
            scope.tableHeaders = Object.keys(serverResponseData[0])
          }

          scope.tableRows = serverResponseData

          if (scope.sortByColumn) {
            scope.sortTableRows()
          }

          scope.lastGet = new Date().getTime()

          if (serverResponseData.length < 1) {
            scope.emptyResult = true
          }

          if (!scope.$$phase && !$rootScope.$$phase) scope.$digest()
        })
      }

      scope.getData()
    }
  })
])

directive('keyValueList', ['server', '$rootScope', (server, $rootScope) => (
  {
    scope: {
      heading: '@',
      info: '@',
      moduleName: '@',
    },
    template: `
      <plugin
        heading="{{ heading }}"
        last-updated="lastGet"
        on-refresh="getData()"
        info="{{ info }}">

        <loader ng-if="!tableRows"></loader>

        <div ng-show="tableRows">
          <table class="key-value-list">
            <tbody>
              <tr ng-repeat="(name, value) in tableRows">
                <td><strong>{{ name }}</strong></td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>

        </div>

        <no-data ng-show="emptyResult"></no-data>
      </plugin>
    `,
    link: function(scope, element) {

      scope.getData = function() {
        delete scope.tableRows

        server.get(scope.moduleName, function(serverResponseData) {
          scope.tableRows = serverResponseData
          scope.lastGet = new Date().getTime()

          if (Object.keys(serverResponseData).length === 0) {
            scope.emptyResult = true
          }

          if (!scope.$$phase && !$rootScope.$$phase) scope.$digest()
        })
      }

      scope.getData()
    }
  }
)])

directive('lineChartPlugin', ['$interval', '$compile', 'server', '$window', ($interval, $compile, server, $window) => (
  {
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
    template: `
      <div class="plugin">

        <top-bar heading="heading" last-updated="lastGet" no-refresh-btn></top-bar>

        <div class="plugin-body no-padding">

          <loader ng-if="!maxValue || initializing"></loader>

          <canvas
            ng-show="!initializing && !emptyResult"
            class="canvas"
            width="350"
            height="150">
          </canvas>

          <table ng-show="!initializing && !emptyResult" border="0" class="metrics-table">
            <tbody>
              <tr ng-repeat="metric in metrics">
                <td><strong>{{ metric.name }}</strong></td>
                <td>{{ metric.data }}</td>
              </tr>
            </tbody>
          </table>

          <no-data ng-show="emptyResult"></no-data>

        </div>
      </plugin>
    `,
    link: function(scope, element) {

      scope.initializing = true

      // wrap the entire plugin into an initializing function
      let start_rendering_line_chart = function () {

        if (!scope.color)
          scope.color = '0, 255, 0'

        let series, w, h, canvas

        angular.element($window).bind('resize', function() {
          canvas.width = w
          canvas.height = h
        })

        // smoothieJS - Create new chart
        let chart = new smoothie.SmoothieChart({
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
        series  = new smoothie.TimeSeries()
        w       = canvas.width
        h       = canvas.height

        chart.addTimeSeries(series, {
          strokeStyle: 'rgba(' + scope.color + ', 1)',
          fillStyle: 'rgba(' + scope.color + ', 0.2)',
          lineWidth: 2
        })

        chart.streamTo(canvas, 1000)

        let dataCallInProgress = false

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
        let intervalRef = $interval(scope.getData, scope.refreshRate)
        let removeInterval = function() {
          $interval.cancel(intervalRef)
        }

        element.on("$destroy", removeInterval)
      }

      // only start rendering plugin when we know the scale of max/min for the canvas chart (smoothie)
      let stopWatching = scope.$watch('maxValue', function (n, o) {
        if (n) {
          start_rendering_line_chart()
          stopWatching()
        }
      })


    }
  }
)])

directive('multiLineChartPlugin', ['$interval', '$compile', 'server', '$window', ($interval, $compile, server, $window) => (
  {
    scope: {
      heading: '@',
      moduleName: '@',
      refreshRate: '=',
      getDisplayValue: '=',
      units: '=',
      delay: '='
    },
    template: `
      <div class="plugin">
        <top-bar heading="heading" last-updated="lastGet" no-refresh-btn></top-bar>

        <div class="plugin-body no-padding">

          <canvas class="canvas" width="400" height="200"></canvas>

          <table class="metrics-table" border="0">
            <tbody>
              <tr ng-repeat="metric in metricsArray">
                <td>
                  <div
                    class="metric-square"
                    style="display: inline-block; border: 1px solid {{metric.color}}; width: 8px; height: 8px; background: {{metric.color}}">
                  </div>
                </td>
                <td>{{ metric.name }}</td>
                <td>{{ metric.data }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </plugin>
    `,
    link: function(scope, element) {

      let w, h, canvas

      angular.element($window).bind('resize', function() {
        canvas.width = w
        canvas.height = h
      })

      // smoothieJS - Create new chart
      let chart = new smoothie.SmoothieChart({
        borderVisible: false,
        sharpLines: true,
        grid: {
          fillStyle: '#ffffff',
          strokeStyle: 'rgba(232,230,230,0.93)',
          sharpLines: true,
          borderVisible: false
        },
        labels: {
          fontSize: 12,
          precision: 0,
          fillStyle: '#0f0e0e'
        },
        maxValue: 100,
        minValue: 0,
        horizontalLines: [{
          value: 1,
          color: '#ecc',
          lineWidth: 1
        }]
      })

      let seriesOptions = [
        {
          strokeStyle: 'rgba(255, 0, 0, 1)',
          lineWidth: 2
        },
        {
          strokeStyle: 'rgba(0, 255, 0, 1)',
          lineWidth: 2
        },
        {
          strokeStyle: 'rgba(0, 0, 255, 1)',
          lineWidth: 2
        },
        {
          strokeStyle: 'rgba(255, 255, 0, 1)',
          lineWidth: 1
        }
      ]

      // smoothieJS - set up canvas element for chart
      canvas             = element.find('canvas')[0]
      w                  = canvas.width
      h                  = canvas.height
      scope.seriesArray  = []
      scope.metricsArray = []

      // get the data once to set up # of lines on chart
      server.get(scope.moduleName, function(serverResponseData) {

        let numberOfLines = Object.keys(serverResponseData).length

        for (let x = 0; x < numberOfLines; x++) {

          let keyForThisLine = Object.keys(serverResponseData)[x];

          scope.seriesArray[x] = new smoothie.TimeSeries();
          chart.addTimeSeries(scope.seriesArray[x], seriesOptions[x]);
          scope.metricsArray[x] = {
            name: keyForThisLine,
            color: seriesOptions[x].strokeStyle,
          }
        }

      })

      let delay = 1000

      if (angular.isDefined(scope.delay))
        delay = scope.delay

      chart.streamTo(canvas, delay)

      let dataCallInProgress = false

      // update data on chart
      scope.getData = function() {

        if (dataCallInProgress) return

        if (!scope.seriesArray.length) return

        dataCallInProgress = true

        server.get(scope.moduleName, function(serverResponseData) {

          dataCallInProgress = false
          scope.lastGet = new Date().getTime()
          let keyCount = 0
          let maxAvg = 100

          // update chart with current response
          for (let key in serverResponseData) {
            scope.seriesArray[keyCount].append(scope.lastGet, serverResponseData[key])
            keyCount++
            maxAvg = Math.max(maxAvg, serverResponseData[key])
          }

          // update the metrics for this chart
          scope.metricsArray.forEach(function(metricObj) {
            metricObj.data = serverResponseData[metricObj.name].toString() + ' ' + scope.units
          })

          // round up the average and set the maximum scale
          let len = parseInt(Math.log(maxAvg) / Math.log(10))
          let div = Math.pow(10, len)
          chart.options.maxValue = Math.ceil(maxAvg / div) * div

        })

      }

      let refreshRate = (angular.isDefined(scope.refreshRate)) ? scope.refreshRate : 1000
      let intervalRef = $interval(scope.getData, refreshRate)
      let removeInterval = function() {
        $interval.cancel(intervalRef)
      }

      element.on("$destroy", removeInterval)
    }
  }
)])

directive('plugin', function() {
  return {
    transclude: true,
    template: `
      <div class="plugin">
        <top-bar
          heading="heading"
          last-updated="lastGet"
          info="info"
          refresh="getData()">
        </top-bar>

        <div class="plugin-body" ng-transclude></div>
      </div>
    `
  }
})

directive('progressBarPlugin', function() {
  return {
    scope: {
      width: '@',
      moduleName: '@',
      name: '@',
      value: '@',
      max: '@'
    },
    template: `
      <div class="progress-bar-container">
        <div class="progress-bar" style="width:{{width}};">
          <div style="width: {{ (value/max) * 100 }}%;"></div>
        </div>
      </div>
    `
  }
})

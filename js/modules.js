'use strict'

require('angular')

let directive = angular.module('linuxDash').directive

directive('diskSpace', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <plugin
        heading="Disk Partitions"
        last-updated="lastGet"
        on-refresh="getData()">

        <loader ng-hide="diskSpaceData"></loader>

        <table ng-show="diskSpaceData">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th>Stats</th>
              <th>Used</th>
              <th>Mount</th>
            </tr>
          </thead>
          <tbody>
            <tr  ng-repeat="partition in diskSpaceData">
              <td>{{partition['file_system']}}</td>
              <td>
                <progress-bar-plugin
                    width="70px"
                    value="{{ getKB(partition['used']) }}"
                    max="{{ getKB(partition['size']) }}">
                </progress-bar-plugin>
              </td>
              <td>
                {{ partition['used'] }} / {{ partition['size'] }}
              </td>
              <td>
                {{ partition['used%'] }}
              </td>
              <td>{{ partition['mounted'] }}</td>
            </tr>
          </tbody>
        </table>

      </plugin>
    `,
    link: function(scope) {

      let kbDictionary = {
        'M':size => size * Math.pow(1024, 1),
        'G':size => size * Math.pow(1024, 2),
        'T':size => size * Math.pow(1024, 3),
        'P':size => size * Math.pow(1024, 4),
        'E':size => size * Math.pow(1024, 5),
        'Z':size => size * Math.pow(1024, 6),
        'Y':size => size * Math.pow(1024, 7),
      }

      scope.heading = "Disk Partitions"

      scope.getData = function() {
        server.get('disk_partitions', function(serverResponseData) {
          scope.diskSpaceData = serverResponseData
        })

        scope.lastGet = new Date().getTime()
      }

      scope.getData()

      scope.getKB = function(stringSize) {
        let lastChar = stringSize.slice(-1)
        let size = parseFloat(stringSize.replace(",", "."))

          try{
            return kbDictionary[lastChar](size)
          } catch(err) {
            return size
          }
      }
    }
  }
}])

directive('ramChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <line-chart-plugin

          heading="RAM Usage"
          module-name="current_ram"
          color="0,255,0"

          max-value="maxRam"
          min-value="minRam"
          refresh-rate="1000"

          get-display-value="ramToDisplay"
          metrics="ramMetrics">
      </line-chart-plugin>
    `,
    link: function(scope) {

      // get max ram available on machine before we
      // can start charting
      server.get('current_ram', function(resp) {
        scope.maxRam = resp.total
        scope.minRam = 0
      })

      scope.ramToDisplay = function(serverResponseData) {
        return serverResponseData.used
      }

      var humanizeRam = function (ramInMB) {
        var ram = {
          value: parseInt(ramInMB, 10),
          unit: 'MB',
        }

        // if ram > 1,000 MB, use GB
        if (ram.value > 1000) {
          ram = {
            value: (ramInMB/1024).toFixed(2),
            unit: 'GB',
          }
        }

        return ram.value + ' ' + ram.unit
      }

      scope.ramMetrics = [{
        name: 'Used',
        generate: function(serverResponseData) {
          var ratio = serverResponseData.used / serverResponseData.total
          var percentage = parseInt(ratio * 100)

          var usedRam = humanizeRam(serverResponseData.used)
          return usedRam + ' (' + percentage.toString() + '%)'
        }
      },
      {
        name: 'Free',
        generate: function(serverResponseData) {

          var freeRam = humanizeRam(serverResponseData.free)
          var totalRam = humanizeRam(serverResponseData.total)
          return  freeRam + ' of ' + totalRam
        }
      }]
    }
  }
}])

directive('cpuAvgLoadChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <multi-line-chart-plugin
          heading="CPU Avg Load"
          module-name="load_avg"
          units="units">
      </multi-line-chart-plugin>
    `,
    link: function(scope) {
      scope.units = '%'
    }
  }
}])

directive('cpuTemp', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <line-chart-plugin

        heading="CPU temp"
        module-name="cpu_temp"
        color="0,255,0"

        max-value="max"
        min-value="min"
        refresh-rate="1500"

        get-display-value="displayValue"
        metrics="utilMetrics">
      </line-chart-plugin>
    `,
    link: function(scope) {
      scope.min = 0
      scope.max = 100

      scope.displayValue = function(serverResponseData) {
        return serverResponseData
      }

      scope.utilMetrics = [{
        name: 'Temprature',
        generate: function(serverResponseData) {
          return serverResponseData + ' °C'
        }
      }]

    }
  }
}])

directive('cpuUtilizationChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <line-chart-plugin

          heading="CPU Utilization"
          module-name="cpu_utilization"
          color="0,255,0"

          max-value="max"
          min-value="min"
          refresh-rate="1500"

          get-display-value="displayValue"
          metrics="utilMetrics">
      </line-chart-plugin>
    `,
    link: function(scope) {
      scope.min = 0
      scope.max = 100

      scope.displayValue = function(serverResponseData) {
        return serverResponseData
      }

      scope.utilMetrics = [{
        name: 'Usage',
        generate: function(serverResponseData) {
          return serverResponseData + ' %'
        }
      }]

    }
  }
}])

directive('uploadTransferRateChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <multi-line-chart-plugin
          heading="Upload Transfer Rate"
          module-name="upload_transfer_rate"
          units="units">
      </multi-line-chart-plugin>
    `,
    link: function(scope) {
      scope.delay = 2000
      scope.units = 'KB/s'
    }
  }
}])

directive('downloadTransferRateChart', ['server', function(server) {
  return {
    restrict: 'E',
    scope: {},
    template: `
      <multi-line-chart-plugin
        heading="Download Transfer Rate"
        module-name="download_transfer_rate"
        units="units">
      </multi-line-chart-plugin>
    `,
    link: function(scope) {
      scope.delay = 2000
      scope.units = 'KB/s'
    }
  }
}])

//////////////////////////////////////////////////////////
/////////////// Table Data Modules //////////////////// //
//////////////////////////////////////////////////////////
var simpleTableModules = [
  {
    name: 'machineInfo',
    template: '<key-value-list heading="General Info." module-name="general_info" info="System Information"></key-value-list>'
  },
  {
    name: 'ipAddresses',
    template: '<table-data heading="IP Addresses" module-name="ip_addresses" info="IPs assigned to this server"></table-data>'
  },
  {
    name: 'ramIntensiveProcesses',
    template: '<table-data heading="RAM Intensive Processes" module-name="ram_intensive_processes" info="Processes which are using most RAM."></table-data>'
  },
  {
    name: 'cpuIntensiveProcesses',
    template: '<table-data heading="CPU Intensive Processes" module-name="cpu_intensive_processes" info="Processes which are using most CPU."></table-data>'
  },
  {
    name: 'dockerProcesses',
    template: '<table-data heading="Docker Processes" module-name="docker_processes" info="Processes in Docker Containers sorted by CPU."></table-data>'
  },
  {
    name: 'networkConnections',
    template: '<table-data heading="Network Connections" module-name="network_connections"></table-data>'
  },
  {
    name: 'serverAccounts',
    template: '<table-data heading="Accounts" module-name="user_accounts" info="User accounts on this server."></table-data>'
  },
  {
    name: 'loggedInAccounts',
    template: '<table-data heading="Logged In Accounts" module-name="logged_in_users" info="Users currently logged in."></table-data>'
  },
  {
    name: 'recentLogins',
    template: '<table-data heading="Recent Logins" module-name="recent_account_logins" info="Recent user sessions."></table-data>'
  },
  {
    name: 'arpCacheTable',
    template: '<table-data heading="ARP Cache Table" module-name="arp_cache"></table-data>'
  },
  {
    name: 'commonApplications',
    template: '<table-data heading="Common Applications" module-name="common_applications" info="List of commonly installed applications."></table-data>'
  },
  {
    name: 'pingSpeeds',
    template: '<table-data heading="Ping Speeds" module-name="ping" info="Ping speed in milliseconds."></table-data>'
  },
  {
    name: 'bandwidth',
    template: '<table-data heading="Bandwidth" module-name="bandwidth"></table-data>'
  },
  {
    name: 'swapUsage',
    template: '<table-data heading="Swap Usage" module-name="swap"></table-data>'
  },
  {
    name: 'internetSpeed',
    template: '<key-value-list heading="Internet Speed" module-name="internet_speed" info="Internet connection speed of server."></key-value-list>'
  },
  {
    name: 'memcached',
    template: '<key-value-list heading="Memcached" module-name="memcached"></key-value-list>'
  },
  {
    name: 'redis',
    template: '<key-value-list heading="Redis" module-name="redis"></key-value-list>'
  },
  {
    name: 'pm2',
    template: '<table-data heading="P(rocess) M(anager) 2" module-name="pm2" info="pm2 read-out."></table-data>'
  },
  {
    name: 'memoryInfo',
    template: '<key-value-list heading="Memory Info" module-name="memory_info" info="/proc/meminfo read-out."></key-value-list>'
  },
  {
    name: 'cpuInfo',
    template: '<key-value-list heading="CPU Info" module-name="cpu_info" info="/usr/bin/lscpu read-out."></key-value-list>'
  },
  {
    name: 'ioStats',
    template: '<table-data heading="IO Stats" module-name="io_stats" info="/proc/diskstats read-out."></table-data>'
  },
  {
    name: 'scheduledCrons',
    template: '<table-data heading="Scheduled Cron Jobs" module-name="scheduled_crons" info="Crons for all users on the server."></table-data>'
  },
  {
    name: 'cronHistory',
    template: '<table-data heading="Cron Job History" module-name="cron_history" info="Crons which have run recently."></table-data>'
  }
]

simpleTableModules.forEach(function(module, key) {

  directive(module.name, ['server', function(server) {

    var moduleDirective = {
      restrict: 'E',
      scope: {}
    }

    if (module.templateUrl) {
      moduleDirective['templateUrl'] = 'templates/modules/' + module.templateUrl
    }

    if (module.template) {
      moduleDirective['template'] = module.template
    }

    return moduleDirective
  }])

})

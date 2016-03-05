(function() {

  "use strict";

  ///////////////////////////////////////////////////////////
  ////////////////// Module Directives /////////////////// //
  ///////////////////////////////////////////////////////////

  angular.module('linuxDash').directive('diskSpace', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/disk-space.html',
      link: function(scope) {

        scope.heading = "Disk Partitions";

        scope.getData = function() {
          server.get('disk_partitions', function(serverResponseData) {
            scope.diskSpaceData = serverResponseData;
          });

          scope.lastGet = new Date().getTime();
        };

        scope.getData();

        scope.getKB = function(stringSize) {
          var lastChar = stringSize.slice(-1),
            size = parseFloat(stringSize.replace(",", "."));

          switch (lastChar) {
            case 'M':
              return size * Math.pow(1024, 1);
            case 'G':
              return size * Math.pow(1024, 2);
            case 'T':
              return size * Math.pow(1024, 3);
            case 'P':
              return size * Math.pow(1024, 4);
            case 'E':
              return size * Math.pow(1024, 5);
            case 'Z':
              return size * Math.pow(1024, 6);
            case 'Y':
              return size * Math.pow(1024, 7);
            default:
              return size;
          }
        };
      }
    };
  }]);

  angular.module('linuxDash').directive('ramChart', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/ram-chart.html',
      link: function(scope) {

        // get max ram available on machine before we
        // can start charting
        server.get('current_ram', function(resp) {
          scope.maxRam = resp.total;
          scope.minRam = 0;
        });

        scope.ramToDisplay = function(serverResponseData) {
          return serverResponseData.used;
        };

        var humanizeRam = function (ramInMB) {
          var ram = {
            value: parseInt(ramInMB, 10),
            unit: 'MB',
          };

          // if ram > 1,000 MB, use GB
          if (ram.value > 1000) {
            ram = {
              value: (ramInMB/1024).toFixed(2),
              unit: 'GB',
            };
          }

          return ram.value + ' ' + ram.unit;
        };

        scope.ramMetrics = [{
          name: 'Used',
          generate: function(serverResponseData) {
            var ratio = serverResponseData.used / serverResponseData.total;
            var percentage = parseInt(ratio * 100);

            var usedRam = humanizeRam(serverResponseData.used);
            return usedRam + ' (' + percentage.toString() + '%)';
          }
        },
        {
          name: 'Free',
          generate: function(serverResponseData) {

            var freeRam = humanizeRam(serverResponseData.free);
            var totalRam = humanizeRam(serverResponseData.total);
            return  freeRam + ' of ' + totalRam;
          }
        }];
      }
    };
  }]);

  angular.module('linuxDash').directive('cpuAvgLoadChart', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/cpu-load.html',
      link: function(scope) {
        scope.units = '%';
      }
    };
  }]);
  angular.module('linuxDash').directive('cpuTemp', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/cpu-temp.html',
      link: function(scope) {
        scope.min = 0;
        scope.max = 100;

        scope.displayValue = function(serverResponseData) {
          return serverResponseData;
        };

        scope.utilMetrics = [{
          name: 'Temprature',
          generate: function(serverResponseData) {
            return serverResponseData + ' °C';
          }
        }];

      }
    };
  }]);

  angular.module('linuxDash').directive('cpuUtilizationChart', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/cpu-utilization-chart.html',
      link: function(scope) {
        scope.min = 0;
        scope.max = 100;

        scope.displayValue = function(serverResponseData) {
          return serverResponseData;
        };

        scope.utilMetrics = [{
          name: 'Usage',
          generate: function(serverResponseData) {
            return serverResponseData + ' %';
          }
        }];

      }
    };
  }]);

  angular.module('linuxDash').directive('uploadTransferRateChart', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/upload-transfer-rate.html',
      link: function(scope) {
        scope.delay = 2000;
        scope.units = 'KB/s';
      }
    };
  }]);

  angular.module('linuxDash').directive('downloadTransferRateChart', ['server', function(server) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/modules/download-transfer-rate.html',
      link: function(scope) {
        scope.delay = 2000;
        scope.units = 'KB/s';
      }
    };
  }]);

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
    /*{
      name: 'cpuTemp',
      template: '<table-data heading="CPU Temp" module-name="cputemp"></table-data>'
    },*/
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
    },
    {
      name: 'raidStats',
      template: '<table-data heading="RAID Sats" module-name="raid_status" info="RAID Status from /proc/mdstats"></table-data>'
    },
  ];

  simpleTableModules.forEach(function(module, key) {

    angular.module('linuxDash').directive(module.name, ['server', function(server) {

      var moduleDirective = {
        restrict: 'E',
        scope: {}
      };

      if (module.templateUrl) {
        moduleDirective['templateUrl'] = 'templates/modules/' + module.templateUrl
      }

      if (module.template) {
        moduleDirective['template'] = module.template;
      }

      return moduleDirective;
    }]);

  });

}());

////////////////// Widget Directives ///////////////////

linuxDash.directive('diskSpace', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/disk-space.html',
        link: function (scope) {

            scope.heading =  "Disk Partitions";

            scope.getData = function () {
                server.get('disk_partitions', function (serverResponseData) {
                    scope.diskSpaceData = serverResponseData;
                });

                scope.lastGet = new Date().getTime();
            };

            scope.getData();

            scope.getKB = function (stringSize) { 
                var lastChar = stringSize.slice(-1),
                    size = parseInt(stringSize);

                switch (lastChar){
                    case 'M': return size * 1024;
                    case 'G': return size * 1048576;
                    default: return size;
                }
            };
        }
    };
}]);

linuxDash.directive('ramChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/ram-chart.html',
        link: function (scope) {

            // get max ram available on machine before we 
            // can start charting
            server.get('current_ram', function (resp) {
                scope.maxRam = resp[1];
                scope.minRam = 0;
            });

            scope.ramToDisplay = function (serverResponseData) {
                return serverResponseData[2];
            };

            scope.ramMetrics = [
                {
                    name: 'Used',
                    generate: function (serverResponseData) {
                        var ratio = serverResponseData[2] / serverResponseData[1];
                        var percentage = parseInt(ratio * 100);

                        return serverResponseData[2] + ' MB ('
                                + percentage.toString() + '%)';
                    }
                },
                {
                    name: 'Free',
                    generate: function (serverResponseData) {
                        return serverResponseData[3].toString() 
                                + ' MB of '
                                + serverResponseData[1] 
                                + 'MB';
                    }
                } 
            ];
        }
    };
}]);


linuxDash.directive('cpuLoadChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/cpu-load.html',
        link: function (scope) {
            scope.maxLoad = 100;
            scope.minLoad = 0;

            scope.loadToDisplay = function (serverResponseData) {
                return serverResponseData[1];
            };

            scope.loadMetrics = [
                {
                    name: '1 Min Avg',
                    generate: function (serverResponseData) {
                        return serverResponseData[0][1] + ' %';
                    }
                },
                {
                    name: '5 Min Avg',
                    generate: function (serverResponseData) {
                        return serverResponseData[1][1] + ' %';
                    }
                },
                {
                    name: '15 Min Avg',
                    generate: function (serverResponseData) {
                        return serverResponseData[2][1] + ' %';
                    }
                }
            ];
        }
    };
}]);


linuxDash.directive('machineInfo', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        template: '<static-data-plugin ' +
                        'heading="Machine Info" ' + 
                        'static-data="basicInfo"> ' +
                    '</static-data-plugin>',
        link: function (scope) {
            scope.basicInfo = [
                {module: 'issue' },
                {module: 'hostname' },
                {module: 'time' },
                {module: 'uptime' },
            ];
        }
    };
}]);

linuxDash.directive('sabnzbd', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        template: '<static-data-plugin ' +
                        'heading="SABnzbd" ' + 
                        'static-data="[{module:\'sabnzbd\'}]"> ' +
                    '</static-data-plugin>'
    };
}]);

/////////////// Table Data Modules ////////////////////
var simpleTableModules = [
    { 
        name: 'ipAddresses', 
        template: '<key-value-list heading="IP Addresses" module-name="ip"></key-value-list>' 
    },
    { 
        name: 'ramIntensiveProcesses', 
        template: '<table-data heading="RAM Intensive Processes" module-name="ram_intensive_processes"></table-data>' 
    },
    { 
        name: 'cpuIntensiveProcesses', 
        template: '<table-data heading="CPU Intensive Processes" module-name="cpu_intensive_processes"></table-data>' 
    },
    { 
        name: 'networkConnections', 
        template: '<table-data heading="Network Connections" module-name="network_connections"></table-data>' 
    },
    { 
        name: 'serverAccounts', 
        template: '<table-data heading="Accounts" module-name="users"></table-data>' 
    },
    { 
        name: 'loggedInAccounts', 
        template: '<table-data heading="Logged In Accounts" module-name="logged_in_accounts"></table-data>' 
    },
    { 
        name: 'recentLogins', 
        template: '<table-data heading="Recent Logins" module-name="recent_account_logins"></table-data>' 
    },
    { 
        name: 'arpCacheTable', 
        template: '<table-data heading="ARP Cache Table" module-name="arp_cache_table"></table-data>' 
    },
    { 
        name: 'commonApplications', 
        template: '<table-data heading="Common Applications" module-name="common_applications"></table-data>' 
    },
    { 
        name: 'pingSpeeds', 
        template: '<table-data heading="Ping Speeds" module-name="ping"></table-data>' 
    },
    { 
        name: 'dhcpLeases', 
        templateUrl: 'dhcp-leases.html' 
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
        template: '<key-value-list heading="Internet Speed" module-name="internet_speed"></key-value-list>' 
    }, 
    { 
        name: 'memcached', 
        template: '<key-value-list heading="Memcached" module-name="memcached"></key-value-list>' 
    },
    { 
        name: 'redis', 
        template: '<key-value-list heading="Redis" module-name="redis_status"></key-value-list>' 
    },
    { 
        name: 'memoryInfo', 
        template: '<key-value-list heading="Memory Info" module-name="memory_info"></key-value-list>' 
    },
    { 
        name: 'cpuInfo', 
        template: '<key-value-list heading="CPU Info" module-name="cpu_info"></key-value-list>' 
    },
    { 
        name: 'ioStats', 
        template: '<table-data heading="IO Stats" module-name="io_stats"></table-data>' 
    },
];

simpleTableModules.forEach(function (module, key) {

    linuxDash.directive(module.name, ['server', function(server) {
        var moduleDirective = {
            restrict: 'E',
            scope: {},
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
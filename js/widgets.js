////////////////// Widget Directives ///////////////////

linuxDash.directive('diskSpace',[ 'server', function(server) {
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

linuxDash.directive('ramChart',[ 'server', function(server) {
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


linuxDash.directive('cpuLoadChart',[ 'server', function(server) {
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


linuxDash.directive('machineInfo',[ 'server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        template: '<static-data-plugin ' +
                        'heading="Machine Info" ' + 
                        'static-data="basicInfo"> ' +
                    '</static-data-plugin>',
        link: function (scope) {
            scope.basicInfo = [
                {name: 'OS', module: 'issue' },
                {name: 'Hostname', module: 'hostname' },
                {name: 'Server Time', module: 'time' },
                {name: 'Server Uptime', module: 'uptime' },
            ];
        }
    };
}]);

linuxDash.directive('sabnzbd',[ 'server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        template: '<static-data-plugin ' +
                        'heading="SABnzbd" ' + 
                        'static-data="[{name: \'Downstream\', module:\'sabnzbd\'}]"> ' +
                    '</static-data-plugin>'
    };
}]);

/////////////// Table Data Directives ////////////////////
var simpleTableDirectives = [
    { name: 'ipAddresses', templateUrl: 'ip-addresses.html' },
    { name: 'ramIntensiveProcesses', templateUrl: 'ram-intensive-processes.html' },
    { name: 'cpuIntensiveProcesses', templateUrl: 'cpu-intensive-processes.html' },
    { name: 'networkConnections', templateUrl: 'network-connections.html' },
    { name: 'serverAccounts', templateUrl: 'server-accounts.html' },
    { name: 'loggedInAccounts', templateUrl: 'logged-in-accounts.html' },
    { name: 'recentLogins', templateUrl: 'recent-logins.html' },
    { name: 'memcached', templateUrl: 'memcached.html' },
    { name: 'arpCacheTable', templateUrl: 'arp-cache-table.html' },
    { name: 'commonApplications', templateUrl: 'common-applications.html' },
    { name: 'pingSpeeds', templateUrl: 'ping-speeds.html' },
    { name: 'dhcpLeases', templateUrl: 'dhcp-leases.html' },
    { name: 'bandwidth', templateUrl: 'bandwidth.html' },
    { name: 'swapUsage', templateUrl: 'swap-usage.html' },
    { name: 'redis', templateUrl: 'redis.html' },
    { name: 'internetSpeed', templateUrl: 'internet-speed.html' },
];

simpleTableDirectives.forEach(function (directive, key) {

    linuxDash.directive(directive.name,[ 'server', function(server) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/modules/' + directive.templateUrl
        };
    }]);

});
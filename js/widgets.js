////////////////// Widget Directives ///////////////////

linuxDash.directive('diskSpace',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/disk-space.html',
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
        isoloate: true,
        templateUrl: 'templates/ram-chart.html',
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
        isoloate: true,
        templateUrl: 'templates/cpu-load.html',
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
        isoloate: true,
        templateUrl: 'templates/machine-info.html',
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

linuxDash.directive('ipAddresses',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/ip-addresses.html',
        link: function (scope) {
            scope.ipTableConfig = [
                'Name',
                'IP'
            ];
        }
    };
}]);

linuxDash.directive('ramIntensiveProcesses',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/ram-intensive-processes.html',
        link: function (scope) {
            scope.tableConfig = [
                'PID',
                'USER',
                'COMMAND', 
                '%MEM',
                'RSS',
                'VSZ',
            ];
        }
    };
}]);

linuxDash.directive('cpuIntensiveProcesses',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/cpu-intensive-processes.html',
        link: function (scope) {
            scope.tableConfig = [
                'PID',
                'USER',
                'COMMAND', 
                '%CPU',
                'RSS',
                'VSZ',
            ];
        }
    };
}]);

linuxDash.directive('networkConnections',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/network-connections.html',
        link: function (scope) {
            scope.netstatTableConfig = [
                '# of Connections',
                'IP'
            ];
        }
    };
}]);

linuxDash.directive('machineAccounts',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/machine-accounts.html',
        link: function (scope) {
            scope.usersTableConfig = [
                'Account Type',
                'User',
                'Home Directory'
            ];
        }
    };
}]);

linuxDash.directive('loggedInAccounts',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/logged-in-accounts.html',
        link: function (scope) {
            scope.onlineTableConfig = [
                'Who',
                'From',
                'Last Login',
                'Idle'
            ];
        }
    };
}]);

linuxDash.directive('recentLogins',[ 'server', function(server) {
    return {
        restrict: 'E',
        isoloate: true,
        templateUrl: 'templates/recent-logins.html',
        link: function (scope) {
            scope.lastloginTableConfig = [
                'Who',
                'From',
                'Last Login',
            ];
        }
    };
}]);

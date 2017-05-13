angular
  .module('linuxDashDemo', ['linuxDash', 'ngMockE2E'])
  .run(function($httpBackend) {

    // signal to not use websockets for demo
    $httpBackend.whenGET('/websocket').respond(false)

    // current_ram
    $httpBackend.whenGET('server/?module=current_ram').respond(function () {
      return [200, {
        total: 512,
        used: 200,
        available: 312,
      }]
    })

    // ram_intensive_processes
    $httpBackend.whenGET('server/?module=ram_intensive_processes').respond(function () {
      return [200, [ { 'pid': 2782, 'user': 'user1', 'mem%': 2.2, 'rss': 232332, 'vsz': 1118240, 'cmd': 'nginx'}, { 'pid': 2623, 'user': 'user1', 'mem%': 2.0, 'rss': 209732, 'vsz': 1321800, 'cmd': 'nginx'}, { 'pid': 1558, 'user': 'user1', 'mem%': 1.3, 'rss': 140796, 'vsz': 1321400, 'cmd': 'gnome-software'}, { 'pid': 5026, 'user': 'user1', 'mem%': 1.2, 'rss': 126312, 'vsz': 875072, 'cmd': 'nginx'}, { 'pid': 5051, 'user': 'user1', 'mem%': 1.1, 'rss': 112776, 'vsz': 872512, 'cmd': 'nginx'}, { 'pid': 1477, 'user': 'user1', 'mem%': 1.0, 'rss': 108248, 'vsz': 1471548, 'cmd': 'compiz'}, { 'pid': 2997, 'user': 'user1', 'mem%': 1.0, 'rss': 107208, 'vsz': 869076, 'cmd': 'nginx'}, { 'pid': 2298, 'user': 'root', 'mem%': 1.0, 'rss': 101356, 'vsz': 286772, 'cmd': 'aptd'}, { 'pid': 2700, 'user': 'user1', 'mem%': 0.9, 'rss': 95784, 'vsz': 460272, 'cmd': 'nginx'}, { 'pid': 2799, 'user': 'user1', 'mem%': 0.8, 'rss': 83940, 'vsz': 778512, 'cmd': 'nginx'}, { 'pid': 4248, 'user': 'user1', 'mem%': 0.8, 'rss': 82276, 'vsz': 1059420, 'cmd': 'redis'}, { 'pid': 1095, 'user': 'root', 'mem%': 0.7, 'rss': 78424, 'vsz': 457156, 'cmd': 'Xorg'}, { 'pid': 2810, 'user': 'user1', 'mem%': 0.7, 'rss': 72884, 'vsz': 750856, 'cmd': 'nginx'}, { 'pid': 2809, 'user': 'user1', 'mem%': 0.7, 'rss': 72872, 'vsz': 752908, 'cmd': 'nginx'} ]]
    })

    // cpu_intensive_processes
    $httpBackend.whenGET('server/?module=cpu_intensive_processes').respond(function () {
      return [200, [ { 'pid': 5026, 'user': 'user1', 'cpu%': 25.5, 'rss': 137944, 'vsz': 907236, 'cmd': 'nginx'}, { 'pid': 2623, 'user': 'user1', 'cpu%': 9.5, 'rss': 229016, 'vsz': 1327948, 'cmd': 'nginx'}, { 'pid': 2700, 'user': 'user1', 'cpu%': 8.8, 'rss': 106324, 'vsz': 474796, 'cmd': 'nginx'}, { 'pid': 4248, 'user': 'user1', 'cpu%': 8.8, 'rss': 96848, 'vsz': 1151460, 'cmd': 'sublime_text'}, { 'pid': 1477, 'user': 'user1', 'cpu%': 8.6, 'rss': 111252, 'vsz': 1476524, 'cmd': 'compiz'}, { 'pid': 1571, 'user': 'user1', 'cpu%': 7.7, 'rss': 62984, 'vsz': 551884, 'cmd': 'orca'}, { 'pid': 1095, 'user': 'root', 'cpu%': 6.2, 'rss': 86048, 'vsz': 457112, 'cmd': 'Xorg'}, { 'pid': 1535, 'user': 'user1', 'cpu%': 3.9, 'rss': 17152, 'vsz': 574624, 'cmd': 'pulseaudio'}, { 'pid': 5051, 'user': 'user1', 'cpu%': 1.6, 'rss': 131828, 'vsz': 888712, 'cmd': 'nginx'}, { 'pid': 2890, 'user': 'user1', 'cpu%': 1.1, 'rss': 52968, 'vsz': 657408, 'cmd': 'unity-panel-ser'}, { 'pid': 2782, 'user': 'user1', 'cpu%': 1.0, 'rss': 226536, 'vsz': 1110556, 'cmd': 'nginx'}, { 'pid': 1438, 'user': 'user1', 'cpu%': 0.9, 'rss': 45840, 'vsz': 660352, 'cmd': 'hud-service'}, { 'pid': 1631, 'user': 'user1', 'cpu%': 0.9, 'rss': 26208, 'vsz': 514684, 'cmd': 'indicator-multi'}, { 'pid': 1804, 'user': 'user1', 'cpu%': 0.9, 'rss': 9752, 'vsz': 523936, 'cmd': 'sd_espeak'} ]]
    })

    // cpu_intensive_processes
    $httpBackend.whenGET('server/?module=disk_partitions').respond(function () {
      return [200, [ {'file_system': 'udev', 'size': '4.9G', 'used': '0', 'avail': '4.9G', 'used%': '0%', 'mounted': '/dev'}, {'file_system': '/dev/sda1', 'size': '449G', 'used': '224.5G', 'avail': '224.5G', 'used%': '50%', 'mounted': '/'}, {'file_system': 'tmpfs', 'size': '5.0M', 'used': '4.0K', 'avail': '5.0M', 'used%': '1%', 'mounted': '/run/lock'} ]]
    })

    $httpBackend.whenGET('server/?module=cpu_temp').respond(function () {
      return [200, [ ]]
    })

    $httpBackend.whenGET('server/?module=cpu_temp').respond(function () {
      return [200, [ ]]
    })

    $httpBackend.whenGET('server/?module=cpu_utilization').respond(function () {
      return [200, 25]
    })

    $httpBackend.whenGET('server/?module=load_avg').respond(function () {
      return [200, { '1_min_avg': 40, '5_min_avg': 22, '15_min_avg': 10}]
    })

    $httpBackend.whenGET('server/?module=docker_processes').respond(function () {
      return [200, []]
    })

    $httpBackend.whenGET('server/?module=swap').respond(function () {
      return [200, [ { 'filename': '/dev/sda5', 'type': 'partition', 'size': '10364924', 'used': '0', 'priority': '-1'} ]]
    })

  })
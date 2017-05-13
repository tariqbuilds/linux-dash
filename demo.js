angular
  .module('linuxDashDemo', ['linuxDash', 'ngMockE2E'])
  .run(function($httpBackend) {

    // signal to not use websockets for demo
    $httpBackend.whenGET('/websocket').respond(false)

    // current_ram
    $httpBackend.whenGET('server/?module=current_ram').respond(function () {
      return [200, {
        total: 512,
        used: used,
        available: 512 - used,
      }]
    })

    // ram_intensive_processes
    $httpBackend.whenGET('server/?module=ram_intensive_processes').respond(function () {
      return [200, {
        total: 512,
        used: used,
        available: 512 - used,
      }]
    })

  })
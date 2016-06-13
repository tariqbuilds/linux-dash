function runFn(server, $location, $rootScope) {

  server.checkIfWebsocketsAreSupported()

  var currentRoute = $location.path()
  var currentTab = (currentRoute === '/loading')? 'system-status': currentRoute
  localStorage.setItem('currentTab', currentTab)

  $location.path('/loading')
}

angular
  .module('linuxDash', ['ngRoute'])
  .run([ 'server', '$location', '$rootScope', runFn])

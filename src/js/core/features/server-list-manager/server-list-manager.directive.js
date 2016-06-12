function serverListDirectiveFn() {
  return {
    scope: {},
    templateUrl: 'src/js/core/features/server-list-manager/server-list-manager.html',
    link: function serverListLinkFn(scope) {

      var serversInLocalStorage = JSON.parse(localStorage.getItem('linuxDashServerList'))
      scope.servers =  serversInLocalStorage || []

      var updateServerListInLocalStorage = function () {
        localStorage.setItem('linuxDashServerList', JSON.stringify(scope.servers))
      }

      scope.addNewServer = function (newServerName) {
        scope.servers.push(newServerName)
        updateServerListInLocalStorage()
        scope.newServer = ''
      }

      scope.removeServer = function (indexToRemove) {
        scope.servers.splice(indexToRemove, 1)
        updateServerListInLocalStorage()
      }
    }
  }
}

angular
  .module('linuxDash')
  .directive('ldServerListManager', serverListDirectiveFn)

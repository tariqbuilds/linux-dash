function sidebarDirectiveFn() {
  return {
    scope: {},
    templateUrl: 'src/js/core/features/sidebar/sidebar.html',
    link: function sidebarLinkFn(scope) {

      scope.sidebarIsOpen = false

      scope.toggleSidebar = function () {
        scope.sidebarIsOpen = !scope.sidebarIsOpen
      }

    }
  }
}

angular
  .module('linuxDash')
  .directive('ldSidebar', sidebarDirectiveFn)

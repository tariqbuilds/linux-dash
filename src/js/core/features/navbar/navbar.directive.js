angular.module('linuxDash').directive('navBar', ['$location', function($location) {
  return {
    template: '\
      \
      <span class="title">Linux Dash</span>\
      \
      <ul> \
        <li ng-class="{active: isActive(navItem) }" ng-repeat="navItem in items"> \
          <a href="#/{{navItem}}" ng-bind="getNavItemName(navItem)"></a> \
        </li> \
      </ul> \
    ',
    link: function(scope) {
      scope.items = [
        'system-status',
        'basic-info',
        'network',
        'accounts',
        'apps'
        'custom'
      ]

      scope.getNavItemName = function(url) {
        return url.replace('-', ' ')
      }

      scope.isActive = function(route) {
        return '/' + route === $location.path()
      }
    }
  }
}])

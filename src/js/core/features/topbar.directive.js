angular.module('linuxDash').directive('topBar', function() {
  return {
    scope: {
      heading: '=',
      refresh: '&',
      lastUpdated: '=',
      info: '=', // not being used; needs a good ui solution
    },
    template: '\
      <div class="top-bar">\
        <last-update timestamp="lastUpdated"></last-update>\
        <span class="qs">\
          {{ heading }}\
        </span>\
        <refresh-btn refresh="refresh()"></refresh-btn>\
      </div>\
    ',
    link: function(scope, element, attrs) {
      var $refreshBtn = element.find('refresh-btn').eq(0)

      if (typeof attrs.noRefreshBtn !== 'undefined') {
        $refreshBtn.remove()
      }
    }
  }
})

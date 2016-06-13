angular
  .module('linuxDash')
  .directive('makePluginsDraggable', function makePluginsDraggable() {
    return {
      link: function () {
        var el = document.getElementById('plugins')

        if (el) {
          var sortable = Sortable.create(el, {
            handle: '.top-bar',
            ghostClass: 'ld-ghost',
            chosenClass: 'ld-chosen',
            animation: 350,
          })
        }
      }
    }

  })

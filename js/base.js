$(document).ready(function() {
    // Smooth scrolling for links.
    $('.mainnav').on('click', '.js-smoothscroll', function(event) {
        event.preventDefault();
        var target = $(this.hash).parent();
        pulseElement(target, 8, 400);

        $('html').animate({
            scrollTop: target.offset().top - 130
        }, 1000);
    });
});

/**
 * Applies a pulse effect to the specified element.
 *
 * @param {HTMLElement} element The element to apply the effect to.
 * @param {Number} times How many pulses.
 * @param {Number} interval Milliseconds between pulses.
 */
function pulseElement(element, times, interval) {
    var parent = element.parent();
    var f = function() {
        element.toggleClass('pulse');
        parent.toggleClass('pulse-border');
    };
    for (; times > 0; --times) {
        setTimeout(f, times * interval);
    }
}

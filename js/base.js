$(document).ready(function() {
	
	// enable popovers
	$(".pop").popover(); 
	
    // Smooth scrolling for links.
    $(".mainnav").on("click", ".js-smoothscroll", function(event) {
        event.preventDefault();
        var target = $(this.hash).parent();
        pulseElement(target, 8, 400);

        $("html").animate({
            scrollTop: target.offset().top - 130
        }, 1000);
    });
	
	// refresh all widgets
	$('#refresh-all').on('click',function(){
		dashboard.getAll();
	});
	
    dashboard.getAll();
}).on("click", ".js-refresh-info", function(event) {
    event.preventDefault();
    var item = event.target.id.split("-").splice(-1)[0];
    dashboard.fnMap[item]();
});

// Handle for cancelling active effect.
var pulsing = {
    element: null,
    timeoutIDs: [],
    resetfn: function() {
        pulsing.element = null;
        pulsing.timeoutIDs = [];
    }
};

/**
 * Applies a pulse effect to the specified element. If triggered while already
 * active the ongoing effect is cancelled immediately.
 *
 * @param {HTMLElement} element The element to apply the effect to.
 * @param {Number} times How many pulses.
 * @param {Number} interval Milliseconds between pulses.
 */
function pulseElement(element, times, interval) {
    if (pulsing.element) {
        pulsing.element.removeClass("pulse").
            parent().removeClass("pulse-border");
        pulsing.timeoutIDs.forEach(function(ID) {
            clearTimeout(ID);
        });
        pulsing.timeoutIDs = [];
    }
    pulsing.element = element;
    var parent = element.parent();
    var f = function() {
        element.toggleClass("pulse");
        parent.toggleClass("pulse-border");
    };

    pulsing.timeoutIDs.push(setTimeout(pulsing.resetfn,
                                       (times + 1) * interval));
    for (; times > 0; --times) {
        pulsing.timeoutIDs.push(setTimeout(f, times * interval));
    }
}

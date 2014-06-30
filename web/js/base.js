$(document).ready(function() {
    // keep widgets ordered
    keepWidgetOrdered();

    // hide localstored hidden widgets
    keepWidgetHidden();

    // enable popovers
    $(".pop").popover();

   // activate tooltips on hover
   $("[data-toggle='tooltip']").tooltip({trigger: 'hover', placement:'right'});  

    dashboard.getAll();
}).on("click", ".js-smoothscroll", function(event) {
    event.preventDefault();
    var target = $(this.hash).parent();
    pulseElement(target, 8, 400);

    $("html,body").animate({
        scrollTop: target.offset().top - 130
    }, 1000);
}).on("click", ".js-refresh-info", function(event) {
    event.preventDefault();
    var target = event.target;
    var item = target.id.split("-").splice(-1)[0];

    // if the refresh icon is click (where in a <span>) target will not have an id, so grab its parent instead
    if(target.id == "") {
        var parent = $(target).parent()[0];
        item = parent.id.split("-").splice(-1)[0];
    }

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

/**
 * Adds jQuery UI sortable portlet functionality to widgets
 *
 *
 */

$( "#widgets" ).sortable({
      handle: ".widget-header",
      cancel: "#filter-ps",
      cursor: "move",
      opacity: 0.7,
      scrollSensitivity:10,
      tolerance: 'pointer',
      stop: function(event, ui) {
            // save widget order in localstorage
            var newOrder = new Array();
            $('.widget').each(function() {
                newOrder.push($(this).attr("id"));
            });
            localStorage.setItem('positions', JSON.stringify(newOrder));
        }
 });

/**
 *
 * Widget hide functionality
 *
**/
// general cached DOM objects
closedWidgetCount = $('#closed-widget-count'),
closedWidgets = $('#closed-widget-list');
allWidgets = $('.widget');

// Close all widgets
$('#close-all-widgets').click(function(){
    allWidgets.each(function(index){
        if ($(this).is(":visible")){
	       hideWidget($(this), 400);
        }
    });
});

// Open all widgets
$('#open-all-widgets').click(function(){
    allWidgets.each(function(index){
	   openWidget($(this), $(this).attr('id'), 500);
    });
});

// attach a close button to all widget headers
$('.widget-header').append('<div class="btn btn-icon-only icon-remove hide-widget"></div>');

// hide / close widget function
$('.hide-widget').live('click',function(){
    var widget = $(this).parent().parent();
    hideWidget(widget, 300);
});

// unhide closed widget
$('.open-widget').live('click',function(){
    // cache DOM objects/data used in this function
    var widgetIdentifier = $(this).data('id');
    var widget = $( "#" + widgetIdentifier );
    var navItem = $(this).parent();

    openWidget(widget,widgetIdentifier,500);

    // remove item from closed-widget-list
    navItem.remove();

});

function openWidget(widget, widgetIdentifier, speed){

    // decrement closed-widget-count 
    if(widget.is(":hidden")) {
        closedWidgetCount.text( Number(closedWidgetCount.text()) - 1);
    }

    // unhide widget
    widget.show(500);

     // remove widget from localstorage
    var localData = JSON.parse(window.localStorage.getItem('hidden'));
    for(var i = localData.length; i--;){
        if (localData[i] == widgetIdentifier) {
            localData.splice(i, 1);
        }
    }
    localStorage.setItem('hidden', JSON.stringify(localData));
}


function hideWidget(widget, speed){
    // cache DOM objects/data used in this function
    var widgetName = widget.find('.widget-header h3').text();
    var widgetIdentifier = widget.attr('id'); 

    // update count
    if(!widget.is(":hidden")) {
        closedWidgetCount.text( Number(closedWidgetCount.text()) + 1);
    }

    // hide widget from DOM
    widget.hide(speed);

    // add to hidden list
    closedWidgets.append('<li><a class="open-widget" data-id="'+widgetIdentifier+'"><i class="icon-plus-sign"></i>  '+widgetName+'</a></li>');

    // add widget to localstorage (and create item if needed)
    var localData = JSON.parse(window.localStorage.getItem('hidden'));
    if(localData == null) {
        hidden = new Array();
        hidden.push(widgetIdentifier);
        localStorage.setItem('hidden', JSON.stringify(hidden));
    }
    else{
        if (!isInArray(localData, widgetIdentifier)) {
            localData.push(widgetIdentifier);
            localStorage.setItem('hidden', JSON.stringify(localData));
        }
    }
}

function keepWidgetHidden(){
    var localData = JSON.parse(window.localStorage.getItem('hidden'));
    if(localData!=null) {
        $.each(localData, function(i,value){
             hideWidget( $("#" + value), 0 );
        });
    }
}

function keepWidgetOrdered(){
    var localData = JSON.parse(window.localStorage.getItem('positions'));
    if(localData!=null) {
        $.each(localData, function(i,value){
            var widgetId ="#" + value;
            $("#widgets").append($(widgetId).parent());
        });
    }
}

function isInArray(array, search)
{
    return (array.indexOf(search) >= 0) ? true : false; 
}

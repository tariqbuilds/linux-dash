$(function() {
    var pulse_counter;  // Number of times the element should pulsate.
    var pulse_interval; // Interval (in milliseconds) of pulsating.

    function pulsate_element(element) {
        while (pulse_counter > 0) {
            pulse_counter--;
            setTimeout(function() {
                element.parent().toggleClass('pulse');
            }, pulse_interval * pulse_counter);
            setTimeout(function() {
                element.parent().parent().toggleClass('pulse-boder');
            }, pulse_interval * pulse_counter);
            pulsate_element(element);
        }
    }

    // Smooth scrolling for links.
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') ===
                                          this.pathname.replace(/^\//, '')
                || location.hostname === this.hostname) {

                var target = $(this.hash);

                // Number of times the element should pulsate.
                pulse_counter = 8;
                // Interval (in milliseconds) of pulsating.
                pulse_interval = 400;
                pulsate_element(target);

                target = target.length ? target :
                    $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.parent().offset().top - 130
                    }, 1000);
                    return false;
                }
            }
        });
    });
});

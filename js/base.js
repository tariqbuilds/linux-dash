$(function () {
	
	
	$('.subnavbar').find ('li').each (function (i) {
	
		var mod = i % 3;
		
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
		
	});
	

/* ADDED BY AFAQ */	
	
var pulse_counter; // number of times the element should pulsate
var pulse_interval; // interval (in milliseconds) of pulsating


function pulsate_element(element){
    
    while ( pulse_counter>0){
        pulse_counter--;
        setTimeout(function(){ element.parent().toggleClass('pulse'); },pulse_interval*pulse_counter);
        setTimeout(function(){ element.parent().parent().toggleClass('pulse-boder'); },pulse_interval*pulse_counter);
        pulsate_element(element);
    }
    
    //if (pulse_counter==0){ pulse_counter=8;}
}

// smooth scrolling for links
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

      var target = $(this.hash);
      
      pulse_counter=8; // number of times the element should pulsate
      pulse_interval=400; // interval (in milliseconds) of pulsating
      pulsate_element(target);
      
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.parent().offset().top-130
        }, 1000);
        return false;
      }
    }
  });
});
	
	
});
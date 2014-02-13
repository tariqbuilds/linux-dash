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

/* Added by kevinrabinovich */
	//Adds <meter> element displaying % disk used
	//Tests if the following has already been run, because it runs twice otherwise		
	var progressPresent = document.getElementsByTagName("progress");
	var meterPresent = document.getElementsByTagName("meter");
	var progressBarClassPresent = document.getElementsByClassName("progress-bar");
	if ((!(progressPresent.length > 0) || (!(meterPresent.length > 0)) || (!(progressBarClassPresent.length > 0))) /*If progress, meter, or .progress-bar doesn't exist*/) {
		var table = document.getElementById('df_dashboard'); //Table
		var rows = table.rows.length; //All rows
		for (i = 1; i < rows; i++){
			//For each row
			var tcells = table.rows.item(i).cells; //All cells in this row
			var usedTotal = 0;
			var totalUsedLength = tcells.item(4).innerHTML.length - 1; //Length of characters in cell; subtracting 1 to account for '%'
			for (j = totalUsedLength - 1; j >= 0; j--) { //For each place digit j in number; subtracting 1 because index is 0-based
				if (totalUsedLength == 1) { //If there are only units, i.e. no tens
					usedTotal += parseInt(tcells.item(4).innerHTML[j]);
				}
				else {
					switch (j) {
						case 1: //units
							usedTotal += parseInt(tcells.item(4).innerHTML[j]);
							break;
						case 0: //tens
							usedTotal += 10*parseInt(tcells.item(4).innerHTML[j]);
							break;
						default:
							break;
					}
				}
			}
			tcells.item(0).innerHTML += "<meter max=100" + " value=" + usedTotal + " ><progress " + " position=" + usedTotal/100 + " value=" + usedTotal/100 + " >" + "<div class=progress-bar><span style=width:" + usedTotal + "% ></span></div></progress></meter>";
		//End for each row
		}
	}
});
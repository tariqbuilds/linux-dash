<?php
    // First try to get the IPs using "ip"
    // First get list of links
    $command='ip -oneline link show | awk \'{print $2}\' | sed "s/://"';
    exec($command,$result,$error);
    if ( $error ) { // It didn't work with "ip" , so we do it with ifconfig
	exec('/sbin/ifconfig |grep -B1 "inet addr" |awk \''.
	    '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:",$1 } }\' |awk'.
	    ' -F: \'{ print $1","$3 }\'',$result);
    }else{
	$result = implode(' ',$result);
	// Now use that list to get the ip-adresses
	$command = 'for interface in '.$result.';do for family in inet inet6;do ip -oneline -family $family addr show $interface | grep -v fe80 | awk \'{print $2","$4}\';done;done';
        exec($command,$result,$return_value);
    }
    // Get external adress
    exec('curl http://ipecho.net/plain; echo',$result2);
    // Create JSON header
    header('Content-Type: application/json; charset=UTF-8');
    // Return info as JSON
    echo '[[','"external ip","',$result2[0],'"]';
    $x = 0;
    $max = count($result)-1;
    foreach ($result as $a)
    {   echo ',';
        echo json_encode( explode(',',$result[$x]) );
        //echo ($x==$max)?'':',';
        unset($result[$x],$a);
        $x++;
    }
    echo ']';

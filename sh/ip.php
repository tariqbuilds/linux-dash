<?php  
    exec('/sbin/ifconfig |grep -B1 "inet addr" |awk \''.
         '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:",$1 } }\' |awk'.
         ' -F: \'{ print $1","$3 }\'',$result);
    
    exec('curl http://ipecho.net/plain; echo',$result2);
    
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
    //echo json_encode($r);
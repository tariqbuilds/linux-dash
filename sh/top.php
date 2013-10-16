<?php
    // Execute top command on server
    // Store the result in $result (1 line = 1 array element)
    exec('/usr/bin/top -b -n1|awk \'{print $2}\'', $result);
    
    /*
    // Extract the headers from resultset
    // Elements that contain non-empty values: 2,3,9,11,13,15,17,18,20,21,25,27
    $a = explode(" ",$result[6]);
    
    $b = array(  $a[2],$a[3],$a[9],$a[11],$a[13],$a[15],$a[17],$a[18],$a[20],$a[21],$a[25],$a[27] );
    
    echo json_encode($b);
    echo "\n";    
    // remove unnecessary variables
    unset($a,$b,$result[0],$result[1],$result[2],$result[3],$result[4],$result[5],$result[6]);
    
    */
    
    $final = '[';
    
    // Extract the first row of results
    // Elements that contain non-empty values: 4,5,11,14,15,16,17,18,21,23, 26,27
    
    $start_from = 7;
    $a = explode(" ",$result[7]);
    if ( $a[2]==NULL && $a[3]==NULL  ){
        $b = array(  $a[4],$a[5],$a[11],$a[14],$a[15],$a[16],$a[17],$a[18],$a[21],$a[23],$a[26],$a[27] );
        
        //echo json_encode($b);
        //echo "\n";
        $start_from = 8;
        $final.= json_encode($b);
    }    
    else{
        $final.= json_encode(array());
    }
    // remove unnecessary variables
    unset($a,$b);
    
    // Extract all remaining rows of results
    for( $x=$start_from; $x< count($result); $x++ )
    {   
        //print_r( explode(" ",$result[$x]) );
        $a = explode(" ",$result[$x]);
        
        $b = array( $a[2],$a[3],$a[9],$a[12],$a[13],$a[14],$a[15],$a[16],$a[19],$a[21],$a[24],$a[25]);
        $final.= ','.json_encode($b);
       
        //echo json_encode($b);
        //echo "\n";
        
        // remove unneceassary variables
        unset($a,$b);
    }
    
    $final .= ']';  
    
    echo($final);  
  
  
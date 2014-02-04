<?php 

    exec('/usr/bin/awk -F: \'{ if ($3<=499) print "system,"$1","$6; else print "user,"$1","$6; }\' < /etc/passwd',$result);
    
    header('Content-Type: application/json; charset=UTF-8');
    echo "[";
    $x = 0;
    $max = count($result)-1;
    foreach ($result as $a)
    {   
        $x++; 
        $line = explode(',', $a);
        if($line[1][0] == '#') continue;
        echo json_encode( $line );
        echo ($x-1==$max)?'':',';
    }
    echo ']';

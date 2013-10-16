<?php 

    exec('awk -F: \'{ if ($3<=499) print "system,"$1","$6; else print "user,"$1","$6; }\' < /etc/passwd',$result);
    
    echo "[";
    $x = 0;
    $max = count($result)-1;
    foreach ($result as $a)
    {    
        echo json_encode( explode(',',$result[$x]) );
        echo ($x==$max)?'':',';
        unset($result[$x],$a);
        $x++;
    }
    echo ']';
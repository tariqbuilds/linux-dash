<?php 

    exec('df -h|awk \'{print $1","$2","$3","$4","$5","$6}\'',$result);
    
    echo "[";
    $x = 0;
    $max = count($result)-1;
    foreach ($result as $a)
    {    
        if ($x==0){ $x++; continue;}
        echo json_encode( explode(',',$result[$x]) );
        echo ($x==$max)?'':',';
        unset($result[$x],$a);
        $x++;
    }
    echo ']';
<?php
    // Execute top command on server to get results of ps aux
    // each row (including header) is in csv format
    exec('ps aux|awk '."'NR>1{print ".'$1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11'."}'", $result);
    
    header('Content-Type: application/json; charset=UTF-8');

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

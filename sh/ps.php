<?php
    // Execute top command on server to get results of ps aux
    // each row (including header) is in csv format
    exec('ps -aux|awk '."'{print ".'$1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11'."}'", $result);
    
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
<?php 

    //exec('cat /proc/meminfo|awk \'{print $1","$2}\'',$result);
    //exec('free -m|awk \'{print $1","$2","$3","$4}\'',$result);
    exec('free -tmo|awk \'{print $1","$2","$3","$4}\'',$result);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode( explode(',',$result[1]) );
?>
<?php 

    session_start();
    if(!isset($_SESSION['user']))
        exit();

    //exec('cat /proc/meminfo|awk \'{print $1","$2}\'',$result);
    //exec('free -m|awk \'{print $1","$2","$3","$4}\'',$result);
    exec('free -tmo|awk \'{print $1","$2","$3","$4}\'',$result);
    echo json_encode( explode(',',$result[1]) );

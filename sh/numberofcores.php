<?php 

    exec('/bin/grep -c ^processor /proc/cpuinfo',$result);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode( $result[0] );
    

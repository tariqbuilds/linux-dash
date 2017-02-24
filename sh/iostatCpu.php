<?php
    // Execute top command on server to get results of ps aux
    // each row (including header) is in csv format
    exec('iostat|awk \'{print $1","$2","$3","$4","$5","$6","$7}\'', $result);
    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode( explode(',',$result[3]) );

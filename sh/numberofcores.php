<?php 
    // Initialize cores to 0
    $numOfCores = 0;

    // get value via /proc/cpuinfo
    $numOfCores = shell_exec('/bin/grep -c ^processor /proc/cpuinfo');
    $numOfCores = $numOfCores[0];

    // If number of cores is not found, run fallback
    if( $numOfCores == 0 ){

       // run nproc fallback command
       $numOfCores = shell_exec('nproc');
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode( $numOfCores );
    

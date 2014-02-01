<?php 
    
    exec('grep -c ^processor /proc/cpuinfo',$resultNumberOfCores);
    header('Content-Type: application/json; charset=UTF-8');
    $numberOfCores = $resultNumberOfCores[0];

    exec('cat /proc/loadavg | awk \'{print $1","$2","$3}\'',$resultLoadAvg);
    header('Content-Type: application/json; charset=UTF-8');

    $loadAvg = explode(',',$resultLoadAvg[0]);

    echo json_encode(
        array_map(
            "convertToPercentage",
            $loadAvg,
            array_fill(0, count($loadAvg), $numberOfCores)
        )
    );
    
    function convertToPercentage($value, $numberOfCores){
        return array($value, (int)($value * 100 / $numberOfCores));
    }

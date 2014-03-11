<?php
header('Content-Type: application/json; charset=UTF-8');
require_once '../inc/load_parameters.php';

if ($param["enabled"]) {
    $hosts = $param["ping_website"];
    $pingCount = $param["ping_count"];

    echo "[";
    $max = count($hosts);
    for ($i = 0; $i < $max; $i++) {
        $result = array();
        exec(
            "/bin/ping -qc {$pingCount} {$hosts[$i]} |" .
            " awk -F/ '/^rtt/ { print $5 }'",
            $result
        );
        echo json_encode(array($hosts[$i], $result[0]));
        echo ($i + 1 == $max) ? '' : ',';
    }
    echo "]";
}

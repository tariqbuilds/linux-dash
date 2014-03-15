<?php
header('Content-Type: application/json; charset=UTF-8');
require_once '../inc/load_parameters.php';

if ($param["isEnabled"]) {
    echo "[";
    $max = count($param["hosts"]);
    for ($i = 0; $i < $max; $i++) {
        $result = array();
        exec(
            "/bin/ping -qc {$param["pingCount"]} {$param["hosts"][$i]} |" .
            " awk -F/ '/^rtt/ { print $5 }'",
            $result
        );
        echo json_encode(array($param["hosts"][$i], $result[0]));
        echo ($i + 1 == $max) ? '' : ',';
    }
    echo "]";
}

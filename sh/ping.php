<?php
header('Content-Type: application/json; charset=UTF-8');
require_once '../inc/load_parameters.php';

$hosts = $parameters["ping_website"];
$pingCount = $parameters["ping_count"];

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

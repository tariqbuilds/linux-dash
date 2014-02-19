<?php
header('Content-Type: application/json; charset=UTF-8');

// Read list of hosts to ping from csv file ping_hosts
if (file_exists("ping_hosts")) {
    $hosts = file('ping_hosts', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
} else {
    $hosts = array("gnu.org", "github.com", "wikipedia.org");
}

$pingCount = 2;

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

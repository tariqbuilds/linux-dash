<?php

require_once '../inc/load_parameters.php';

if ($param["enabled"]) {

    $binaries = $param["binaries"];

    putenv('PATH=/usr/local/sbin:/usr/sbin:/sbin:' . getenv('PATH'));
    $data = array();
    foreach ($binaries as $b) {
        $which = array();
        exec('command -v ' . escapeshellarg($b), $which, $return_var);
        $data[] = array($b, $return_var ? "Not Installed" : $which[0]);
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
}

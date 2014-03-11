<?php
require_once '../inc/load_parameters.php';

if ($param["enabled"]) {
    $totalSeconds = shell_exec("/usr/bin/cut -d. -f1 /proc/uptime");
    $totalMin   = $totalSeconds / 60;
    $totalHours = $totalMin / 60;

    $days  = floor($totalHours / 24);
    $hours = floor($totalHours - ($days * 24));
    $min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));

    $formatUptime = '';
    if ($days != 0) {
        $formatUptime .= "$days $param[days] ";
    }

    if ($hours != 0) {
        $formatUptime .= "$hours $param[hours] ";
    }

    if ($min != 0) {
        $formatUptime .= "$min $param[minutes]";
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($formatUptime);
}

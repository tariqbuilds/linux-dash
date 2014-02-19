<?php

    $tx_path = 'cat /sys/class/net/eth0/statistics/tx_bytes';
    $rx_path = 'cat /sys/class/net/eth0/statistics/rx_bytes';

    $tx_start = shell_exec($tx_path);
    $rx_start = shell_exec($rx_path);

    sleep(2);

    $tx_end = shell_exec($tx_path);
    $rx_end = shell_exec($rx_path);

    $result['tx'] = ($tx_end - $tx_start)/2;
    $result['rx'] = ($rx_end - $rx_start)/2;

    echo json_encode($result);

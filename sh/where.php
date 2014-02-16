<?php

    // Read list of programs to check from a list
    if (file_exists("monitor"))
    {
        $data = file_get_contents("monitor");
        $binaries = explode(" ", $data);
    }
    // If file doesn't exist then use hard coded list
    else
    {
        $binaries = explode(" ", "php node mysql vim python ruby java apache2 nginx openssl vsftpd make");
    }

    $data = array();
    foreach($binaries as $b)
    { 
        $which = array();
        exec('command -v ' . escapeshellarg($b), $which, $return_var);
        $data[] = array($b, $return_var ? "Not Installed" : $which[0]);
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);

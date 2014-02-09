<?php 

    $binaries = explode(" ", "php node mysql vim python ruby java apache2 nginx openssl vsftpd make");

    header('Content-Type: application/json; charset=UTF-8');

    $data = array();
    foreach($binaries as $b)
    { 
        $which = array();
        exec('/usr/bin/which ' . escapeshellarg($b), $which, $return_var);
        $data[] = array($b, $return_var ? "Not Installed" : $which[0]);
    }
    
    echo json_encode($data);

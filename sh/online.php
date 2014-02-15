<?php 

    // change username column length for w command
    putenv("PROCPS_USERLEN=20");
    exec('PROCPS_FROMLEN=40 /usr/bin/w -h | /usr/bin/awk \'{print $1","$3","$4","$5}\'',$users);
    $result = array();
    foreach ($users as $user)
    {
        $result[] = explode(",", $user);
    }

    echo json_encode($result);

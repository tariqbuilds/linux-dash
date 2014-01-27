<?php 

    exec('w -h | awk \'{print " "$1","$3","$4","$5}\'',$users);
    $result = array();
    foreach ($users as $user)
    {
        $result[] = explode(",", $user);
    }
    echo json_encode($result);
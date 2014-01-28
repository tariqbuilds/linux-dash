<?php

    session_start();
    if(!isset($_SESSION['user']))
        exit();

    echo (int) (shell_exec('cat /proc/uptime')/(60*60));

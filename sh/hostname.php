<?php
    session_start();
    if(!isset($_SESSION['user']))
        exit();

    echo shell_exec('hostname');

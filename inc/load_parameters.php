<?php

/**
 * Load user parameters if they exists. If not, load default value
 *
 * @return param
 */
function load_parameters()
{
    $pathDefault = "../config/default/";
    $pathUser = "../config/user/";
    $fileName = basename($_SERVER['SCRIPT_FILENAME']);
    $param = array();

    if (file_exists($pathUser.$fileName)) {
        require_once $pathUser.$fileName;
    } else {
        require_once $pathDefault.$fileName;
    }

    return $param;
}

$param = load_parameters();

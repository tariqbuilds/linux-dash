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
    $fileName = basename($_SERVER['SCRIPT_FILENAME'], '.php').".ini";

    // load user or defaut paremeters for the widget
    if (!$param = parse_ini_file($pathUser.$fileName)) {
        $param = parse_ini_file($pathDefault.$fileName);
    }

    return $param;
}

$param = load_parameters();

<?php

/**
 * Load user parameters if they exists. If not, load default value
 *
 * @return parameters
 */
function load_parameters()
{
    $pathDefault = "../config/default/";
    $pathUser = "../config/user/";
    $fileName = basename($_SERVER['SCRIPT_FILENAME'], '.php').".ini";

    if (!$parameters = parse_ini_file($pathUser.$fileName)) {
        $parameters = parse_ini_file($pathDefault.$fileName);
    }

    return $parameters;
}

$parameters = load_parameters();

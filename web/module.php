<?php
const MODULE_PREFIX = '\\LinuxDash\\Modules\\';

if (file_exists(__DIR__ . "/../vendor/autoload.php")) {
    // dependencies were installed via composer - this is the main project

    /** @var \Composer\Autoload\ClassLoader $composer */
    $composer = require __DIR__ . "/../vendor/autoload.php";
} else {
    throw new \Exception('Can\'t find autoload.php. Did you install dependencies via composer?');
}

/**
 * If running on the terminal or via a script take the module name
 * from the passed in arguments. Otherwise, take it from the HTTP request
 */
if (php_sapi_name() === 'cli') {
    $requested_module = isset($argv[1]) ? $argv[1] : false;
} else {
    $requested_module = isset($_GET['module']) ? $_GET['module'] : false;
}


// The default JSON object to return
$return = array(
    'module' => $requested_module,
    'data' => false,
    'error' => false,
);

// Path to class module like \LinuxDash\Module\test-module
$moduleRequestedClassPath = MODULE_PREFIX . $requested_module;

try {
    if (empty($requested_module) || !class_exists($moduleRequestedClassPath)) {
        throw new Exception('module_not_found');
    }

    /** @var \LinuxDash\Ld\Modules\Module $module */
    $module = new $moduleRequestedClassPath();

    $return['data'] = $module->getData($_GET);
    unset($return['error']);

} catch (Exception $e) {

    unset($return['data']);
    $return['error'] = $e->getMessage();
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($return);

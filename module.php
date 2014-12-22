<?php


    require 'libs/autoloader.php';

    $available_modules = array(
        'bandwidth',
        'disk_partitions',
        'dhcpleases',
        'hostname',
        'ip',
        'issue',
        'recent_account_logins',
        'loadavg',
        'current_ram',
        'memcached',
        'network_connections',
        'numberofcores',
        'logged_in_accounts',
        'phpinfo',
        'ping',
        'ram_intensive_processes',
        'cpu_intensive_processes',
        'sabnzbd',
        'internet_speed',
        'swap',
        'time',
        'uptime',
        'users',
        'common_applications',
		'arp_cache_table',
        'redis_status',
        'memory_info',
        'cpu_info',
		'io_stats',
    );


    /**
     * Populate a module loader with our enabled modules
     */
    $mods = new \ld\Modules\Loader;
    $mods->defaultNamespace('\\Modules');

    foreach($available_modules as $module) {
        $mods->addModule($module);
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
        'data'   => false,
        'error'  => false,
    );


    try {
        if (!$requested_module || !$mods->moduleAvailable($requested_module)) {
            throw new Exception('module_not_found');
        }

        $module = $mods->module($requested_module);

        if (!$module) {
            throw new Exception('error_loading_module');
        }

        $return['data'] = $module->getData($_GET);
        unset($return['error']);

    } catch (Exception $e) {

        unset($return['data']);
        $return['error'] = $e->getMessage();
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return);

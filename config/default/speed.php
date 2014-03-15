<?php

$param["isEnabled"] = true;

$param["downloadChosenHost"] = 1;
$param["uploadChosenHost"] = 0;

$param["hosts"] = array(
    /*
     * A /dev/null type service to POST blobs which will discard data after reading is recommended.
     * If you know of such service please let me know.
     * This one here has some very cool features. Visit the site for more options like custom server status_code response etc.
     * Change or remove resource query string dir=... if you do not wont your request logged.
     */
    'upload' => array(
        0 => array(
            'hostname' => 'posttestserver.com',
            'resource' => '/post.php?dir=linuxdash',
            'size' => 1, //MB
            'timeout' => 30,
        ),
    ),
    // A big(~10MB) CDN hosted( e.g CloudFlare ) blob would be preferable for high availability and consistent performance.
    'download' => array(
        0 => array(
            /* IPv4 & IPv6 Port: 80, 81, 8080 IPv6 */
            'hostname' => 'download.thinkbroadband.com',
            'resource' => '/10MB.zip',
            'size' => 10, //MB
            'timeout' => 30,
        ),
        1 => array(
            'hostname' => 'cachefly.cachefly.net',
            'resource' => '/10mb.test',
            'size' => 10, //MB
            'timeout' => 30,
        ),
        2 => array(
            /* Download 10MB file from Seattle */
            'hostname' => 'speedtest.sea01.softlayer.com',
            'resource' => '/downloads/test10.zip',
            'size' => 10, //MB
            'timeout' => 30,
        ),
        3 => array(
            /* 50 MB */
            'hostname' => 'download.thinkbroadband.com',
            'resource' => '/50MB.zip',
            'size' => 50, //MB
            'timeout' => 120,
        ),
    ),
);

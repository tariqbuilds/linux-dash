<?php

define('MB', 1000000);

/*
 * This array exist just to give some choice and flexibility to the user.
 * A big(~10MB) CDN hosted( e.g CloudFlare ) blob would be preferable for high availability and consistent performance.
 */
$hosts = array(
    0 => array(
        /* IPv4 & IPv6 Port: 80, 81, 8080 IPv6 */
        'hostname' => 'download.thinkbroadband.com',
        'resource' => '/10MB.zip',
        'size' => 10, //MB
        'timeout' => 30,
    ),
    1 => array(
        'hostname' => '',
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
);

$chosenHost = 1;
$hostname = $hosts[$chosenHost]['hostname'];
$resource = $hosts[$chosenHost]['resource'];
$size = $hosts[$chosenHost]['size'] * MB;
$timeout = $hosts[$chosenHost]['timeout'];
$port = 80;

$out = "GET {$resource} HTTP/1.1\r\n";
$out .= "Host: {$hostname}\r\n";
$out .= "Connection: Close\r\n\r\n";
$chunkSize = 1024;

$end = null;
$speed = 0;
$start = microtime(true);

$fp = fsockopen($hostname, $port, $errno, $errstr, $timeout);
if (!$fp) {
    echo "$errstr ($errno)<br />\n";
} else {
    fwrite($fp, $out);
    while (!feof($fp)) {
        fread($fp, $chunkSize);
    }
    $end = microtime(true);
    fclose($fp);

    $time = $end - $start;
    if ($time) {
        $speed = ($size / $time);
    }
}

echo json_encode($speed);


<?php

$HOST = "http://localhost:8080";
$API = getenv("SABNZBD_API");
$URL = $HOST."/sabnzbd/api?mode=qstatus&output=json&apikey=".$API;

$json = file_get_contents($URL,0,null,null);
$json_output = json_decode($json);
$speedDownstream = preg_replace("/[^\.0-9]+/", "", $json_output->{'speed'});
$speedDownstream = $speedDownstream * 1024;
$speed = array(
    'downstream' => (string) $speedDownstream,
);

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($speed);

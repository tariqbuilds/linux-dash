<?php

const MB = 0;
const KB = 1;

$target = 'http://afaq.dreamhosters.com/10MB.zip';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, $timeout = 10);

curl_exec($ch);
$speed = curl_getinfo($ch, CURLINFO_SPEED_DOWNLOAD);

echo json_encode($speed);
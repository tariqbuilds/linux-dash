<?php

const MB = 0;
const KB = 1;

$target = 'http://speedtest.pixelwolf.ch/one.gigabyte';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, $timeout = 10);

curl_exec($ch);
$speed = curl_getinfo($ch, CURLINFO_SPEED_DOWNLOAD);

$as = isset($_GET['as']) ? (int) $_GET['as'] : MB;

$as == KB 
  ? printf("%0.2f\n", ($speed / 1024))
  : printf("%.1f\n", (($speed * 8) / 1024) / 1024);
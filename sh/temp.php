<?php

header('Content-Type: application/json; charset=UTF-8'); 
echo json_encode(round(exec("cat /sys/class/thermal/thermal_zone0/temp ") / 1000, 1)." °C");
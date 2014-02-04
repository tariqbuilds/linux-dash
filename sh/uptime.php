<?php

header('Content-Type: application/json; charset=UTF-8'); 
echo json_encode((int) (shell_exec('/bin/cat /proc/uptime')/(60*60)));

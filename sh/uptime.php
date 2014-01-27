<?php

header('Content-Type: application/json; charset=UTF-8'); 
echo (int) (shell_exec('cat /proc/uptime')/(60*60));

?>
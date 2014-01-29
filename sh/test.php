<pre><?php 

$milli = shell_exec('awk \'{print $1*1000}\' /proc/uptime');

header('Content-Type: application/json; charset=UTF-8');

echo (int)($milli)/(1000*60*60);
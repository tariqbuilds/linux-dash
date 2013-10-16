<pre><?php 

$milli = shell_exec('awk \'{print $1*1000}\' /proc/uptime');

echo (int)($milli)/(1000*60*60);
<?php 

// Cross server type functionality - MacOSX, Linux (all flavors, etc...)
$time = shell_exec('uptime | awk \'{print $3*24 " " $5}' | tr ':,' ' ' | awk '{print ($1+$2 " Hours " $3 " Minutes")\'');

echo $time;

/**
 * End of file test.php
 * Location: ./sh/test.php
 */
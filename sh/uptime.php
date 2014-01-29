<?php

/**
 * var $uptime set to hours via the uptime command.  `uptime` is available in all *nix based OS' including MacOSX.
 * Utilizing `uptime` versus `/proc/uptime` allows for MacOSX and multiple flavored linux servers to react in the same way.
 * 
 * formerly: echo (int) (shell_exec('cat /proc/uptime')/(60*60));
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

$uptime = shell_exec ( 'uptime | awk \'{print $3*24 " " $5}\' | tr ":," " " | awk \'{print ($1+$2+($3/60))}\'' );

echo $uptime;

/**
 * End of file uptime.php
 * Location: ./sh/uptime.php
 */
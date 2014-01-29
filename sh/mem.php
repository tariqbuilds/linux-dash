<?php

/**
 * Determins which operating system the server is running and attempts to gather memory information -
 * 		-total ram, free ram, and used ram
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

$type = shell_exec ( '/sbin/sysctl -a | grep "ostype = " | awk \'{print $3}\' | tr -d "\n"' );

if ( $type == "Darwin" )
{
	exec ( '(echo "total,used,free") && (/sbin/sysctl -a | grep "memsize = " | awk \'{print "Mem:," $3/1024/1024 ","}\' | tr -d "\n") && (top -a -n1 -l1 | grep PhysMem | awk \'{print ($2+$4) "," $6}\' | tr -d \'\(M\')', $results );
}
else if ( $type == "Linux" )
{
	exec ( 'free -tmo | awk \'{print $1 "," $2 "," $3 "," $4}\'', $results );
}

$jData = json_encode ( explode ( ',', $results [ 1 ] ) );

echo $jData;

/**
 * End of file mem.php
 * Location: ./sh/mem.php
 */
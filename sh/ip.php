<?php
/**
 * Returns all IP addresses assigned to server.
 *
 * This file was modified to work cross-platform for *nix and MacOSX servers.  Original -
 * exec ( '/sbin/ifconfig |grep -B1 "inet addr" |awk \'' . '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:",$1 } }\' | awk' . ' -F: \'{ print $1","$3 }\'', $result);
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

// $type = shell_exec ( 'sysctl -a | grep "ostype = " | awk \'{print $3}\' | tr -d "\n"' );

// if ( $type == "Darwin" )
// {
// 	exec ( 'ifconfig | grep "inet " | awk \'{print $1","$2}\' | tr -d "addr:"', $iResults );
// }
// else if ( $type == "Linux" )
// {
// 	exec ( '/sbin/ifconfig |grep -B1 "inet addr" |awk \'' . '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:",$1 } }\' | awk' . ' -F: \'{ print $1","$3 }\'', $iResult);
// }

exec ( '/sbin/ifconfig | grep "inet " | awk \'{print $1","$2}\' | tr -d "addr:"', $iResults );
exec ( 'curl http://ipecho.net/plain; echo', $eResults );

$jData	= '[["external ip","' . $eResults [ 0 ] . '"]';

$x		= 0;
$max	= count ( $iResults ) - 1;

foreach ( $iResults as $result )
{
	$jData .= ',';
	$jData .= json_encode ( explode ( ',', $iResults [ $x ] ) );
	
	unset ( $iResults [ $x ], $result );
	$x ++;
}

$jData .= ']';

echo $jData;

/**
 * End of file ip.php
 * Location: ./sh/ip.php
 */
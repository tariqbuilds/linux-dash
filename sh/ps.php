<?php

/**
 * Parses through active processes and return them in a json array
 *
 * Modified from exec('ps -aux|awk '."'{print ".'$1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11'."}'", $results);
 * in order to make the system call cross-platform compatible with *nix systems and MacOSX
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

exec ( 'ps aux | awk \'{print $1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11}\'', $results );

$jData	= "[";
$x		= 0;
$max	= count ( $results ) - 1;

foreach ( $results as $result )
{
	$jData .= json_encode ( explode(',',$results[$x]) );
	$jData .= ( $x == $max ) ? '' : ',';

	unset ( $results [ $x ], $result );
	$x++;
}

$jData .= ']';

echo $jData;

/**
 * End of file ps.php
 * Location: ./sh/ps.php
 */
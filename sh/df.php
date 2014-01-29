<?php 
/**
 * Gathers all disk information & partition details and returns the json data
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */
exec ( 'df -h | awk \'{print $1","$2","$3","$4","$5","$6}\'', $results );

$jData	= "[";
$x		= 0;
$max	= count ( $results ) - 1;

foreach ( $results as $result )
{
	if ( $x == 0 )
	{
		$x ++;
		continue;
	}

	$jData .= json_encode ( explode ( ',', $results [ $x ] ) );
    $jData .= ( $x == $max ) ? '' : ',';

    unset ( $results [ $x ], $result );

    $x ++;
}

$jData .= ']';

echo $jData;

/**
 * End of file df.php
 * Location: ./sh/df.php
 */
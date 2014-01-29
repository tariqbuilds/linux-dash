<?php 
/**
 * For Darwin based OS' use line 6, for *nix systems, use line 5.
 *
 * @author Josh Morningstar <rebl00ded@gmail.com>
 */

// exec ( 'awk -F: \'{ if ($3<=499) print "system,"$1","$6; else print "user,"$1","$6; }\' < /etc/passwd', $result);
exec ( 'awk -F: \'NR>10{ if ($3<=499) print "system,"$1","$6; else print "user,"$1","$6; }\' < /etc/passwd', $result );

$jData	= "[";
$x		= 0;
$max	= count ( $result ) -1;

foreach ( $result as $a )
{
	$jData .= json_encode ( explode ( ',', $result [ $x ] ) );

	$jData .= ( $x == $max ) ? '' : ',';

	unset ( $result [ $x ], $a );

	$x ++;
}

$jData .= ']';

echo $jData;

/**
 * End of file users.php
 * Location: ./sh/users.php
 */
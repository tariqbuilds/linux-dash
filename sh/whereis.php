<?php 

/**
 * Returns the path data for php, mysql, mysqld, python, vim, ruby, make, apache (2), nginx, openssl, vsftpd
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

exec('which php mysql vim python ruby java apache2 nginx openssl vsftpd make'. '|awk \'{ split($1, a, ":");if (length($2)==0) print a[1]",Not Installed"; else print a[1]","$2;}\'', $resultss );
    
    
$jData	= "[";
$x		= 0;
$max	= count ( $results ) - 1;

foreach ( $results as $result )
{    
	$jData .= json_encode ( explode ( ',', $results [ $x ] ) );
	$jData .= ( $x == $max ) ? '' : ',';

	unset ( $results [ $x ], $result );

	$x ++;
}

$jData .= ']';

echo $jData;

/**
 * End of file whereis.php
 * Location ./sh/whereis.php
 */
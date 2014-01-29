<?php
/**
 * Executes the top command on the server and returns the headers from the results
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

exec ( '/usr/bin/top -b -n1 | awk \'{print $2}\'', $results );
    
$jData = '[';

$start_from	= 7;
$args		= explode(" ",$results[7]);

if ( $args [ 2 ] == NULL && $args [ 3 ] == NULL )
{
	$b = array (
		$args [ 4 ],
		$args [ 5 ],
		$args [ 11 ],
		$args [ 14 ],
		$args [ 15 ],
		$args [ 16 ],
		$args [ 17 ],
		$args [ 18 ],
		$args [ 21 ],
		$args [ 23 ],
		$args [ 26 ],
		$args [ 27 ]
	);
    
	$start_from	= 8;
	$jData		.= json_encode ( $b );
}
else
{
	$jData.= json_encode ( array () );
}

unset ( $args, $b );

// Extract all remaining rows of results
// 
for( $x = $start_from; $x < count ( $results ); $x ++ )
{
	$args = explode ( " ", $results [ $x ] );
        
	$b = array (
		$args [ 2 ],
		$args [ 3 ],
		$args [ 9 ],
		$args [ 12 ],
		$args [ 13 ],
		$args [ 14 ],
		$args [ 15 ],
		$args [ 16 ],
		$args [ 19 ],
		$args [ 21 ],
		$args [ 24 ],
		$args [ 25 ]
	);

	$jData .= ',' . json_encode ( $b );

	unset ( $args, $b );
}
    
$jData .= ']';  
    
echo $jData;  
  
/**
 * End of file top.php
 * Location: ./sh/top.php
 */
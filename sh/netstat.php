<?php 
    exec('netstat -tnap', $result);

    header('Content-Type: application/json; charset=UTF-8');
    echo "[";
    $max = count($result);
    for ($i = 2; $i < $max; $i++) {
    	$exploded = preg_split('@\s+@', $result[$i], NULL, PREG_SPLIT_NO_EMPTY);
    	echo json_encode( $exploded );
    	echo ($i + 1 == $max)?'':',';
	}
	echo "]";
<?php 

/*
    exec('/bin/df -h|awk \'{print $1","$2","$3","$4","$5","$6}\'',$result);
    header('Content-Type: application/json; charset=UTF-8');

    echo "[";
    $x = 0;
    $max = count($result)-1;
    foreach ($result as $a)
    {    
        if ($x==0){ $x++; continue;}
        echo json_encode( explode(',',$result[$x]) );
        echo ($x==$max)?'':',';
        unset($result[$x],$a);
        $x++;
    }
    echo ']';
*/





    // get the contents of the lease file
    //
    $data = file_get_contents("/var/lib/misc/dnsmasq.leases");

    // separate it into lines
    //
    $data = explode("\n", $data);

    // strip any blank lines
    //
    $data = array_filter($data, function($v){ return $v; });

    // build the results
    //
    $results = array();

    // step through the data
    //
    foreach( $data as $l )
    {
        $l = explode(" ", $l);
        unset($l[4]);
	$results[] = $l;
    }

    // output the results
    //
    echo json_encode($results);


/*
array_walk($data, function(&$v, $i){ $v = explode(" ", $v); });
usort($data, function($a, $b){
	$x = explode('.', $a[2]);
	$y = explode('.', $b[2]);
	return $x[3]<$y[3] ? -1 : 1;
});


<table>

	<thead>
		<tr>
			<th>Expiration</th>
			<th>MAC Address</th>
			<th>IP Address</th>
			<th>Host</th>
		</tr>
	</thead>

	<tbody>
<?php
foreach($data as $d) {
?>
		<tr>
			<td><?php echo date("Y-m-d H:i:s", $d[0]); ?></td>
			<td><?php echo $d[1]; ?></td>
			<td><?php echo $d[2]; ?></td>
			<td><?php echo $d[3]; ?></td>
		</tr>
<?php
}
?>
	</tbody>

</table>


*/

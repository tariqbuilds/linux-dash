<?php

    // define the path to the DNSMasq Lease file
    $dnsmasq_lease_file = "/var/lib/misc/dnsmasq.leases";

  // check if DNS MASQ file exists
  if (file_exists($dnsmasq_lease_file) ){

    // get the contents of the lease file
    $data = file_get_contents($dnsmasq_lease_file);

    // separate it into lines
    $data = explode("\n", $data);

    // strip any blank lines
    $data = array_filter($data, function($v){ return $v; });

    // build the results
    $results = array();

    // step through the data
    foreach( $data as $l )
    {
        // explode each line of the data
        $l = explode(" ", $l);

        // remove the last field (I don't know what it is - for most of the
        // lines it's simply "*", in other cases it's the host MAC address)
        unset($l[4]);

        // convert the timestamp to a readable date/time
        $l[0] = date("m/j/Y H:i:s", $l[0]);

        // add the line to the results
        $results[] = $l;
    } // END foreach
 } 
 // if DNS MASQ file does NOT exist
 else{
   $results = array();
}
    // output the results
    echo json_encode($results);


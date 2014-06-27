<?php

    namespace Modules;

    class dhcpleases extends \ld\Modules\Module {
        protected $name = 'dhcpleases';

        public function getData($args=array()) {

            // define the path to the DNSMasq Lease file
            $dnsmasq_lease_file = "/var/lib/misc/dnsmasq.leases";

            // build the results
            $results = array();

            // check if DNS MASQ file exists
            if (file_exists($dnsmasq_lease_file)) {

                // get the contents of the lease file
                $data = file_get_contents($dnsmasq_lease_file);

                // separate it into lines
                $data = explode("\n", $data);

                // strip any blank lines
                $data = array_filter($data, function ($v) {
                    return $v;
                });

                // step through the data
                foreach ($data as $l) {
                    // explode each line of the data
                    $l = explode(" ", $l);

                    // remove the last field (I don't know what it is - for most of the
                    // lines it's simply "*", in other cases it's the host MAC address)
                    unset($l[4]);

                    // convert the timestamp to a readable date/time
                    $l[0] = date("m/j/Y H:i:s", $l[0]);

                    // add the line to the results
                    $results[] = $l;
                }
            } else {

                $dhcp_file = "/var/lib/dhcp/dhcpd.leases";

            if ( file_exists($dhcp_file) ) {

                $fh = fopen($dhcp_file,"r");

                while ($dat=fgets($fh)) {
                    if (preg_match("/lease.+{/",$dat)) {
                        $active=false;
                        $ip = preg_split("/ /",$dat);$ip=$ip[1];
                        $expires = '';
                        $dat=fgets($fh);
                        while (!preg_match("/hardware ethernet/",$dat) && !preg_match("/ends/",$dat)) {
                            $dat=fgets($fh);
                        }
                        if (preg_match("/ends/",$dat)) {
                           $expires = preg_replace("/.*ends\\s+\\d+\\s+(.+);.*/", '\1', $dat);
                           $ts = strtotime($expires);
                           $expires = date("m/j/Y H:i:s", $ts);
                        }
                        $dat=fgets($fh);
                        while (!preg_match("/hardware ethernet/",$dat)) {
                            if (preg_match("/binding state active/",$dat)) {
                                $active=true;
                            }
                            $dat=fgets($fh);
                        }
                        $mac = preg_split("/ |;/",$dat); $mac=$mac[4];
                        $host = '';
                        $dat=fgets($fh);
                        while (trim($dat) != "}" && !preg_match("/client-hostname/",$dat)) {
                            $dat=fgets($fh);
                        }
                        if (preg_match("/client-hostname/",$dat)) {
                           $host = preg_replace("/.*\"(.+)\".*/", '\1', $dat);
                        }

                        if ($active) {
                            $results[$ip] = array($expires, $mac, $ip, $host);
                        }
                    }
                }
                sort($results);
                $results = array_values($results);
            } else {
             $results = array();
            }
            }

            // output the results
            return $results;

        }
    }
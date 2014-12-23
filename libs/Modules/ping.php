<?php

    namespace Modules;

    class ping extends \ld\Modules\Module {
        protected $name = 'ping';

        public function getData($args=array()) {

            // Read list of hosts to ping from csv file ping_hosts
            if (file_exists("ping_hosts")) {
                $hosts = file('ping_hosts', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            } else {
                $hosts = array("gnu.org", "github.com", "wikipedia.org");
            }

            $pingCount = 2;
            $data = array();
            $max = count($hosts);

            for ($i = 0; $i < $max; $i++) {
                $result = array();
                exec(
                    "/bin/ping -qc {$pingCount} {$hosts[$i]} |" .
                    " awk -F/ '/^rtt/ { print $5 }'",
                    $result
                );
                
		if (empty($result[0])) {
			// Empty, so maybe it's an IPv6-only host, so run ping6
			exec(
				"/bin/ping6 -qc {$pingCount} {$hosts[$i]} |" .
				" awk -F/ '/^rtt/ { print $5 }'",
				$result
			);
		} // if

                $pingTime = (empty($result[0]))? 'could not reach host': $result[0] . ' ms';
                
                $data[] = array( 
                    'host' => $hosts[$i], 
                    'ping' => $pingTime
                );
            }

            return $data;
        }
    }

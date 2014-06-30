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
                $data[] = array($hosts[$i], $result[0]);
            }

            return $data;
        }
    }
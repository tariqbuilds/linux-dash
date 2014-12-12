<?php

    namespace Modules;

    class bandwidth extends \ld\Modules\Module {
        protected $name = 'bandwidth';

        public function getData($args=array()) {
            $interface_path = 'ls /sys/class/net';

            $interfaces = explode("\n", shell_exec($interface_path));
            array_pop($interfaces);
            $key = array_search("lo", $interfaces);
            unset($interfaces[$key]);

            $results = array();

            sleep(5);

            foreach ($interfaces as $interface) {

                $tx_path = "cat /sys/class/net/{$interface}/statistics/tx_bytes";
                $rx_path = "cat /sys/class/net/{$interface}/statistics/rx_bytes";

                $tx_start = intval(shell_exec($tx_path));
                $rx_start = intval(shell_exec($rx_path));

                sleep(2);

                $tx_end = intval(shell_exec($tx_path));
                $rx_end = intval(shell_exec($rx_path));
	
		        $result = array();
                $result['interface'] = $interface;
                $result['tx'] = ($tx_end - $tx_start);
                $result['rx'] = ($rx_end - $rx_start);

                $results[] = $result;
            }

            return $results;
        }
    }

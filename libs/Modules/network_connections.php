<?php

    namespace Modules;

    class network_connections extends \ld\Modules\Module {
        
        protected $name = 'network_connections';

        public function getData($args=array()) {
            /* this section finds command paths from OS */
            $netstat = exec("command -v netstat");
            $awk = exec("command -v awk");
            $sort = exec("command -v sort");
            $uniq = exec("command -v uniq");

            /* execute command */
            exec("$netstat -ntu | $awk 'NR>2 {print $5}' | $sort | $uniq -c", $result);

            $data = array();
            $max = count($result);

            for ($i = 0; $i < $max; $i++) {
                
                $temp_connections = explode( ' ', trim($result[$i]) );

                $temp_ip_and_port = explode( ':', $temp_connections[1] );

                $data[] = array( 
                    'Connections' => $temp_connections[0], 
                    'IP' => $temp_ip_and_port[0],
                    'Port' => $temp_ip_and_port[1],
                );
            }

            return $data;
        }
    }
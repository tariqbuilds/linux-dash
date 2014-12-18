<?php
    namespace Modules;

    class arp_cache_table extends \ld\Modules\Module {

        protected $name = 'arp_cache_table';

        public function getData($args=array()) {

    	    exec('if [ -e /usr/sbin/arp ] ; then /usr/sbin/arp ; else /sbin/arp ; fi | awk \'BEGIN {OFS=","} {print $1,$2,$3,$4,$5}\'', $result);

    	    $data = array();
            $max = count($result);

    	    for ($x = 1; $x < $max; $x++) {
                
                $temp = explode(',', $result[$x]);

                $data[] = array(
                    'Address' => $temp[0],
                    'HWType' => $temp[1],
                    'HWAddress' => $temp[2],
                    'Flags' => $temp[3],
                    'Iface' => $temp[4]
                );

                unset($result[$x], $a);
            }

            return $data;
        }
    }

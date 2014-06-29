<?php
    namespace Modules;

    class arp extends \ld\Modules\Module {

        protected $name = 'arp';

        public function getData($args=array()) {

	    exec('if [ -e /usr/sbin/arp ] ; then /usr/sbin/arp ; else /sbin/arp ; fi | awk \'BEGIN {OFS=","} {print $1,$2,$3,$4,$5}\'', $result);

	    $data = array();
	    $x = 0;

	    foreach ($result as $a) {
                if ($x==0) {
                    $x++;
                    continue;
                }
                $data[] = explode(',', $result[$x]);

                unset($result[$x], $a);
                $x++;
            }

            return $data;
        }
    }

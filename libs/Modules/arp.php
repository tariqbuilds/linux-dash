<?php
    namespace Modules;

    class arp extends \ld\Modules\Module {

        protected $name = 'arp';

        public function getData($args=array()) {

	    exec('/usr/sbin/arp | awk \'BEGIN {OFS=","} {print $1,$2,$3,$4,$5}\'', $result);

	    $data = [];

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

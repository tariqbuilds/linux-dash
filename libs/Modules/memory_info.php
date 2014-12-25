<?php

    namespace Modules;

    class memory_info extends \ld\Modules\Module {
        protected $name = 'memory_info';
        protected $raw_output = true;

        public function getData($args=array()) {
			$data = array();
			
			exec(
                "/bin/cat /proc/meminfo",
                $result
            );
			
            if (!$result) {
                $result = array();
            }
            
			foreach ($result as $a) {
				$p = explode(':', $a);

                if(substr($p[1], -2) === 'kB') {
                    $number = intval(substr($p[1], 0, -2));
                    $number_formatted = number_format($number);
                    $number_formatted_with_units = (string)$number_formatted . ' kB'; 
                    $p[1] = $number_formatted_with_units;
                }

				$data[$p[0]] = $p[1];
            }
			
			return $data;
        }
    }
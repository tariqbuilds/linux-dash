<?php

    namespace Modules;

    class cpu_info extends \ld\Modules\Module {
        protected $name = 'cpu_info';
        protected $raw_output = true;

        public function getData($args=array()) {
			$data = array();
			
			exec(
                "/usr/bin/lscpu",
                $result
            );
			
            $result = array_filter($result);

			foreach ($result as $a) {
				$p = explode(':', $a);

                $data[$p[0]] = $p[1];
            }
			
			return $data;
        }
    }
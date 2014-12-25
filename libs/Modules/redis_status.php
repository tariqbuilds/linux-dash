<?php

    namespace Modules;

    class redis_status extends \ld\Modules\Module {
        protected $name = 'Redis Info';
        protected $raw_output = true;

        public function getData($args=array()) {
			$data = array();
			
			exec(
                "redis-cli INFO | grep 'redis_version\|connected_clients\|connected_slaves\|used_memory_human\|total_connections_received\|total_commands_processed'",
                $result
            );
			
            if (!$result) {
                $result = array();
            }
            
			foreach ($result as $a) {
				$p = explode(':', $a);
				$data[$p[0]] = $p[1];
            }
			
			return $data;
        }
    }
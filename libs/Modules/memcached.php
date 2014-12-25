<?php

    namespace Modules;

    class memcached extends \ld\Modules\Module {
        protected $name = 'memcached';

        public function getData($args=array()) {
            $data = array();

            exec(
                'echo "stats" | nc -w 1 127.0.0.1 11211 | awk \'BEGIN {}/bytes/{line[j++] = $2 ":" $3 }END{ for(i=0;i<j;i++) print line[i]; }\'',
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
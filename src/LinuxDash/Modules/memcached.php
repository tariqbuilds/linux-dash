<?php

    namespace Modules;

    class memcached extends \ld\Modules\Module {
        protected $name = 'memcached';

        public function getData($args=array()) {
            exec(
                'echo "stats" | nc -w 1 127.0.0.1 11211 | awk \'BEGIN {}/bytes/{line[j++] = $2 ":" $3 }END{ for(i=0;i<j;i++) print line[i]; }\'',
                $result
            );

            return $result;
        }
    }
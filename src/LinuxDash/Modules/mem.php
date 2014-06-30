<?php

    namespace Modules;

    class mem extends \ld\Modules\Module {
        protected $name = 'mem';

        public function getData($args=array()) {
            exec(
                '/usr/bin/free -tmo | /usr/bin/awk \'BEGIN {OFS=","} {print $1,$2,$3-$6-$7,$4+$6+$7}\'',
                $result
            );

            return explode(',', $result[1]);
        }
    }
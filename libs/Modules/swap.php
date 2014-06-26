<?php

    namespace Modules;

    class swap extends \ld\Modules\Module {
        protected $name = 'swap';

        public function getData($args=array()) {

            exec(
                '/bin/cat /proc/swaps | /usr/bin/tail -n +2 | '.
                '/usr/bin/awk \'{print $1","$2","$3","$4","$5}\'',
                $result
            );

            $data = array();

            $x = 0;
            foreach ($result as $a) {
                $x++;
                $data[] = explode(',', $a);

            }

            return $data;
        }
    }
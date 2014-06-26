<?php

    namespace Modules;

    class ps extends \ld\Modules\Module {
        protected $name = 'ps';

        public function getData($args=array()) {

            // Execute top command on server to get results of ps aux
            // each row (including header) is in csv format
            exec(
                '/bin/ps aux | /usr/bin/awk ' .
                "'NR>1{print ".'$1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11'."}'",
                $result
            );

            $data = array();

            $x = 0;
            foreach ($result as $a) {
                $data[] = explode(',', $result[$x]);

                unset($result[$x],$a);
                $x++;
            }

            return $data;
        }
    }
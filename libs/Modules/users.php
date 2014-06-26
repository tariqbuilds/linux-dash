<?php

    namespace Modules;

    class users extends \ld\Modules\Module {
        protected $name = 'users';

        public function getData($args=array()) {

            exec(
                '/usr/bin/awk -F: \'{ if ($3<=499) print "system,"$1","$6;' .
                ' else print "user,"$1","$6; }\' < /etc/passwd',
                $result
            );

            $data = array();

            $x = 0;
            foreach ($result as $a) {
                $x++;
                $line = explode(',', $a);
                if ($line[1][0] == '#') {
                    continue;
                }
                $data[] = $line;

            }

            return $data;
        }
    }
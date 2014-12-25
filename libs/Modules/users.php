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

            if (!$result) {

                exec(
                    'getent passwd | /usr/bin/awk -F: \'{ if ($3<=499) print "system,"$1","$6;' .
                    ' else print "user,"$1","$6; }\'',
                    $result
                );
                
            }

            if (!$result) {
                $result = array();
            }
            
            $data = array();

            $x = 0;
            foreach ($result as $a) {
                $temp = explode(',', $result[$x]);
                
                $data[] = array(
                    'type' => $temp[0],
                    'user' => $temp[1],
                    'home' => $temp[2],
                );

                unset($result[$x],$a);
                $x++;
            }

            return $data;
        }
    }
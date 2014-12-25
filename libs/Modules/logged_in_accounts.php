<?php

    namespace Modules;

    class logged_in_accounts extends \ld\Modules\Module {
        protected $name = 'logged_in_accounts';

        public function getData($args=array()) {
	       
            // change username column length for w command
            putenv("PROCPS_USERLEN=20");

            exec(
                'PROCPS_FROMLEN=40 /usr/bin/w -h |' .
                ' /usr/bin/awk \'{print $1","$3","$4","$5}\'',
                $result
            );

            if (!$result) {
                $result = array();
            }
            
            $data = array();

            $x = 0;
            foreach ($result as $a) {
                $temp = explode(',', $result[$x]);

                $data[] = array(
                    'user' => $temp[0],
                    'from' => $temp[1],
                    'last_login' => $temp[2],
                    'idle' => $temp[3],
                );

                unset($result[$x],$a);
                $x++;
            }

            return $data;
        }
    }

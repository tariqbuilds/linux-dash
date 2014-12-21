<?php

    namespace Modules;

    class recent_account_logins extends \ld\Modules\Module {
        protected $name = 'recent_account_logins';

        public function getData($args=array()) {

            exec(
                '/usr/bin/lastlog --time 365 |' .
                ' /usr/bin/awk \'{print $1","$3","$4" "$5" "$6" "$7" "$8}\'',
                $data
            );
            
            $result = array();

            $x = 0;
            foreach ($result as $a) {
                $temp = explode(',', $result[$x]);

                $data[] = array(
                    'user' => $temp[0],
                    'from' => $temp[1],
                    'when' => date('Y-m-d H:i:s', strtotime($row[2])),
                );

                unset($result[$x],$a);
                $x++;
            }

            return $data;
        }
    }
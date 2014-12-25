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

            if (!$result) {
                $result = array();
            }
            
            $x = 0;
            foreach ($result as $a) {
                $temp = explode(',', $result[$x]);
                
                $data[] = array(
                    'filename' => $temp[0],
                    'type' => $temp[1],
                    'size' => $temp[2],
                    'used' => $temp[3],
                    'priority' => $temp[4],
                );

                unset($result[$x],$a);
                $x++;
            }

            array_shift($data); // remove header row
            return $data;
        }
    }
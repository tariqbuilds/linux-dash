<?php

    namespace Modules;

    class io_stats extends \ld\Modules\Module {
        protected $name = 'io_stats';
        protected $raw_output = true;

        /////////////////////////////////////////////////////////////
        // https://www.kernel.org/doc/Documentation/iostats.txt
        ////////////////////////////////////////////////////////////

        public function getData($args=array()) {
			$data = array();
            $result = array();

			exec(
                '/bin/cat /proc/diskstats | '.
                '/usr/bin/awk \'{print $1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11","$12","$13","$14}\'',
                $result
            );
			
            if (!$result) {
                $result = array();
            }
            
            $x = 0;
            foreach($result as $a) {

                $temp = explode(",", $a);
                
                if (
                     $temp[3] == '0' && $temp[7] == '0' &&
                     $temp[11] == '0' && $temp[12] == '0'
                    )
                {
                    continue;
                }

                $data[] = array ( 
                    'device'    => $temp[2],    
                    'reads'       => number_format($temp[3]),    
                    // 'read_merges'    => $temp[4],
                    // 'read_sectors'   => $temp[5],
                    // 'read_ticks'     => $temp[6],
                    'writes'      => number_format($temp[7]),
                    // 'write_merges'   => $temp[8],
                    // 'write_sectors'  => $temp[9],
                    // 'write_ticks'    => $temp[10],
                    'in_progress'      => number_format($temp[11]),
                    'time_in_io'       => number_format($temp[12]) . 'ms',
                    // 'time_in_io'  => $temp[13],
                );

                unset($result[$x], $a, $temp);
            }


            return $data;
        }
    }
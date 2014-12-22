<?php

    namespace Modules;

    class io_stats extends \ld\Modules\Module {
        protected $name = 'io_stats';
        protected $raw_output = true;

        /////////////////////////////////////////////////////////////
        // https://www.kernel.org/doc/Documentation/block/stat.txt //
        // 
        // read I/Os       requests      number of read I/Os processed
        // read merges     requests      number of read I/Os merged with in-queue I/O
        // read sectors    sectors       number of sectors read
        // read ticks      milliseconds  total wait time for read requests
        // write I/Os      requests      number of write I/Os processed
        // write merges    requests      number of write I/Os merged with in-queue I/O
        // write sectors   sectors       number of sectors written
        // write ticks     milliseconds  total wait time for write requests
        // in_flight       requests      number of I/Os currently in flight
        // io_ticks        milliseconds  total time this block device has been active
        // time_in_queue   milliseconds  total wait time for all requests
        /////////////////////////////////////////////////////////////

        public function getData($args=array()) {
			$data = array();
            $result = array();

			exec(
                '/bin/cat /sys/block/sda/stat | '.
                '/usr/bin/awk \'{print $1","$2","$3","$4","$5","$6","$7","$8","$9","$10","$11}\'',
                $result
            );
			
            $temp = explode(",", $result[0]);
            
            $data['read_ios']       = $temp[0];
            $data['read_merges']    = $temp[1];
            $data['read_sectors']   = $temp[2];
            $data['read_ticks']     = $temp[3];
            $data['write_ios']      = $temp[4];
            $data['write_merges']   = $temp[5];
            $data['write_sectors']  = $temp[6];
            $data['write_ticks']    = $temp[7];
            $data['in_flight']      = $temp[8];
            $data['io_ticks']       = $temp[9];
            $data['time_in_queue']  = $temp[10];

            return $data;
        }
    }
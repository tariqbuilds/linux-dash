<?php

    namespace Modules;

    class recent_account_logins extends \ld\Modules\Module {
        protected $name = 'recent_account_logins';

        public function getData($args=array()) {

            exec(
                '/usr/bin/lastlog --time 365 |' .
                ' /usr/bin/awk \'{print $1","$3","$4" "$5" "$6" "$7" "$8}\'',
                $users
            );
            
            $result = array();
            $row = array();

            # ignore the first line of column names
            for ($i = 1; $i < count($users); ++$i) {
                $row = explode(",", $users[$i]);
                $row[2] = strtotime($row[2]);
                $row[2] = date('Y-m-d H:i:s',$row[2]);
                $result[$i-1] = $row;                       
            }


            return $result;
        }
    }
<?php

    namespace Modules;

    class lastlog extends \ld\Modules\Module {
        protected $name = 'lastlog';

        public function getData($args=array()) {

            exec(
                '/usr/bin/lastlog --time 365 |' .
                ' /usr/bin/awk \'{print $1","$3","$4" "$5" "$6" "$7" "$8}\'',
                $users
            );
            $result = array();
            # ignore the first line of column names
            for ($i = 1; $i < count($users); ++$i) {
                $result[$i-1] = explode(",", $users[$i]);
            }

            return $result;
        }
    }
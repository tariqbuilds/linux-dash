<?php

    namespace Modules;

    class online extends \ld\Modules\Module {
        protected $name = 'online';

        public function getData($args=array()) {
	    $users = array();

            // change username column length for w command
            putenv("PROCPS_USERLEN=20");

            exec(
                'PROCPS_FROMLEN=40 /usr/bin/w -h |' .
                ' /usr/bin/awk \'{print $1","$3","$4","$5}\'',
                $users
            );

            $result = array();

            foreach ($users as $user) {
                $result[] = explode(",", $user);
            }

            return $result;
        }
    }

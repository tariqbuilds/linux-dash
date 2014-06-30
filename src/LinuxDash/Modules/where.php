<?php

    namespace Modules;

    class where extends \ld\Modules\Module {
        protected $name = 'where';

        public function getData($args=array()) {

            // Read list of programs to check from a list
            if (file_exists("monitor"))
            {
                $data = file_get_contents("monitor");
                $binaries = preg_split('~ ~', $data, NULL, PREG_SPLIT_NO_EMPTY);
            }
            // If file doesn't exist then use hard coded list
            else
            {
                $binaries = explode(" ", "php node mysql mongo vim python ruby java apache2 nginx openssl vsftpd make");
            }

            $path = 'PATH=/usr/local/sbin:/usr/sbin:/sbin:/usr/local/bin:/usr/bin:/bin:' . getenv('PATH');

            $data = array();
            foreach ($binaries as $b) {
                $which = array();
                exec($path . ' command -v ' . escapeshellarg($b), $which, $return_var);
                $data[] = array($b, $return_var ? "Not Installed" : $which[0]);
            }

            return $data;
        }
    }

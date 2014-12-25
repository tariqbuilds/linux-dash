<?php

    namespace Modules;

    class sabnzbd extends \ld\Modules\Module {
        protected $name = 'sabnzbd';

        public function getData($args=array()) {

            $HOST = "http://localhost:8080";
            $API = getenv("SABNZBD_API");
            $URL = $HOST."/sabnzbd/api?mode=qstatus&output=json&apikey=".$API;

            @$json = file_get_contents($URL);
            
            if(!$json) return array( 'Downstream' => '-' );
            
            $json_output = json_decode($json);
            $speedDownstream = preg_replace("/[^\.0-9]+/", "", $json_output->{'speed'});
            $speedDownstream = $speedDownstream * 1024;
            $speed = (string) $speedDownstream;

            return array( 'Downstream' => $speed );
        }
    }

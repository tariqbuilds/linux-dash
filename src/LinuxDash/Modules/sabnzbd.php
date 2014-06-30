<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class sabnzbd extends Module
{
    protected $name = 'sabnzbd';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        $HOST = "http://localhost:8080";
        $API = getenv("SABNZBD_API");
        $URL = $HOST . "/sabnzbd/api?mode=qstatus&output=json&apikey=" . $API;

        $json = file_get_contents($URL);
        $json_output = json_decode($json);
        $speedDownstream = preg_replace("/[^\.0-9]+/", "", $json_output->{'speed'});
        $speedDownstream = $speedDownstream * 1024;
        $speed = array(
            'downstream' => (string)$speedDownstream,
        );

        return $speed;
    }
}

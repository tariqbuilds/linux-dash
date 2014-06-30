<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class loadavg extends Module
{
    protected $name = 'loadavg';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {

        exec('/bin/grep -c ^processor /proc/cpuinfo', $resultNumberOfCores);
        $numberOfCores = $resultNumberOfCores[0];

        exec(
            '/bin/cat /proc/loadavg | /usr/bin/awk \'{print $1","$2","$3}\'',
            $resultLoadAvg
        );
        $loadAvg = explode(',', $resultLoadAvg[0]);

        $data = array_map(
            function ($value, $numberOfCores) {
                return array($value, (int)($value * 100 / $numberOfCores));
            },
            $loadAvg,
            array_fill(0, count($loadAvg), $numberOfCores)
        );

        return $data;
    }
}
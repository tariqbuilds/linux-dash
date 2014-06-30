<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class df extends Module
{
    protected $name = 'df';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {

        exec('/bin/df -Ph | awk \'BEGIN {OFS=","} {print $1,$2,$3,$4,$5,$6}\'', $result);

        $data = array();

        $x = 0;
        foreach ($result as $a) {
            if ($x == 0) {
                $x++;
                continue;
            }
            $data[] = explode(',', $result[$x]);

            unset($result[$x], $a);
            $x++;
        }

        return $data;
    }
}
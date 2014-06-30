<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class arp extends Module
{
    protected $name = 'arp';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        exec(
            'if [ -e /usr/sbin/arp ] ; then /usr/sbin/arp ; else /sbin/arp ; fi | awk \'BEGIN {OFS=","} {print $1,$2,$3,$4,$5}\'',
            $result
        );

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

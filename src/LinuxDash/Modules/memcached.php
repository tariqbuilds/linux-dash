<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class memcached extends Module
{
    protected $name = 'memcached';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        exec(
            'echo "stats" | nc -w 1 127.0.0.1 11211 | awk \'BEGIN {}/bytes/{line[j++] = $2 ":" $3 }END{ for(i=0;i<j;i++) print line[i]; }\'',
            $result
        );

        return $result;
    }
}
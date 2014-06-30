<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class issue extends Module
{
    protected $name = 'issue';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        return shell_exec('/usr/bin/lsb_release -ds;/bin/uname -r');
    }
}

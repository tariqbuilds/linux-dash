<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class time extends Module
{
    protected $name = 'time';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        return shell_exec('/bin/date');
    }
}
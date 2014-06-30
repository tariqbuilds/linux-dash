<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class hostname extends Module
{
    protected $name = 'hostname';

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        return php_uname('n');
    }
}

?>

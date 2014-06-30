<?php

namespace LinuxDash\Modules;

use LinuxDash\ld\Modules\Module;

class phpinfo extends Module
{
    protected $name = 'phpinfo';
    protected $raw_output = true;

    /**
     * {@inheritdoc}
     */
    public function getData($args = array())
    {
        if (isset($args["what"])) {
            phpinfo((int)$args["what"]);
        } else {
            phpinfo();
        }
    }
}
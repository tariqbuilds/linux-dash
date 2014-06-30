<?php

namespace LinuxDash\ld\Modules;

abstract class Module
{
    protected $name = '';

    /**
     * @param array $args
     *
     * @return array
     */
    abstract public function getData($args = array());
}
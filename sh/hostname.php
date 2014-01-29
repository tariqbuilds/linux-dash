<?php

/**
 * Gathers the hostname and returns it for the panel display
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

$hostname = shell_exec ( 'hostname' );

echo $hostname;

/**
 * End of file hostname.php
 * Location ./sh/hostname.php
 */
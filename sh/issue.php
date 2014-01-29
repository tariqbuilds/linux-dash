<?php

/**
 * Returns the output of the OS version that is running
 *
 * Changed from echo shell_exec('cat /etc/issue'); due to cross-platform issues on MacOSX & Centos 6.0+
 *
 * @author afaqurk <https://github.com/afaqurk>
 * @author Josh Morningstar <rebl00ded@gmail.com>
 *
 * @package Linux Dashboard
 */

$uname = shell_exec ( 'uname -a' );

echo $uname;

/**
 * End of file issue.php
 * Location ./sh/issue.php
 */
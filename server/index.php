<?php
	$modules_dir = 'modules/shell_files/';
	$module = escapeshellcmd($_GET['module']);

	echo shell_exec( $modules_dir . $module . '.sh' );
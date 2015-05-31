<?php
	header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Pragma: no-cache");

	$modules_dir = 'modules/shell_files/';
	$module = escapeshellcmd($_GET['module']);

	echo shell_exec( $modules_dir . $module . '.sh' );
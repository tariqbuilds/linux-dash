<?php
	
	$modules_dir = './vendor/linux-dash/core-modules/shell_files/';
	$module = $_GET['module'];

	echo shell_exec( $modules_dir . $module . '.sh' );
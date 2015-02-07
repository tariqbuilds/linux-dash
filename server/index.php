<?php
	$modules_dir = 'modules/shell_files/';
	$module = $_GET['module'];

	echo shell_exec( $modules_dir . $module . '.sh' );
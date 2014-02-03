<?php 
header('Content-Type: application/json; charset=UTF-8');
echo json_encode(shell_exec('/usr/bin/lsb_release -ds;/bin/uname -r')) ;

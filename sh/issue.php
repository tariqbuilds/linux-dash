<?php 

header('Content-Type: application/json; charset=UTF-8');
echo shell_exec('cat /etc/issue') ;

?>
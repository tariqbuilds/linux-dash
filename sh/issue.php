<?php 
header('Content-Type: application/json; charset=UTF-8');
echo shell_exec('lsb_release -ds;uname -r') ;
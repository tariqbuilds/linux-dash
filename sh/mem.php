<?php 

    //exec('cat /proc/meminfo|awk \'{print $1","$2}\'',$result);
    //exec('free -m|awk \'{print $1","$2","$3","$4}\'',$result);

    exec('/usr/bin/free -tmo | /usr/bin/awk \'{print $1","$2","$3-$6-$7","$4+$6+$7}\'',$result);
    header('Content-Type: application/json; charset=UTF-8');
	echo json_encode( explode(',',$result[1]) );
	

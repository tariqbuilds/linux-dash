<?php

    namespace Modules;

    class current_ram extends \ld\Modules\Module {
        protected $name = 'current_ram';

	public function getData($args=array()) {
	    exec('/usr/bin/free -V | /usr/bin/grep procps-ng', $ng);
	    if (empty($ng)) {
	    	exec('/usr/bin/free -tmo | /usr/bin/awk \'BEGIN {OFS=","} {print $1,$2,$3-$6-$7,$4+$6+$7}\'', $result);

	    }
	    else {
            	exec('/usr/bin/free -tm | /usr/bin/awk \'BEGIN {OFS=","} {print $1,$2,$3+$6,$4}\'', $result);
	    }
            return explode(',', $result[1]);
        }
    }

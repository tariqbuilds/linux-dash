<?php

    namespace Modules;

    class uptime extends \ld\Modules\Module {
        protected $name = 'uptime';

        public function getData($args=array()) {

            $totalSeconds = shell_exec("/usr/bin/cut -d. -f1 /proc/uptime");
            $totalMin   = $totalSeconds / 60;
            $totalHours = $totalMin / 60;

            $days  = floor($totalHours / 24);
            $hours = floor($totalHours - ($days * 24));
            $min   = floor($totalMin - ($days * 60 * 24) - ($hours * 60));

            $formatUptime = '';
            if ($days != 0) {
                $formatUptime .= "$days days ";
            }

            if ($hours != 0) {
                $formatUptime .= "$hours hours ";
            }

            if ($min != 0) {
                $formatUptime .= "$min minutes";
            }

            return $formatUptime;
        }
    }
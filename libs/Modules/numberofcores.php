<?php

    namespace Modules;

    class numberofcores extends \ld\Modules\Module {
        protected $name = 'numberofcores';

        public function getData($args=array()) {

            $intOpts = array(
                'options' => array(
                    'min_range' => 1,
                ),
            );

            // get value via /proc/cpuinfo
            $numOfCores = shell_exec('LC_ALL=C /bin/grep -c ^processor /proc/cpuinfo');
            $numOfCores = filter_var(
                $numOfCores,
                FILTER_VALIDATE_INT,
                $intOpts
            );

            // If number of cores is not found, run fallback
            if ($numOfCores === false) {
                $numOfCores = filter_var(
                    shell_exec('/usr/bin/nproc'),
                    FILTER_VALIDATE_INT,
                    $intOpts
                );
            }

            if ($numOfCores === false) {
                $numOfCores = 'unknown';
            }

            return $numOfCores;
        }
    }

<?php

    namespace Modules;

    class time extends \ld\Modules\Module {
        protected $name = 'time';

        public function getData($args=array()) {
            return array(
            	'Server Time' => shell_exec('/bin/date')
            );
        }
    }
<?php

    namespace Modules;

    class phpinfo extends \ld\Modules\Module {
        protected $name = 'phpinfo';
        protected $raw_output = true;

        public function getData($args=array()) {

            if(isset($args["what"])){
                phpinfo((int)$args["what"]);
            }
            else{
                phpinfo();
            }
        }
    }
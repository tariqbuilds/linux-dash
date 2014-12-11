<?php

    namespace Modules;

    class ram_intensive_processes extends \ld\Modules\Module {
        protected $name = 'ram_intensive_processes';

        public function getData($args=array()) {
            exec(
                '/bin/ps axo pid,user,comm,pmem,rss,vsz --sort -pmem,-rss,-vsz | head -n 15 | /usr/bin/awk ' .
                    "'{print ". 
                    '$1","$2","$3","$4","$5","$6}'. 
                    "'",
                $result
            );

            $data = array();

            $x = 1;
            foreach ($result as $a) {
                $data[] = explode(',', $result[$x]);

                unset($result[$x],$a);
                $x++;
            }

            return $data;
        }
    }
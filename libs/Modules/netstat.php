<?php

    namespace Modules;

    class netstat extends \ld\Modules\Module {
        protected $name = 'netstat';

        public function getData($args=array()) {
            /* this section finds command paths from OS */
            $netstat = exec("command -v netstat");
            $awk = exec("command -v awk");
            $sort = exec("command -v sort");
            $uniq = exec("command -v uniq");

            /* execute command */
            exec("$netstat -ntu | $awk 'NR>2 {sub(/:[^:]+$/, \"\"); print $5}' | $sort | $uniq -c", $result);


            $data = array();

            $max = count($result);
            for ($i = 0; $i < $max; $i++) {
                $data[] = preg_split(
                    '@\s+@',
                    $result[$i],
                    null,
                    PREG_SPLIT_NO_EMPTY
                );
            }

            return $data;
        }
    }
<?php

    namespace Modules;

    class varnish_status extends \ld\Modules\Module {
        protected $name = 'Varnish Info';
        protected $raw_output = true;

        public function getData($args=array()) {
			$data = array();

            $vs = new \VarnishStat;

            try {
                $result = $vs->getSnapshot();

                // compute some values
                $data = array(
                    'client_conn'   => $result['client_conn'],
                    'client_req'    => $result['client_req'],
                    'cache_hit'     => $result['cache_hit'],
                    'cache_miss'    => $result['cache_miss'],
                    'n_wrk'         => $result['n_wrk'],
                    'n_backend'     => $result['n_backend'],
                    's_sess'        => $result['s_sess'],

                );
                $data['total_caches'] = $data['cache_hit'] + $data['cache_miss'];
               $data['cache_hit_rate'] = round($data['cache_hit'] / $data['total_caches'] * 100, 2);
                $data['cache_miss_rate'] = round($data['cache_miss'] / $data['total_caches'] * 100, 2);

            } catch (VarnishException $e) {
                $data = array();
            }

			return $data;
        }
    }

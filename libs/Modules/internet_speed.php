<?php

    namespace Modules;

    class internet_speed extends \ld\Modules\Module {
        protected $name = 'internet_speed';

        public function prettifyNumber($number) {

            $mb = $number/1048576;

            $newNumber = number_format($mb, 3);

            $numberWithUnits = strval($newNumber) . ' MB';

            return $numberWithUnits;
        }

        public function getData($args=array()) {

            $mb = 1000000;

            /*
             * Configure download & upload hosts.
             * This array exist just to give some choice and flexibility to the user.
             */
            $hosts = array(
                /*
                 * A /dev/null type service to POST blobs which will discard data after reading is recommended.
                 * If you know of such service please let me know.
                 * This one here has some very cool features. Visit the site for more options like custom server status_code response etc.
                 * Change or remove resource query string dir=... if you do not wont your request logged.
                 */
                'upload' => array(
                    0 => array(
                        'hostname' => 'posttestserver.com',
                        'resource' => '/post.php?dir=linuxdash',
                        'size' => 1, //MB
                        'timeout' => 30,
                    ),
                ),
                // A big(~10MB) CDN hosted( e.g CloudFlare ) blob would be preferable for high availability and consistent performance.
                'download' => array(
                    0 => array(
                        /* IPv4 & IPv6 Port: 80, 81, 8080 IPv6 */
                        'hostname' => 'download.thinkbroadband.com',
                        'resource' => '/10MB.zip',
                        'size' => 5, //MB
                        'timeout' => 30,
                    ),
                    1 => array(
                        'hostname' => 'cachefly.cachefly.net',
                        'resource' => '/5mb.test',
                        'size' => 5, //MB
                        'timeout' => 30,
                    ),
                    2 => array(
                        /* Download 5MB file from Seattle */
                        'hostname' => 'speedtest.sea01.softlayer.com',
                        'resource' => '/downloads/test5.zip',
                        'size' => 5, //MB
                        'timeout' => 30,
                    ),
                    3 => array(
                        /* 50 MB */
                        'hostname' => 'download.thinkbroadband.com',
                        'resource' => '/10MB.zip',
                        'size' => 10, //MB
                        'timeout' => 120,
                    ),
                ),
            );

            $dChosenHost = 1;
            $dHostname = $hosts['download'][$dChosenHost]['hostname'];
            $dResource = $hosts['download'][$dChosenHost]['resource'];
            $dTimeout = $hosts['download'][$dChosenHost]['timeout'];
            $dPort = 80;

            $outDownload = "GET {$dResource} HTTP/1.1\r\n";
            $outDownload .= "Host: {$dHostname}\r\n";
            $outDownload .= "Connection: Close\r\n\r\n";
            $chunkSize = 1024;

            $speedDownstream = 0;
	        $speedUpstream = 0;

            $strFile = '';
            $realDownloadSize = 0;
            $startDownload = microtime(true);

            /*timeout here only applies while connecting the socket*/
            $fpDownload = fsockopen($dHostname, $dPort, $errno, $errstr, $dTimeout);
            if (!$fpDownload) {
                echo "$errstr ($errno)<br />\n";
            } else {
                fwrite($fpDownload, $outDownload);
                /* timeout here applies for reading/writing data over the socket */
                stream_set_timeout($fpDownload, $dTimeout);
                while (!feof($fpDownload)) {
                    $strFile .= fread($fpDownload, $chunkSize);
                }
                $endDownload = microtime(true);
                fclose($fpDownload);
                /*
                 * $realDownloadSize is calculated to make sure we are estimating the speed on the real download size.
                 * If the connection goes down before completing the download we will still be able to calculate the speed
                 * correctly based on the partial download.
                 * There is some confusion between MB and MiB too. Many blobs declared as x MB seems to be x MiB.
                 */
                $realDownloadSize = strlen($strFile);
                $timeDownload = $endDownload - $startDownload;
                if ($timeDownload) {
                    $speedDownstream = ($realDownloadSize / $timeDownload);
                    $speedDownstream = $this->prettifyNumber($speedDownstream);
                }
            }

            // Proceed to upload only if we actually have something to do upload
            if ($realDownloadSize) {

                $uChosenHost = 0;
                $uHostname = $hosts['upload'][$uChosenHost]['hostname'];
                $uResource = $hosts['upload'][$uChosenHost]['resource'];
                $uSize = $hosts['upload'][$uChosenHost]['size'] * $mb;
                $uTimeout = $hosts['upload'][$uChosenHost]['timeout'];
                $uPort = 80;

                $outUpload = "POST {$uResource} HTTP/1.1\r\n";
                $outUpload .= "Host: {$uHostname}\r\n";
                $outUpload .= "Content-type: application/x-www-form-urlencoded\r\n";
                $outUpload .= "Content-length: " . $realDownloadSize . "\r\n";
                $outUpload .= "Accept: */*\r\n\r\n";
                $data = urlencode($strFile);

                $startUpload = microtime(true);

                $fpUpload = fsockopen($uHostname, $uPort, $errno, $errstr, $uTimeout);
                if (!$fpUpload) {
                    echo "$errstr ($errno)<br />\n";
		            $speedUpstream = "n/a";
                } else {
                    fwrite($fpUpload, $outUpload);
                    stream_set_timeout($fpUpload, $uTimeout);
                    $writeSize = fwrite($fpUpload, $data, $uSize);

                    if ($writeSize) {
                        $endUpload = microtime(true);
                        fclose($fpUpload);

                        $timeUpload = $endUpload - $startUpload;
                        if ($timeUpload) {
                            $speedUpstream = ($writeSize / $timeUpload);
                        }

                    }
                    $speedUpstream = $this->prettifyNumber($speedUpstream);
                }
            }

            $speed = array(
                'Upload' => $speedUpstream,
                'Download' => $speedDownstream,
            );

            return $speed;
        }
    }

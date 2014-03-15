<?php

require_once '../inc/load_parameters.php';

if ($param["isEnabled"]) {

    $mb = 1000000;

    $dHostname = $param["hosts"]["download"][$param["downloadChosenHost"]]['hostname'];
    $dResource = $param["hosts"]["download"][$param["downloadChosenHost"]]['resource'];
    $dSize = $param["hosts"]["download"][$param["downloadChosenHost"]]['size'] * $mb;
    $dTimeout = $param["hosts"]["download"][$param["downloadChosenHost"]]['timeout'];
    $dPort = 80;

    $outDownload = "GET {$dResource} HTTP/1.1\r\n";
    $outDownload .= "Host: {$dHostname}\r\n";
    $outDownload .= "Connection: Close\r\n\r\n";
    $chunkSize = 1024;

    $endDownload = null;
    $speedDownstream = 0;

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
        }
    }

    // Proceed to upload only if we actually have something to do upload
    if ($realDownloadSize) {
        $uHostname = $param["hosts"]['upload'][$param["uploadChosenHost"]]['hostname'];
        $uResource = $param["hosts"]['upload'][$param["uploadChosenHost"]]['resource'];
        $uSize = $param["hosts"]['upload'][$param["uploadChosenHost"]]['size'] * $mb;
        $uTimeout = $param["hosts"]['upload'][$param["uploadChosenHost"]]['timeout'];
        $uPort = 80;

        $outUpload = "POST {$uResource} HTTP/1.1\r\n";
        $outUpload .= "Host: {$uHostname}\r\n";
        $outUpload .= "Content-type: application/x-www-form-urlencoded\r\n";
        $outUpload .= "Content-length: " . $realDownloadSize . "\r\n";
        $outUpload .= "Accept: */*\r\n\r\n";
        $data = urlencode($strFile);

        $endUpload = null;
        $speedUpstream = 0;

        $startUpload = microtime(true);

        $fpUpload = fsockopen($uHostname, $uPort, $errno, $errstr, $uTimeout);
        if (!$fpUpload) {
            echo "$errstr ($errno)<br />\n";
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
        }
    }

    $speed = array(
        'upstream' => $speedUpstream,
        'downstream' => $speedDownstream,
    );

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($speed);
}

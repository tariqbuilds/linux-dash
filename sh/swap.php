<?php

exec(
    '/bin/cat /proc/swaps | /usr/bin/tail -n +2 | '.
    '/usr/bin/awk \'{print $1","$2","$3","$4","$5}\'',
    $result
);

header('Content-Type: application/json; charset=UTF-8');
echo "[";
$x = 0;
$max = count($result) - 1;
foreach ($result as $a) {
    $x++;
    $line = explode(',', $a);
    echo json_encode($line);
    echo ($x - 1 == $max)? '' : ',';
}
echo ']';

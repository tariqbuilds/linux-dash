<?php

/* this section finds command paths from OS */
$netstat = exec("command -v netstat");
$awk = exec("command -v awk");
$sort = exec("command -v sort");
$uniq = exec("command -v uniq");

/* execute command */
exec("$netstat -ntu | $awk 'NR>2 {sub(/:[^:]+$/, \"\"); print $5}' | $sort | $uniq -c", $result);

header('Content-Type: application/json; charset=UTF-8');
echo "[";
$max = count($result);
for ($i = 0; $i < $max; $i++) {
    echo json_encode(preg_split(
        '@\s+@',
        $result[$i],
        null,
        PREG_SPLIT_NO_EMPTY
    ));
    echo ($i + 1 == $max)?'':',';
}
echo "]";

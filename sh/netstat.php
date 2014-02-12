<?php 
    exec("/bin/netstat -ntu | awk 'NR>2 {sub(/:[^:]*?$/, \"\"); print $5}' | sort | uniq -c", $result);

    header('Content-Type: application/json; charset=UTF-8');
    echo "[";
    $max = count($result);
    for ($i = 0; $i < $max; $i++) {
      echo json_encode( preg_split('@\s+@', $result[$i], NULL, PREG_SPLIT_NO_EMPTY) );
      echo ($i + 1 == $max)?'':',';
  }
  echo "]";
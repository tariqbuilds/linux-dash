<?php

    echo json_encode(shell_exec('/usr/bin/lsb_release -ds;/bin/uname -r')) ;

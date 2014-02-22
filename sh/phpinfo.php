<?php

if(isset($_GET["what"])){
    phpinfo((int)$_GET["what"]);
}
else{
    phpinfo();
}


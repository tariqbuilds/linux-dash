<?php

class MockXhr
{
    public static function get($resource)
    {
        $_GET['sh'] = $resource;
        ob_start();
        require('test-xhr.php');
        return ob_get_clean();
    }
}

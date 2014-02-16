<?php

    try
    {
        if (isset($_GET['sh']))
        {
            include("sh/".$_GET['sh'].".php");
        }
        else
        {
            throw new HttpQueryStringException($_GET['sh']);
        }
    }
    catch (Exception $e)
    {
        echo json_encode(array(
            'error'=>$e->getMessage()
        ));
    }

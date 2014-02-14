<?php

    header('Content-Type: application/json; charset=UTF-8');
    try
    {
        if (isset($_GET['sh']))
            include("sh/".$_GET['sh'].".php");
        else
            throw new HttpQueryStringException($_GET['sh']);
    }
    catch (Exception $e)
    {
        echo json_encode((object)array(
            'error'=>$e->getMessage()
        ));
    }

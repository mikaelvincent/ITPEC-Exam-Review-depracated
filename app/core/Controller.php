<?php

class Controller
{
    public function model($model)
    {
        // Require model file
        require_once __DIR__ . "/../models/" . $model . ".php";
        // Instantiate model
        return new $model();
    }

    public function view($view, $data = [])
    {
        // Extract data array into variables
        extract($data);
        // Require view file
        require_once __DIR__ . "/../views/" . $view . ".php";
    }
}

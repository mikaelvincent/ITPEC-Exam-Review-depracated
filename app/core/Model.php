<?php

require_once __DIR__ . "/Database.php";

class Model
{
    protected $db;

    public function __construct()
    {
        $config = require __DIR__ . "/../config/config.php";
        $this->db = Database::getInstance($config)->getConnection();
    }
}

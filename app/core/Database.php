<?php

class Database
{
    private static $instance = null;
    private $pdo;

    private function __construct($config)
    {
        $dsn =
            "mysql:host=" .
            $config["db_host"] .
            ";dbname=" .
            $config["db_name"] .
            ";charset=utf8";

        try {
            $this->pdo = new PDO($dsn, $config["db_user"], $config["db_pass"]);
            // Set PDO error mode to exception
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database Connection Failed: " . $e->getMessage());
        }
    }

    public static function getInstance($config)
    {
        if (self::$instance === null) {
            self::$instance = new Database($config);
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}

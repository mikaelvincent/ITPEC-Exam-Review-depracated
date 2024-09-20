<?php

require_once __DIR__ . "/../helpers/env_helper.php";

// Load environment variables from the .env file
load_env(__DIR__ . "/../../.env");

// Define configuration settings
return [
    "db_host" => getenv("DB_HOST"),
    "db_user" => getenv("DB_USER"),
    "db_pass" => getenv("DB_PASS"),
    "db_name" => getenv("DB_NAME"),
];

<?php

spl_autoload_register(function ($class) {
    $base_dir = __DIR__ . "/";

    $directories = ["core/", "models/", "controllers/"];

    foreach ($directories as $directory) {
        $file = $base_dir . $directory . $class . ".php";
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

require_once __DIR__ . "/helpers/breadcrumb_helper.php";
require_once __DIR__ . "/helpers/env_helper.php";
require_once __DIR__ . "/helpers/exam_helper.php";
require_once __DIR__ . "/helpers/url_helper.php";

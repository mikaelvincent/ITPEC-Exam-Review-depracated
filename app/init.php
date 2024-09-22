<?php

spl_autoload_register(function ($class) {
    $base_dir = __DIR__ . "/";

    $directories = ["core/", "models/"];

    foreach ($directories as $directory) {
        $file = $base_dir . $directory . $class . ".php";
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

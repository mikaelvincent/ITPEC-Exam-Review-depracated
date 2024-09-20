<?php

function load_env($env_path)
{
    if (!file_exists($env_path)) {
        throw new Exception(".env file not found at $env_path");
    }

    $lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments and empty lines
        if (strpos(trim($line), "#") === 0 || trim($line) === "") {
            continue;
        }

        // Parse key=value
        if (strpos($line, "=") !== false) {
            list($name, $value) = explode("=", $line, 2);
            $name = trim($name);
            $value = trim($value);

            // Remove quotes from value
            $value = trim($value, '"');

            // Set environment variable
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
}

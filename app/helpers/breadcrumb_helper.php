<?php

// Formats a breadcrumb name
function format_breadcrumb_name($name)
{
    return ucwords(str_replace(["-", "_"], " ", $name));
}

// Gets the base path of the application
function get_base_path()
{
    $scriptName = $_SERVER["SCRIPT_NAME"];
    return rtrim(str_replace(basename($scriptName), "", $scriptName), "/");
}

// Generates breadcrumb data from the current URL
function get_breadcrumbs()
{
    $basePath = get_base_path();
    $url = isset($_GET["url"]) ? rtrim($_GET["url"], "/") : "";
    $segments = $url ? explode("/", $url) : [];

    $breadcrumbs = [
        [
            "name" => "Home",
            "href" => $basePath . "/",
        ],
    ];

    $path = $basePath . "/";
    foreach ($segments as $segment) {
        $path .= $segment . "/";
        $breadcrumbs[] = [
            "name" => format_breadcrumb_name($segment),
            "href" => rtrim($path, "/"),
        ];
    }

    return $breadcrumbs;
}

<?php

function makeUrlFriendly($string)
{
    $string = strtolower($string);
    $string = preg_replace("/[^a-z0-9_]+/", "_", $string);
    $string = trim($string, "_");
    return $string;
}

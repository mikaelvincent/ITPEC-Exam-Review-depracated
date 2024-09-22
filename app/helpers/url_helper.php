<?php

function makeUrlFriendly(string $string): string
{
    $string = strtolower($string);
    $string = rawurlencode($string);
    $string = preg_replace("/(?<!-)%20(?!-)/", "-", $string);
    $string = str_replace("%20", "", $string);
    
    return $string;
}

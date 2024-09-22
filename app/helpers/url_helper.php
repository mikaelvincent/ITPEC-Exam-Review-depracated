<?php

function makeUrlFriendly($string)
{
    return str_replace("%20", "-", rawurlencode(strtolower($string)));
}

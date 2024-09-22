<?php

function extractWordsFromAlias($alias)
{
    $cleanedAlias = preg_replace("/[^a-zA-Z0-9\s\-_]/", "", $alias);
    $words = preg_split("/[\s\-_]+/", $cleanedAlias);

    return $words;
}

function buildLikeQuery($words, $columnName)
{
    if (!$words || empty($words)) {
        return "";
    }

    $likeParts = [];

    foreach ($words as $index => $word) {
        $likeParts[] = "$columnName LIKE :word" . $index;
    }

    return implode(" AND ", $likeParts);
}

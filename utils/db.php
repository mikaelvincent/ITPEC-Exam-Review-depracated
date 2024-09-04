<?php

function connectToDatabase() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "philnits_review";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function closeDatabaseConnection($conn) {
    $conn->close();
}

?>

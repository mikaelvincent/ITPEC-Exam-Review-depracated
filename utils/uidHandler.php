<?php
function generateUID() {
    // Generates a 32-character hex value
    return bin2hex(random_bytes(16));
}

function uidExists($conn, $uid) {
    // Checks if the provided UID already exists in the database
    $stmt = $conn->prepare("SELECT 1 FROM users WHERE uid = ?");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}

function addUID($conn, $uid) {
    // Adds a new UID to the database
    $stmt = $conn->prepare("INSERT INTO users (uid) VALUES (?)");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
}

function getUserId($conn, $uid) {
    // Retrieves the userId from the database using the uid
    $stmt = $conn->prepare("SELECT userId FROM users WHERE uid = ?");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        return $row['userId'];
    }
    return null; // Return null if no user is found
}
?>

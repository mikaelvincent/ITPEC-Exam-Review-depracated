<?php
function getRandomQuestion($conn, $userId) {
    $query = "SELECT questionId, questionText, questionImageUrl, questionChoices, correctAnswer 
              FROM questions 
              WHERE questionId NOT IN (
                  SELECT questionId 
                  FROM answer_history 
                  WHERE userId = ? AND status = 1
              ) 
              ORDER BY RAND() 
              LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $row['questionChoices'] = json_decode($row['questionChoices']); // Decode the JSON formatted choices
        return $row;
    } else {
        return false; // Indicate no more questions available
    }
}

function logAnswer($conn, $userId, $questionId) {
    $stmt = $conn->prepare("INSERT INTO answer_history (userId, questionId) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $questionId);
    $stmt->execute();
}
?>

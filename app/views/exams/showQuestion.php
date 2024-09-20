<?php require_once __DIR__ . "/../layouts/header.php"; ?>

<h1>Question <?php echo $data["question_number"]; ?></h1>
<p>This is a placeholder for question <?php echo $data[
    "question_number"
]; ?> in <?php echo $data["exam_set_name"]; ?>.</p>

<?php require_once __DIR__ . "/../layouts/footer.php"; ?>

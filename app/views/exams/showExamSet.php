
<?php require_once __DIR__ . "/../layouts/header.php"; ?>

<div class="row">
    <?php if (!empty($questions)): ?>
        <?php foreach ($questions as $question): ?>
            <div class="col-3 mb-3">
                <a class="btn btn-primary btn-lg h-100 w-100" role="button" href="<?= htmlspecialchars(
                    $exam_set_alias_url . "/Q" . $question["question_number"]
                ) ?>">
                    Q<?= htmlspecialchars($question["question_number"]) ?>
                </a>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <div class="col mb-3">
            <p>No questions available for this exam set.</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . "/../layouts/footer.php"; ?>

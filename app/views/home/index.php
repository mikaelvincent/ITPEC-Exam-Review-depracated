<?php require_once __DIR__ . "/../layouts/header.php"; ?>

<div class="row row-cols-1">
    <?php foreach ($exams as $exam): ?>
        <div class="col mb-3">
            <a class="btn btn-primary btn-lg h-100 w-100" role="button" href="<?= htmlspecialchars(
                $exam["exam_alias_url"]
            ) ?>">
                <?= htmlspecialchars(
                    $exam["exam_name"]
                ) ?> (<?= htmlspecialchars($exam["exam_alias"]) ?>)
            </a>
        </div>
    <?php endforeach; ?>
    <div class="col mb-5">
        <hr>
    </div>
    <div class="col mb-5">
        <a class="btn btn-outline-primary btn-lg h-100 w-100" role="button" href="contributors">Contributors</a>
    </div>
</div>

<?php require_once __DIR__ . "/../layouts/footer.php"; ?>

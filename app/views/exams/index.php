<?php require_once __DIR__ . "/../layouts/header.php"; ?>

<div class="row row-cols-1">
    <?php if (!empty($exam_sets)): ?>
        <?php foreach ($exam_sets as $exam_set): ?>
            <div class="col mb-3">
                <a class="btn btn-primary btn-lg h-100 w-100" role="button" href="<?= htmlspecialchars(
                    $exam_alias_url . "/" . $exam_set["exam_set_alias_url"]
                ) ?>">
                    <?php echo htmlspecialchars($exam_set["exam_set_name"]); ?>
                </a>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <div class="col mb-3">
            <p>No exam sets available for this exam.</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . "/../layouts/footer.php"; ?>

<?php

$breadcrumbs = get_breadcrumbs();
$activeBreadcrumb = array_pop($breadcrumbs);
?>

<ol class="breadcrumb mb-5 fs-5">
    <?php foreach ($breadcrumbs as $crumb): ?>
        <li class="breadcrumb-item">
            <a class="text-decoration-none link-secondary" href="<?php echo htmlspecialchars(
                $crumb["href"]
            ); ?>">
                <?php echo htmlspecialchars($crumb["name"]); ?>
            </a>
        </li>
    <?php endforeach; ?>

    <?php if ($activeBreadcrumb): ?>
        <li class="breadcrumb-item active" aria-current="page">
            <a class="text-decoration-none" href="<?php echo htmlspecialchars(
                $activeBreadcrumb["href"]
            ); ?>">
                <?php echo htmlspecialchars($activeBreadcrumb["name"]); ?>
            </a>
        </li>
    <?php endif; ?>
</ol>

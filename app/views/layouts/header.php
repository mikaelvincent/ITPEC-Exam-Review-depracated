<!DOCTYPE html>
<html data-bs-theme="light" lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <title>
            <?php echo isset($data["page_title"]) ? $data["page_title"] . " | ITPEC Exam Review" : "ITPEC Exam Review";?>
        </title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/lumen/bootstrap.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;1,400&amp;display=swap">
        <?php if (isset($additional_css) && is_array($additional_css)) {
            foreach ($additional_css as $css_file) {
                echo '<link rel="stylesheet" href="' . $css_file . '">';
            }
        } ?>
    </head>
    <body>
        <main>
            <div class="container py-4 py-xl-5">
                <?php include __DIR__ . "/breadcrumbs.php"; ?>

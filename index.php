<?php
require_once('utils/db.php');
require_once('utils/uidHandler.php');
require_once('utils/questionHandler.php');

$conn = connectToDatabase();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'logAnswer') {
    logAnswer($conn, $_POST['userId'], $_POST['questionId']);
    header("Location: /"); // Redirect to the same page to refresh the content
    exit;
}

// Manage UID checking and generation
$user_uid = isset($_COOKIE['user_uid']) ? $_COOKIE['user_uid'] : null;
if (!$user_uid || !uidExists($conn, $user_uid)) {
    do {
        $user_uid = generateUID();
    } while (uidExists($conn, $user_uid));
    addUID($conn, $user_uid);
    setcookie('user_uid', $user_uid, time() + (86400 * 365), "/");
}

$userId = getUserId($conn, $user_uid);

$question = getRandomQuestion($conn, $userId); // Fetch a random question
if (!$question) {
    header("Location: congratulations"); // Redirect if no questions are left
    exit;
}


closeDatabaseConnection($conn);
?>

<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>PhilNITS FE Review</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Navbar-Centered-Links-icons.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <nav class="navbar navbar-expand-md bg-body py-3">
        <div class="container"><a class="navbar-brand d-flex align-items-center" href="/"><span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg class="bi bi-bar-chart" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"></path>
                    </svg></span><span class="fw-bold" >PhilNITS FE Review</span></a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-3"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div id="navcol-3" class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="credits">Credits</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="d-flex justify-content-center align-items-center">
        <div class="container py-4 py-xl-5">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2 class="fw-bold"><?= htmlspecialchars($question['questionText']) ?></h2>
                    <?php if (!empty($question['questionImageUrl'])): ?>
                        <img class="img-fluid" src="assets/img/<?= htmlspecialchars($question['questionImageUrl']) ?>">
                    <?php endif; ?>
                </div>
            </div>
            <div class="row gy-4 row-cols-1 row-cols-md-2 mb-5">
                <?php foreach ($question['questionChoices'] as $index => $choice): ?>
                    <div class="col">
                        <div class="card">
                            <div class="card-body p-4">
                                <a class="stretched-link choice" href="#">
                                    <h4 class="card-content fw-bold"><?= chr(65 + $index) ?>.</h4>
                                    <p><?= htmlspecialchars($choice) ?></p>
                                </a></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="row gy-4 d-none" id="success-row">
                <div class="col d-flex justify-content-center">
                    <button class="btn btn-outline-primary btn-lg see-explanation-btn" type="button" data-bs-target="#explanation" data-bs-toggle="modal">See explanation</button>
                    <form method="post" action="/">
                        <input type="hidden" name="userId" value="<?= htmlspecialchars($userId) ?>">
                        <input type="hidden" name="questionId" value="<?= htmlspecialchars($question['questionId']) ?>">
                        <input type="hidden" name="action" value="logAnswer">
                        <button class="btn btn-outline-primary btn-lg proceed-btn" type="submit">Proceed to next question</button>
                    </form>
                    <div class="modal fade" role="dialog" tabindex="-1" id="explanation">
                        <div class="modal-dialog modal-xl" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Explanation</h4><button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <p>This is an explanation</p>
                                </div>
                                <div class="modal-footer"><button class="btn btn-light" type="button">Regenerate explanation</button><button class="btn btn-primary" type="button" data-bs-dismiss="modal">Close</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="text-center py-4">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p class="text-muted my-2">Copyright © 2024 <a class="text-muted text-decoration-none" href="credits">PhilNITS FE Review</a></p>
                </div>
            </div>
        </div>
    </footer>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/vendor/confetti.min.js"></script>
    <script src="assets/js/answerCheck.js"></script>
    <script type="text/javascript">
        var questionData = <?= json_encode($question) ?>;
    </script>
</body>

</html>

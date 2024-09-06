<?php
require_once('utils/db.php');
require_once('utils/uidHandler.php');
require_once('utils/questionHandler.php');

$conn = connectToDatabase();

$user_uid = $_COOKIE['user_uid'] ?? null;
$userId = getUserId($conn, $user_uid);

// Check if there are no questions left
$noMoreQuestions = getRandomQuestion($conn, $userId) === false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'resetProgress') {
    $stmt = $conn->prepare("UPDATE answer_history SET status = 0 WHERE userId = ? AND status = 1");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    header("Location: /"); // Redirect to the question page
    exit;
}

closeDatabaseConnection($conn);

if (!$noMoreQuestions) {
    header("Location: /"); // Redirect back if there are still available questions
    exit;
}
?>

<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Congratulations! | PhilNITS FE Review</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Navbar-Centered-Links-icons.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <nav class="navbar navbar-expand-md bg-body py-3">
        <div class="container"><a class="navbar-brand d-flex align-items-center" href="/"><span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-bar-chart">
                        <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"></path>
                    </svg></span><span>PhilNITS FE Review</span></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-3">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="credits">Credits</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="d-flex justify-content-center align-items-center">
        <section class="py-4 py-xl-5">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-md-10 col-xl-8 d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                        <div>
                            <h1 class="text-uppercase fw-bold text-center mb-3">All Questions Completed</h1>
                            <p>Great job! You've worked through all the available PhilNITS FE exam questions in our review system. You've systematically tackled the full set of past exam problems, which is key to your preparation for the real exam.</p>
                            <p>Here’s what you can do next:</p>
                            <ol>
                                <li><span class="fw-bold">Reset Your Progress:</span> If you'd like to continue practicing, consider resetting your progress. This will allow you to go over the questions again, reinforcing key concepts and improving your problem-solving approach. You can reset through your profile or settings.</li>
                                <li><span class="fw-bold">Check for New Questions:</span> While you’ve completed the current set, we update our database periodically with new content. Be sure to check back regularly for fresh questions to keep sharpening your skills.</li>
                            </ol>
                            <p class="mb-4">Thank you for using our review platform to prepare for the PhilNITS FE exam. You've put in the work, and your effort will pay off. Keep practicing, and good luck!</p>
                            <p class="mb-5">—&nbsp;<a class="fw-bold text-decoration-none" href="credits">The PhilNITS FE Review Team</a></p>
                            <div class="text-center">
                                <form method="post" action="congratulations">
                                    <input type="hidden" name="action" value="resetProgress">
                                    <button class="btn btn-primary fs-5 me-2 py-2 px-4" type="submit">Reset Progress</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="text-center py-4">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p class="text-muted my-2">Copyright&nbsp;© 2024 <a class="text-muted text-decoration-none" href="credits">PhilNITS FE Review</a></p>
                </div>
            </div>
        </div>
    </footer>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
</body>

</html>

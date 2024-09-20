<?php

class ExamController extends Controller
{
    public function index($exam_name)
    {
        // Placeholder for exam name fetched from the database
        $data = [
            "page_title" => $exam_name,
            "exam_name" => $exam_name,
        ];
        $this->view("exams/index", $data);
    }

    public function showExamSet($exam_name, $exam_set_name)
    {
        // Placeholder for exam set name fetched from the database
        $data = [
            "page_title" => $exam_set_name,
            "exam_name" => $exam_name,
            "exam_set_name" => $exam_set_name,
        ];
        $this->view("exams/showExamSet", $data);
    }

    public function showQuestion($exam_name, $exam_set_name, $question_number)
    {
        // Placeholder for question title fetched from the database
        $question_title = "Question " . $question_number;
        $data = [
            "page_title" => $question_title,
            "exam_name" => $exam_name,
            "exam_set_name" => $exam_set_name,
            "question_number" => $question_number,
            "additional_js" => [
                "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js",
                "assets/js/question-interaction.js",
            ],
        ];
        $this->view("exams/showQuestion", $data);
    }
}

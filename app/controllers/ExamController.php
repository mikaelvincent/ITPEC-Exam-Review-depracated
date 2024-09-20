<?php

class ExamController extends Controller
{
    public function index()
    {
        $data = [
            "title" => "ITPEC FE Exam",
            "exam_name" => "ITPEC-FE-Exam",
        ];
        $this->view("exams/index", $data);
    }

    public function showExamSet($exam_set_name)
    {
        $data = [
            "title" => $exam_set_name,
            "exam_set_name" => $exam_set_name,
        ];
        $this->view("exams/showExamSet", $data);
    }

    public function showQuestion($exam_set_name, $question_number)
    {
        $data = [
            "title" => "Question " . $question_number,
            "exam_set_name" => $exam_set_name,
            "question_number" => $question_number,
        ];
        $this->view("exams/showQuestion", $data);
    }
}

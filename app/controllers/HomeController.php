<?php

class HomeController extends Controller
{
    public function index()
    {
        $examModel = $this->model("Exam");
        $exams = $examModel->getAllExams();

        $data = [
            "exams" => $exams,
        ];
        $this->view("home/index", $data);
    }
}

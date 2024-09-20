<?php

class ContributorController extends Controller
{
    public function index()
    {
        $data = [
            "title" => "Contributors",
            "additional_css" => ["assets/css/team-horizontal.css"],
        ];
        $this->view("contributors/index", $data);
    }
}

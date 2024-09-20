<?php

class ContributorController extends Controller
{
    public function index()
    {
        $data = ["title" => "Contributors"];
        $this->view("contributors/index", $data);
    }
}

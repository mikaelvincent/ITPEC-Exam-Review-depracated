<?php

class HomeController extends Controller
{
    public function index()
    {
        $data = ["title" => "Home"];
        $this->view("home/index", $data);
    }
}

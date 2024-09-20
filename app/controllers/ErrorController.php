<?php

class ErrorController extends Controller
{
    public function notFound()
    {
        http_response_code(404);
        $data = ["page_title" => "404 Not Found"];
        $this->view("errors/404", $data);
    }
}

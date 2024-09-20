<?php

class App
{
    protected $controller = "HomeController";
    protected $method = "index";
    protected $params = [];

    public function __construct()
    {
        $url = $this->parseUrl();

        if (!isset($url[0]) || $url[0] === "") {
            // Root URL: /
            $this->controller = "HomeController";
            $this->method = "index";
        } elseif ($url[0] === "contributors") {
            // /contributors
            $this->controller = "ContributorController";
            $this->method = "index";
        } elseif (isset($url[0])) {
            // /{exam_name} and its subpaths
            $this->controller = "ExamController";

            $exam_name = $url[0];

            if (!isset($url[1]) || $url[1] === "") {
                // /{exam_name}
                $this->method = "index";
                $this->params = [$exam_name]; // exam_name
            } elseif (
                isset($url[1]) &&
                isset($url[2]) &&
                preg_match('/^Q(\d+)$/', $url[2], $matches)
            ) {
                // /{exam_name}/{exam_set_name}/Q{question_number}
                $this->method = "showQuestion";
                $this->params = [$exam_name, $url[1], $matches[1]]; // exam_name, exam_set_name, question_number
            } else {
                // /{exam_name}/{exam_set_name}
                $this->method = "showExamSet";
                $this->params = [$exam_name, $url[1]]; // exam_name, exam_set_name
            }
        } else {
            // Page not found
            $this->controller = "ErrorController";
            $this->method = "notFound";
        }

        // Load and instantiate the controller
        require_once __DIR__ . "/../controllers/" . $this->controller . ".php";
        $this->controller = new $this->controller();

        // Call the controller method with parameters
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    // Function to parse the URL
    private function parseUrl()
    {
        if (isset($_GET["url"])) {
            // Remove trailing slashes and sanitize the URL
            return explode(
                "/",
                filter_var(rtrim($_GET["url"], "/"), FILTER_SANITIZE_URL)
            );
        }
        return [];
    }
}

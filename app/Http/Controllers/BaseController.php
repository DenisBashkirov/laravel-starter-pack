<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $template;
    protected $vars;
    protected $page_title;

    protected function  renderOutput()
    {
        $this->vars = array_add($this->vars, 'page_title', $this->page_title);

        $data = $this->vars;

        if (!empty($data))
            return view($this->template, $data);
        else
            return view($this->template);
    }
}
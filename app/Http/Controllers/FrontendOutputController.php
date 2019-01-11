<?php

namespace App\Http\Controllers;

use App\Category;
use App\GalleryItem;
use App\Mail\TestimonialAdded;
use App\OurContactSocials;
use App\Subcategory;
use App\Testimonial;
use Illuminate\Http\Request;
use Route;
use Mail;

class FrontendOutputController extends BaseController
{
    public function __construct()
    {
        $route_name = Route::getCurrentRoute() ? Route::getCurrentRoute()->getName() : null;
        $this->template = 'frontend.pages.' . $route_name;
    }
}

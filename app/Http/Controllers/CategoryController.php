<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return inertia('Categories/Index', [
            'categories' => Category::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'category_name' => 'required|string|max:256'
        ]);

        Category::create($request->all());

        return redirect(route('categories.index'));
    }
}

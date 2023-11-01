<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return inertia('Tasks/Index', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'task_name' => 'required|string|max:256',
        ]);

        $request->input('completed') ? 1 : 0;

        Task::create($request->all());

        return redirect(route('tasks.index'));
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $primmaryKey = "task_id";

    protected $fillable = [
        "task_name",
        "completed",
        "category_id",
        "user_id"
        // "due_date"
    ];
}

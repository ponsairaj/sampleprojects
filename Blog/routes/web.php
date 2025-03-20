<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return "Helooo dumb!";
});

// routes/web.php

Route::get('/', [PostController::class, 'index'])->name('blog.index');

Route::get('/post/{id}', [PostController::class, 'detail'])->where('id','[0-9]+')->name('blog-details');


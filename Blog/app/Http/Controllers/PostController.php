<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // Fetch all posts from the database
        $posts = Post::all(); // Order by latest first
        return view('pages.home', compact('posts'));
        
    }

    public function detail($id){
        $post = Post::findOrFail($id);
        return view('pages.blogpost',compact('post'));
    }
}

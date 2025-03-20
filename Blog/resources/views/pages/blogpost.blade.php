@extends('layouts.master')

@section('contents')
<div class="container mt-5 ">
    <h1 class="mb-4 text-secondary">{{ $post->title }}</h1>
    
    <p class="text-primary">By {{ $post->Author }} | Published on {{ $post->created_at->format('M d, Y') }}</p>

    <!-- Image Section -->
    <div class="post-image mb-4">
        <img src="https://picsum.photos/400/300" alt="Post Image" class="img-fluid">
    </div>

    <div class="post-content text-dark m-5">
        {!! $post->content !!}
    </div>

    <div class="mt-4">
        <a href="{{ url()->previous() }}" class="btn btn-md btn-warning m-5">Back</a>
    </div>
</div>
@endsection

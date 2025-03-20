@extends('layouts.master')

@section('contents')
<div class="container mt-5">
    <h1 class="mb-4">Blog Posts</h1>

    @if ($posts->isEmpty())
        <div class="alert alert-info">No posts found.</div>
    @else
        <div class="row justify-content-center">            
        @foreach ($posts as $post)
            <div class="col-sm-12 col-md-3 card m-3 bg-secondary text-light">
                <div class="card-body">
                    <!-- Image at the top of each card -->
                    <img src="https://picsum.photos/200/200" alt="Post Image" class="card-img-top rounded mb-3">
                    
                    <h2 class="card-title">{{ $post->title }}</h2>
                    <p class="card-text text-light">
                        Published on {{ $post->created_at->format('M d, Y') }}
                    </p>
                    <p class="card-text">
                        <span class="d-inline-block text-truncate" style="width: 250px;">
                            {{ $post->content }}
                        </span>             
                    </p>
                    <a href="{{ route('blog-details', ['id' => $post->id]) }}" class="btn btn-primary">Read more..</a>
                </div>
            </div>
        @endforeach
        </div>
    @endif
</div>
@endsection

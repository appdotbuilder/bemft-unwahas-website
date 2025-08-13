<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogPost;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Check if this is an admin route
        if (request()->routeIs('admin.blog.*')) {
            $posts = BlogPost::latest()->paginate(10);
            
            return Inertia::render('admin/blog/index', [
                'posts' => $posts
            ]);
        }
        
        // Public blog listing
        $posts = BlogPost::published()
            ->latest('published_at')
            ->paginate(12);
        
        return Inertia::render('blog/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/blog/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        
        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }
        
        $post = BlogPost::create($data);

        return redirect()->route('admin.blog.show', $post)
            ->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        if ($blogPost->status !== 'published' && !auth()->check()) {
            abort(404);
        }
        
        return Inertia::render('blog/show', [
            'post' => $blogPost
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('admin/blog/edit', [
            'post' => $blogPost
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $data = $request->validated();
        
        if ($data['status'] === 'published' && !$blogPost->published_at && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }
        
        $blogPost->update($data);

        return redirect()->route('admin.blog.show', $blogPost)
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}
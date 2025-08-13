<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\EventRegistration;
use App\Models\ManagementMember;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'blog_posts' => BlogPost::count(),
            'published_posts' => BlogPost::where('status', 'published')->count(),
            'draft_posts' => BlogPost::where('status', 'draft')->count(),
            'management_members' => ManagementMember::count(),
            'event_registrations' => EventRegistration::count(),
            'recent_registrations' => EventRegistration::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        $recentPosts = BlogPost::latest()->limit(5)->get();
        $recentRegistrations = EventRegistration::latest()->limit(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentRegistrations' => $recentRegistrations,
        ]);
    }


}
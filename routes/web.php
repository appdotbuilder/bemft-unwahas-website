<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\ManagementMemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

// Event routes
Route::controller(EventRegistrationController::class)->group(function () {
    Route::get('/events', 'index')->name('events.index');
    Route::post('/events', 'store')->name('events.store');
});

// Blog routes
Route::controller(BlogPostController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog.index');
    Route::get('/blog/{blogPost:slug}', 'show')->name('blog.show');
});

// Profile routes (management members)
Route::get('/profile', [ManagementMemberController::class, 'index'])->name('profile');

// Admin routes (protected by auth)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin dashboard
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        
        // Blog management
        Route::resource('blog', BlogPostController::class)->except(['show']);
        
        // Management members
        Route::resource('members', ManagementMemberController::class);
        
        // Event registrations
        Route::get('/registrations', [EventRegistrationController::class, 'show'])->name('registrations.show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
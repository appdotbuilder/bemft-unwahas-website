<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRegistrationRequest;
use App\Models\EventRegistration;
use Inertia\Inertia;

class EventRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('events');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRegistrationRequest $request)
    {
        EventRegistration::create($request->validated());

        return redirect()->route('events.index')
            ->with('success', 'Event registration submitted successfully! We will contact you soon.');
    }

    /**
     * Show registrations for admin.
     */
    public function show()
    {
        $registrations = EventRegistration::latest('registered_at')->paginate(20);
        
        return Inertia::render('admin/registrations/index', [
            'registrations' => $registrations
        ]);
    }
}
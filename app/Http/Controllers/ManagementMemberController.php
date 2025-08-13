<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreManagementMemberRequest;
use App\Http\Requests\UpdateManagementMemberRequest;
use App\Models\ManagementMember;
use Inertia\Inertia;

class ManagementMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Check if this is an admin route
        if (request()->routeIs('admin.members.*')) {
            $members = ManagementMember::all();
            
            return Inertia::render('admin/members/index', [
                'members' => $members
            ]);
        }
        
        // Public profile page
        $members = ManagementMember::all();
        
        return Inertia::render('profile', [
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/members/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreManagementMemberRequest $request)
    {
        $data = $request->validated();
        
        if (!isset($data['sort_order'])) {
            $data['sort_order'] = ManagementMember::max('sort_order') + 1;
        }
        
        $member = ManagementMember::create($data);

        return redirect()->route('admin.members.show', $member)
            ->with('success', 'Management member created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ManagementMember $managementMember)
    {
        return Inertia::render('admin/members/show', [
            'member' => $managementMember
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ManagementMember $managementMember)
    {
        return Inertia::render('admin/members/edit', [
            'member' => $managementMember
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManagementMemberRequest $request, ManagementMember $managementMember)
    {
        $managementMember->update($request->validated());

        return redirect()->route('admin.members.show', $managementMember)
            ->with('success', 'Management member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagementMember $managementMember)
    {
        $managementMember->delete();

        return redirect()->route('admin.members.index')
            ->with('success', 'Management member deleted successfully.');
    }
}
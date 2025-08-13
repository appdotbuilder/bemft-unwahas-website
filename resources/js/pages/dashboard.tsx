import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-8">
                    <h1 className="text-3xl font-bold mb-2">
                        🎯 Welcome to BEM FT UNWAHAS Admin
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Manage your organization's digital presence with ease
                    </p>
                </div>

                {/* Quick Navigation */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href={route('admin.dashboard')}>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-blue-600 text-2xl">📊</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
                            <p className="text-gray-600 text-sm">View detailed statistics and manage all content</p>
                        </div>
                    </Link>

                    <Link href={route('admin.blog.index')}>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-green-600 text-2xl">📝</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Blog Posts</h3>
                            <p className="text-gray-600 text-sm">Create and manage blog articles</p>
                        </div>
                    </Link>

                    <Link href={route('admin.members.index')}>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-purple-600 text-2xl">👥</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Team Members</h3>
                            <p className="text-gray-600 text-sm">Manage organization leadership</p>
                        </div>
                    </Link>

                    <Link href={route('admin.registrations.show')}>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-orange-600 text-2xl">🎪</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Registrations</h3>
                            <p className="text-gray-600 text-sm">View event registration data</p>
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link href={route('admin.blog.create')}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start text-left h-16">
                                <div>
                                    <div className="font-semibold">📝 Create Blog Post</div>
                                    <div className="text-sm opacity-90">Share news and updates</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href={route('admin.members.create')}>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start text-left h-16">
                                <div>
                                    <div className="font-semibold">👤 Add Team Member</div>
                                    <div className="text-sm opacity-90">Expand your leadership team</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href={route('welcome')}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start text-left h-16">
                                <div>
                                    <div className="font-semibold">🌐 View Website</div>
                                    <div className="text-sm opacity-90">See your public site</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href={route('admin.registrations.show')}>
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start text-left h-16">
                                <div>
                                    <div className="font-semibold">📊 View Analytics</div>
                                    <div className="text-sm opacity-90">Check registration data</div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        📚 Need Help Getting Started?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Your BEM FT UNWAHAS website is ready! Start by creating your first blog post, 
                        adding team members, and customizing your content to engage with students.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('admin.dashboard')}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                🚀 Go to Full Admin Dashboard
                            </Button>
                        </Link>
                        <Link href={route('welcome')}>
                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                👀 Preview Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
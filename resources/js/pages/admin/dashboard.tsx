import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    blog_posts: number;
    published_posts: number;
    draft_posts: number;
    management_members: number;
    event_registrations: number;
    recent_registrations: number;
}

interface BlogPost {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

interface EventRegistration {
    id: number;
    full_name: string;
    email: string;
    university: string;
    registered_at: string;
}

interface Props {
    stats: Stats;
    recentPosts: BlogPost[];
    recentRegistrations: EventRegistration[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentPosts, recentRegistrations }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard - BEM FT UNWAHAS" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🎯 Admin Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your BEM FT UNWAHAS website content and registrations
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={route('welcome')}>
                            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                🌐 View Website
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Blog Posts</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.blog_posts}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-blue-600 text-xl">📝</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm text-green-600 font-medium">
                                {stats.published_posts} Published
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                                • {stats.draft_posts} Drafts
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Team Members</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.management_members}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-green-600 text-xl">👥</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-gray-500">Active members</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Event Registrations</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.event_registrations}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-purple-600 text-xl">🎪</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-green-600 font-medium">
                                +{stats.recent_registrations} this month
                            </span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-100">Website Status</p>
                                <p className="text-3xl font-bold mt-1">Live</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl">🚀</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-blue-100">All systems operational</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={route('admin.blog.create')}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                                📝 New Blog Post
                            </Button>
                        </Link>
                        <Link href={route('admin.members.create')}>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                                👤 Add Team Member
                            </Button>
                        </Link>
                        <Link href={route('admin.registrations.show')}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                                📊 View Registrations
                            </Button>
                        </Link>
                        <Link href={route('welcome')}>
                            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white justify-start">
                                🌐 Visit Website
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Recent Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Blog Posts */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">📰 Recent Blog Posts</h2>
                                <Link href={route('admin.blog.index')}>
                                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentPosts.length > 0 ? (
                                <div className="space-y-4">
                                    {recentPosts.map((post) => (
                                        <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 truncate">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                        post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`}></span>
                                                    {post.status === 'published' ? 'Published' : 'Draft'} • {formatDate(post.created_at)}
                                                </div>
                                            </div>
                                            <Link href={route('admin.blog.edit', post.id)}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📝</div>
                                    <p className="text-gray-600">No blog posts yet</p>
                                    <Link href={route('admin.blog.create')}>
                                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                                            Create First Post
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Registrations */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">🎪 Recent Registrations</h2>
                                <Link href={route('admin.registrations.show')}>
                                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentRegistrations.length > 0 ? (
                                <div className="space-y-4">
                                    {recentRegistrations.map((registration) => (
                                        <div key={registration.id} className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {registration.full_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {registration.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {registration.university}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(registration.registered_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">🎪</div>
                                    <p className="text-gray-600">No registrations yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
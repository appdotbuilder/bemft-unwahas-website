import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    status: string;
    published_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    posts: {
        data: BlogPost[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function AdminBlogIndex({ posts }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDelete = (post: BlogPost) => {
        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
            router.delete(route('admin.blog.destroy', post.id));
        }
    };

    return (
        <AppShell>
            <Head title="Manage Blog Posts - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            📝 Blog Posts
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your blog content and articles
                        </p>
                    </div>
                    <Link href={route('admin.blog.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            ✨ New Post
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">{posts.meta.total}</div>
                        <div className="text-sm text-gray-600">Total Posts</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">
                            {posts.data.filter(p => p.status === 'published').length}
                        </div>
                        <div className="text-sm text-gray-600">Published</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-yellow-600">
                            {posts.data.filter(p => p.status === 'draft').length}
                        </div>
                        <div className="text-sm text-gray-600">Drafts</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {posts.data.filter(p => p.published_at && new Date(p.published_at) > new Date(Date.now() - 7*24*60*60*1000)).length}
                        </div>
                        <div className="text-sm text-gray-600">This Week</div>
                    </div>
                </div>

                {/* Blog Posts Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {posts.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Published</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                                            <th className="text-right py-4 px-6 font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {posts.data.map((post) => (
                                            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 mb-1">
                                                            {post.title}
                                                        </h3>
                                                        {post.excerpt && (
                                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                                {post.excerpt}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        post.status === 'published' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                                            post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                                                        }`}></span>
                                                        {post.status === 'published' ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-600">
                                                    {post.published_at ? formatDate(post.published_at) : '-'}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-600">
                                                    {formatDate(post.created_at)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {post.status === 'published' && (
                                                            <Link href={route('blog.show', post.slug)}>
                                                                <Button variant="outline" size="sm">
                                                                    👁️ View
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        <Link href={route('admin.blog.edit', post.id)}>
                                                            <Button variant="outline" size="sm">
                                                                ✏️ Edit
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handleDelete(post)}
                                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                                        >
                                                            🗑️ Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {posts.links.length > 3 && (
                                <div className="px-6 py-4 border-t border-gray-100">
                                    <div className="flex justify-center">
                                        <nav className="flex space-x-2">
                                            {posts.links.map((link, index: number) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : link.url
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No blog posts yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Create your first blog post to start sharing content with your community.
                            </p>
                            <Link href={route('admin.blog.create')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    ✨ Create First Post
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
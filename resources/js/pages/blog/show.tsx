import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    published_at: string;
}

interface Props {
    post: BlogPost;
    [key: string]: unknown;
}

export default function BlogShow({ post }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={`${post.title} - BEM FT UNWAHAS`} />
            
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">BEM</span>
                            </div>
                            <span className="font-bold text-gray-900">BEM FT UNWAHAS</span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <a href={route('welcome')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                            <a href={route('events.index')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Events</a>
                            <a href={route('blog.index')} className="text-blue-600 font-semibold">Blog</a>
                            <a href={route('profile')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Profile</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <article className="py-12">
                    <div className="container mx-auto px-6">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Link href={route('blog.index')}>
                                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                    ← Back to Blog
                                </Button>
                            </Link>
                        </div>

                        {/* Article Header */}
                        <header className="mb-12 text-center">
                            <div className="mb-4">
                                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    📝 Blog Post
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            
                            <div className="flex items-center justify-center space-x-4 text-gray-600">
                                <time dateTime={post.published_at}>
                                    📅 {formatDate(post.published_at)}
                                </time>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="mb-12">
                                <div className="max-w-4xl mx-auto">
                                    <img 
                                        src={post.featured_image} 
                                        alt={post.title}
                                        className="w-full h-96 object-cover rounded-2xl shadow-lg"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
                                {post.excerpt && (
                                    <div className="mb-8">
                                        <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                )}
                                
                                <div 
                                    className="prose prose-lg prose-blue max-w-none"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                        </div>

                        {/* Article Footer */}
                        <footer className="mt-16 text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold mb-4">
                                    Stay Connected with BEM FT UNWAHAS
                                </h3>
                                <p className="mb-6 opacity-90">
                                    Don't miss out on our latest updates, events, and opportunities for student growth.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href={route('events.index')}>
                                        <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                            Join Our Events
                                        </Button>
                                    </Link>
                                    <Link href={route('blog.index')}>
                                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                            Read More Articles
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </div>
                </article>
            </div>
        </>
    );
}
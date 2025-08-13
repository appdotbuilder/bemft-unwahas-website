import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    published_at: string;
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

export default function BlogIndex({ posts }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Blog - BEM FT UNWAHAS" />
            
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
                            <span className="text-blue-600 font-semibold">Blog</span>
                            <a href={route('profile')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Profile</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
                {/* Hero Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-pulse">
                                    📝 Latest Updates
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                <span className="text-blue-600">Blog</span> & News
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Stay updated with the latest news, achievements, and insights from 
                                BEM FT UNWAHAS and our vibrant student community.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        {posts.data.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {posts.data.map((post) => (
                                        <article key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                                            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                {post.featured_image ? (
                                                    <img 
                                                        src={post.featured_image} 
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-white text-4xl">📝</div>
                                                )}
                                            </div>
                                            
                                            <div className="p-6">
                                                <div className="text-sm text-blue-600 font-medium mb-2">
                                                    {formatDate(post.published_at)}
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                
                                                {post.excerpt && (
                                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                
                                                <Link href={route('blog.show', post.slug)}>
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                        Read More →
                                                    </Button>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {posts.links.length > 3 && (
                                    <div className="flex justify-center">
                                        <nav className="flex space-x-2">
                                            {posts.links.map((link, index: number) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-6">📰</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    No Blog Posts Yet
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                    We're working on bringing you the latest news and updates. 
                                    Check back soon for exciting content from BEM FT UNWAHAS!
                                </p>
                                <a href={route('welcome')}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Back to Home
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
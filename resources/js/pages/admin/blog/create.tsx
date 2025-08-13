import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface BlogPostData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    status: 'draft' | 'published';
    published_at: string;
}

export default function CreateBlogPost() {
    const [formData, setFormData] = useState<BlogPostData>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        status: 'draft',
        published_at: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'title' && !prev.slug ? { slug: generateSlug(value) } : {})
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const submitData = {
            ...formData,
            published_at: formData.status === 'published' && !formData.published_at ? new Date().toISOString().slice(0, 16) : formData.published_at
        };

        router.post(route('admin.blog.store'), submitData, {
            onError: (errors) => {
                setErrors(errors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Create Blog Post - Admin" />
            
            <div className="max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ✨ Create New Blog Post
                    </h1>
                    <p className="text-gray-600">
                        Share news, updates, and insights with your community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Post Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                                        errors.title ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter an engaging title for your blog post"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
                                    URL Slug
                                </label>
                                <div className="flex items-center">
                                    <span className="text-gray-500 text-sm mr-2">/blog/</span>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                            errors.slug ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                        placeholder="auto-generated-from-title"
                                    />
                                </div>
                                {errors.slug && (
                                    <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.excerpt ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                    placeholder="A brief summary of your blog post (optional)"
                                />
                                {errors.excerpt && (
                                    <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={12}
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.content ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                    placeholder="Write your blog post content here. You can use HTML formatting."
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="featured_image" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Featured Image URL
                                </label>
                                <input
                                    type="url"
                                    id="featured_image"
                                    name="featured_image"
                                    value={formData.featured_image}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.featured_image ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.featured_image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Publishing Options */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">📅 Publishing Options</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.status ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                >
                                    <option value="draft">📝 Draft</option>
                                    <option value="published">🌍 Published</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>

                            {formData.status === 'published' && (
                                <div>
                                    <label htmlFor="published_at" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Publish Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="published_at"
                                        name="published_at"
                                        value={formData.published_at}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                            errors.published_at ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.published_at && (
                                        <p className="text-red-500 text-sm mt-1">{errors.published_at}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route('admin.blog.index'))}
                        >
                            Cancel
                        </Button>
                        
                        <div className="flex items-center space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, status: 'draft' }));
                                    setTimeout(() => {
                                        const form = document.querySelector('form') as HTMLFormElement;
                                        form?.requestSubmit();
                                    }, 100);
                                }}
                                disabled={isSubmitting}
                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            >
                                💾 Save as Draft
                            </Button>
                            
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : formData.status === 'published' ? (
                                    <>🚀 Publish Post</>
                                ) : (
                                    <>💾 Save Draft</>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}
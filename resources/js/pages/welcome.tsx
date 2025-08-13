import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="BEM FT UNWAHAS - Student Executive Board">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-blue-100 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">BEM</span>
                            </div>
                            <span className="font-bold text-gray-900">BEM FT UNWAHAS</span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                            <Link href={route('events.index')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Events</Link>
                            <Link href={route('blog.index')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</Link>
                            <Link href={route('profile')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Profile</Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link href={route('login')}>
                                        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen flex items-center">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="mb-8">
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-pulse">
                                🎓 Student Executive Board
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Welcome to <span className="text-blue-600">BEM</span><br />
                            <span className="text-blue-600">FT UNWAHAS</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Empowering students, building leaders, creating positive change in our academic community. 
                            Join us in shaping the future of Faculty of Engineering.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link href={route('events.index')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium w-full sm:w-auto">
                                    🎪 Join Our Events
                                </Button>
                            </Link>
                            <Link href={route('profile')}>
                                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium w-full sm:w-auto">
                                    👥 Meet Our Team
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What We Offer
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover the various ways BEM FT UNWAHAS serves our academic community
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎪</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Campus Events</h3>
                            <p className="text-gray-600">Engaging activities, workshops, and competitions for student development</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Latest News</h3>
                            <p className="text-gray-600">Stay updated with campus news, announcements, and student achievements</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Leadership Team</h3>
                            <p className="text-gray-600">Meet our dedicated student leaders working for positive change</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Services</h3>
                            <p className="text-gray-600">Academic support, career guidance, and community building programs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Get Involved?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join our community of passionate students making a difference. Register for events, 
                        read our latest updates, and connect with student leaders.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('events.index')}>
                            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                                Register for Events
                            </Button>
                        </Link>
                        <Link href={route('blog.index')}>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium">
                                Read Our Blog
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">BEM</span>
                                </div>
                                <span className="font-bold text-white">BEM FT UNWAHAS</span>
                            </div>
                            <p className="text-gray-400">
                                Student Executive Board of Faculty of Engineering, 
                                Universitas Wahid Hasyim.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href={route('events.index')} className="hover:text-blue-400 transition-colors">Events</Link></li>
                                <li><Link href={route('blog.index')} className="hover:text-blue-400 transition-colors">Blog</Link></li>
                                <li><Link href={route('profile')} className="hover:text-blue-400 transition-colors">Our Team</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-white mb-4">Contact</h4>
                            <p className="text-gray-400 mb-2">📍 Faculty of Engineering</p>
                            <p className="text-gray-400 mb-2">🏫 Universitas Wahid Hasyim</p>
                            <p className="text-gray-400">📧 bem.ft@unwahas.ac.id</p>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 BEM FT UNWAHAS. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
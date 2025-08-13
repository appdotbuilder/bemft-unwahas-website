import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Events() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        phone: '',
        study_program: '',
        university: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as 'full_name' | 'email' | 'phone' | 'study_program' | 'university', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('events.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <>
            <Head title="Events - BEM FT UNWAHAS" />
            
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
                            <span className="text-blue-600 font-semibold">Events</span>
                            <a href={route('blog.index')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</a>
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
                                    🎪 Upcoming Event
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                BEM FT UNWAHAS<br />
                                <span className="text-blue-600">Annual Conference 2024</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Join us for an inspiring conference featuring industry leaders, academic experts, 
                                and innovative workshops designed to shape the future of engineering education.
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                                <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                                    <div className="text-3xl mb-3">📅</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                                    <p className="text-gray-600">March 15, 2024<br />09:00 - 17:00 WIB</p>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                                    <div className="text-3xl mb-3">📍</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                                    <p className="text-gray-600">Auditorium FT<br />UNWAHAS Campus</p>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                                    <div className="text-3xl mb-3">🎯</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Target</h3>
                                    <p className="text-gray-600">Engineering Students<br />& Professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Registration Form */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        🎫 Event Registration
                                    </h2>
                                    <p className="text-blue-100">
                                        Fill out the form below to secure your spot at our upcoming conference
                                    </p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                    <div>
                                        <label htmlFor="full_name" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="full_name"
                                            name="full_name"
                                            value={data.full_name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                errors.full_name ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.full_name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                errors.email ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                errors.phone ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                            placeholder="+62 812 3456 7890"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="study_program" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Study Program *
                                        </label>
                                        <select
                                            id="study_program"
                                            name="study_program"
                                            value={data.study_program}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                errors.study_program ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        >
                                            <option value="">Select your study program</option>
                                            <option value="Teknik Informatika">Teknik Informatika</option>
                                            <option value="Teknik Sipil">Teknik Sipil</option>
                                            <option value="Teknik Mesin">Teknik Mesin</option>
                                            <option value="Teknik Elektro">Teknik Elektro</option>
                                            <option value="Teknik Industri">Teknik Industri</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.study_program && (
                                            <p className="text-red-500 text-sm mt-1">{errors.study_program}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="university" className="block text-sm font-semibold text-gray-900 mb-2">
                                            University *
                                        </label>
                                        <input
                                            type="text"
                                            id="university"
                                            name="university"
                                            value={data.university}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                errors.university ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                            placeholder="Universitas Wahid Hasyim"
                                        />
                                        {errors.university && (
                                            <p className="text-red-500 text-sm mt-1">{errors.university}</p>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Submitting Registration...
                                                </>
                                            ) : (
                                                <>
                                                    🎉 Register for Event
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
import React from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface ManagementMember {
    id: number;
    name: string;
    position: string;
    study_program: string;
    photo: string | null;
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
    email: string | null;
}

interface Props {
    members: ManagementMember[];
    [key: string]: unknown;
}

export default function Profile({ members }: Props) {


    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const organizeMembersByPosition = (members: ManagementMember[]) => {
        const positions = {
            'President': [] as ManagementMember[],
            'Vice President': [] as ManagementMember[],
            'Secretary': [] as ManagementMember[],
            'Treasurer': [] as ManagementMember[],
            'Other': [] as ManagementMember[]
        };

        members.forEach(member => {
            const position = member.position;
            if (position.includes('President') && !position.includes('Vice')) {
                positions.President.push(member);
            } else if (position.includes('Vice President')) {
                positions['Vice President'].push(member);
            } else if (position.includes('Secretary')) {
                positions.Secretary.push(member);
            } else if (position.includes('Treasurer')) {
                positions.Treasurer.push(member);
            } else {
                positions.Other.push(member);
            }
        });

        return positions;
    };

    const organizedMembers = organizeMembersByPosition(members);

    return (
        <>
            <Head title="Our Team - BEM FT UNWAHAS" />
            
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
                            <a href={route('blog.index')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</a>
                            <span className="text-blue-600 font-semibold">Profile</span>
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
                                    👥 Leadership Team
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Meet Our <span className="text-blue-600">Team</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Get to know the dedicated student leaders working tirelessly to serve our 
                                academic community and drive positive change at Faculty of Engineering.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Members */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        {members.length > 0 ? (
                            <>
                                {/* Executive Team */}
                                {(organizedMembers.President.length > 0 || organizedMembers['Vice President'].length > 0) && (
                                    <div className="mb-16">
                                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                            🏆 Executive Leadership
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                            {[...organizedMembers.President, ...organizedMembers['Vice President']].map((member) => (
                                                <div key={member.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                                                    <div className="relative">
                                                        <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                            {member.photo ? (
                                                                <img 
                                                                    src={member.photo} 
                                                                    alt={member.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                                                                    {getInitials(member.name)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="absolute top-4 right-4">
                                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700">
                                                                👑 {member.position}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="p-6">
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                                                        <p className="text-gray-600 mb-4">📚 {member.study_program}</p>
                                                        
                                                        {/* Social Links */}
                                                        <div className="flex space-x-3">
                                                            {member.instagram && (
                                                                <a 
                                                                    href={member.instagram.startsWith('http') ? member.instagram : `https://instagram.com/${member.instagram}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                                                >
                                                                    📷
                                                                </a>
                                                            )}
                                                            {member.linkedin && (
                                                                <a 
                                                                    href={member.linkedin.startsWith('http') ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                                                >
                                                                    💼
                                                                </a>
                                                            )}
                                                            {member.twitter && (
                                                                <a 
                                                                    href={member.twitter.startsWith('http') ? member.twitter : `https://twitter.com/${member.twitter}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                                                >
                                                                    🐦
                                                                </a>
                                                            )}
                                                            {member.email && (
                                                                <a 
                                                                    href={`mailto:${member.email}`}
                                                                    className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                                                >
                                                                    📧
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Other Team Members */}
                                {(organizedMembers.Secretary.length > 0 || organizedMembers.Treasurer.length > 0 || organizedMembers.Other.length > 0) && (
                                    <div>
                                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                            🤝 Core Team Members
                                        </h2>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[...organizedMembers.Secretary, ...organizedMembers.Treasurer, ...organizedMembers.Other].map((member) => (
                                                <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                        {member.photo ? (
                                                            <img 
                                                                src={member.photo} 
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
                                                                {getInitials(member.name)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                                                        <p className="text-gray-600 text-sm mb-4">📚 {member.study_program}</p>
                                                        
                                                        {/* Social Links */}
                                                        <div className="flex space-x-2">
                                                            {member.instagram && (
                                                                <a 
                                                                    href={member.instagram.startsWith('http') ? member.instagram : `https://instagram.com/${member.instagram}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm hover:scale-110 transition-transform"
                                                                >
                                                                    📷
                                                                </a>
                                                            )}
                                                            {member.linkedin && (
                                                                <a 
                                                                    href={member.linkedin.startsWith('http') ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm hover:scale-110 transition-transform"
                                                                >
                                                                    💼
                                                                </a>
                                                            )}
                                                            {member.twitter && (
                                                                <a 
                                                                    href={member.twitter.startsWith('http') ? member.twitter : `https://twitter.com/${member.twitter}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm hover:scale-110 transition-transform"
                                                                >
                                                                    🐦
                                                                </a>
                                                            )}
                                                            {member.email && (
                                                                <a 
                                                                    href={`mailto:${member.email}`}
                                                                    className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-white text-sm hover:scale-110 transition-transform"
                                                                >
                                                                    📧
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-6">👥</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Team Information Coming Soon
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                    We're updating our team profiles. Check back soon to meet our 
                                    dedicated student leaders at BEM FT UNWAHAS!
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

                {/* Contact Section */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Want to Join Our Team?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            We're always looking for passionate students who want to make a difference. 
                            Get involved with BEM FT UNWAHAS and help shape our academic community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={route('events.index')}>
                                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                    Join Our Events
                                </Button>
                            </a>
                            <a href="mailto:bem.ft@unwahas.ac.id">
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                    Contact Us
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
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
    sort_order: number;
}

interface Props {
    members: ManagementMember[];
    [key: string]: unknown;
}

export default function AdminMembersIndex({ members }: Props) {
    const handleDelete = (member: ManagementMember) => {
        if (confirm(`Are you sure you want to remove "${member.name}" from the team?`)) {
            router.delete(route('admin.members.destroy', member.id));
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <AppShell>
            <Head title="Manage Team Members - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            👥 Team Members
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your organization's leadership team
                        </p>
                    </div>
                    <Link href={route('admin.members.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            ✨ Add Member
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">{members.length}</div>
                        <div className="text-sm text-gray-600">Total Members</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {members.filter(m => m.position.includes('President')).length}
                        </div>
                        <div className="text-sm text-gray-600">Executive</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">
                            {members.filter(m => m.photo).length}
                        </div>
                        <div className="text-sm text-gray-600">With Photos</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">
                            {[...new Set(members.map(m => m.study_program))].length}
                        </div>
                        <div className="text-sm text-gray-600">Study Programs</div>
                    </div>
                </div>

                {/* Members Grid */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    {members.length > 0 ? (
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members.map((member) => (
                                    <div key={member.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                {member.photo ? (
                                                    <img 
                                                        src={member.photo} 
                                                        alt={member.name}
                                                        className="w-16 h-16 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                        {getInitials(member.name)}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm text-blue-600 font-medium">
                                                    {member.position}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    📚 {member.study_program}
                                                </p>
                                                
                                                {/* Social Links Count */}
                                                <div className="flex items-center mt-2 space-x-2">
                                                    {member.instagram && <span className="text-pink-500 text-xs">📷</span>}
                                                    {member.linkedin && <span className="text-blue-600 text-xs">💼</span>}
                                                    {member.twitter && <span className="text-blue-400 text-xs">🐦</span>}
                                                    {member.email && <span className="text-gray-600 text-xs">📧</span>}
                                                    <span className="text-xs text-gray-500">
                                                        Order: {member.sort_order}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                                            <Link href={route('admin.members.edit', member.id)}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleDelete(member)}
                                                className="text-red-600 border-red-200 hover:bg-red-50"
                                            >
                                                🗑️ Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No team members yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Add your first team member to start building your leadership roster.
                            </p>
                            <Link href={route('admin.members.create')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    ✨ Add First Member
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Study Program Breakdown */}
                {members.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            📚 Study Program Distribution
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(
                                members.reduce((acc, member) => {
                                    acc[member.study_program] = (acc[member.study_program] || 0) + 1;
                                    return acc;
                                }, {} as Record<string, number>)
                            ).sort(([,a], [,b]) => b - a).map(([program, count]) => (
                                <div key={program} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-900 truncate">{program}</span>
                                    <span className="text-sm font-bold text-blue-600 ml-2">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface EventRegistration {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    study_program: string;
    university: string;
    registered_at: string;
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
    registrations: {
        data: EventRegistration[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function AdminRegistrationsIndex({ registrations }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Study Program', 'University', 'Registration Date'];
        const csvContent = [
            headers.join(','),
            ...registrations.data.map(reg => [
                `"${reg.full_name}"`,
                `"${reg.email}"`,
                `"${reg.phone}"`,
                `"${reg.study_program}"`,
                `"${reg.university}"`,
                `"${formatDate(reg.registered_at)}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <AppShell>
            <Head title="Event Registrations - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🎪 Event Registrations
                        </h1>
                        <p className="text-gray-600 mt-2">
                            View and manage event registration submissions
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button 
                            onClick={exportToCSV}
                            variant="outline" 
                            className="border-green-200 text-green-600 hover:bg-green-50"
                            disabled={registrations.data.length === 0}
                        >
                            📊 Export CSV
                        </Button>
                        <Link href={route('events.index')}>
                            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                🌐 View Registration Form
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">{registrations.meta.total}</div>
                        <div className="text-sm text-gray-600">Total Registrations</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">
                            {registrations.data.filter(r => new Date(r.registered_at) > new Date(Date.now() - 24*60*60*1000)).length}
                        </div>
                        <div className="text-sm text-gray-600">Last 24 Hours</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">
                            {registrations.data.filter(r => new Date(r.registered_at) > new Date(Date.now() - 7*24*60*60*1000)).length}
                        </div>
                        <div className="text-sm text-gray-600">This Week</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">
                            {[...new Set(registrations.data.map(r => r.university))].length}
                        </div>
                        <div className="text-sm text-gray-600">Universities</div>
                    </div>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {registrations.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Participant</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Academic Info</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Registration Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {registrations.data.map((registration) => (
                                            <tr key={registration.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">
                                                            {registration.full_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            ID: #{registration.id}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-900">
                                                            📧 {registration.email}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            📱 {registration.phone}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            📚 {registration.study_program}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            🏫 {registration.university}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(registration.registered_at)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {registrations.links.length > 3 && (
                                <div className="px-6 py-4 border-t border-gray-100">
                                    <div className="flex justify-center">
                                        <nav className="flex space-x-2">
                                            {registrations.links.map((link, index: number) => (
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
                            <div className="text-6xl mb-6">🎪</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No registrations yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                When people register for events, their information will appear here.
                            </p>
                            <Link href={route('events.index')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    🌐 View Registration Form
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* University Breakdown */}
                {registrations.data.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            🏫 University Breakdown
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(
                                registrations.data.reduce((acc, reg) => {
                                    acc[reg.university] = (acc[reg.university] || 0) + 1;
                                    return acc;
                                }, {} as Record<string, number>)
                            ).sort(([,a], [,b]) => b - a).map(([university, count]) => (
                                <div key={university} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-900 truncate">{university}</span>
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
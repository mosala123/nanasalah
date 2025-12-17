'use client';

import { useState } from 'react';
import { FaChartBar, FaUsers, FaDonate, FaBell, FaClipboardList } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
        { id: 'users', label: 'Users', icon: <FaUsers /> },
        { id: 'donations', label: 'Donations', icon: <FaDonate /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'content', label: 'Content', icon: <FaClipboardList /> },
        { id: 'settings', label: 'Settings', icon: <IoSettings /> },
    ];

    const dashboardStats = [
        { label: 'Total Donations', value: '$25,000', change: '+12%', icon: '💰' },
        { label: 'Active Users', value: '1,247', change: '+8%', icon: '👥' },
        { label: 'Page Views', value: '8,453', change: '+23%', icon: '👀' },
        { label: 'Conversion Rate', value: '3.2%', change: '+1.2%', icon: '📈' },
    ];

    const recentActivities = [
        { time: '2 hours ago', action: 'New donation received', user: 'Sarah Ahmed' },
        { time: '4 hours ago', action: 'User registered', user: 'Muhammad Hassan' },
        { time: '1 day ago', action: 'Page content updated', user: 'Admin' },
        { time: '2 days ago', action: 'New message received', user: 'Contact Form' },
    ];

    return (
        <main className="min-h-screen bg-gray-100">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="Admin Dashboard"
                        subtitle="Site Management & Analytics (UI Only)"
                    />
                </div>
            </section>

            {/* Admin Navigation Tabs */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-amber-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 border-2 border-amber-200 hover:border-amber-400'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Stats */}
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {dashboardStats.map((stat, index) => (
                                <Card
                                    key={index}
                                    className="p-6 animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="text-4xl mb-4">{stat.icon}</div>
                                    <p className="text-gray-600 text-sm font-semibold mb-2">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-amber-700 mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-green-600 font-semibold text-sm">
                                        {stat.change}
                                    </p>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activities */}
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                Recent Activities
                            </h3>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {activity.action}
                                            </p>
                                            <p className="text-sm text-gray-600">{activity.user}</p>
                                        </div>
                                        <p className="text-gray-500 text-sm">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                User Management
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Sarah Ahmed', email: 'sarah@email.com', status: 'Active', joined: '2 months ago' },
                                    { name: 'Muhammad Hassan', email: 'muhammad@email.com', status: 'Active', joined: '1 month ago' },
                                    { name: 'Fatima Al-Rashid', email: 'fatima@email.com', status: 'Inactive', joined: '3 weeks ago' },
                                    { name: 'Ali Ibrahim', email: 'ali@email.com', status: 'Active', joined: '1 week ago' },
                                ].map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {user.status}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                Donation Records
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Sarah Ahmed', amount: '$50', date: 'Dec 15, 2024', status: 'Completed' },
                                    { name: 'Muhammad Hassan', amount: '$100', date: 'Dec 14, 2024', status: 'Completed' },
                                    { name: 'Fatima Al-Rashid', amount: '$75', date: 'Dec 10, 2024', status: 'Pending' },
                                    { name: 'Ali Ibrahim', amount: '$150', date: 'Dec 8, 2024', status: 'Completed' },
                                ].map((donation, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{donation.name}</p>
                                            <p className="text-sm text-gray-600">{donation.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-rose-600 text-lg">
                                                {donation.amount}
                                            </p>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${donation.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {donation.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                Notification Settings
                            </h3>
                            <div className="space-y-4">
                                {['Email Notifications', 'SMS Alerts', 'Push Notifications', 'Daily Digest'].map((setting, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <p className="font-semibold text-gray-800">{setting}</p>
                                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                Content Management
                            </h3>
                            <div className="space-y-3">
                                {['Home Page', 'About Page', 'Quran Section', 'Gallery Images', 'Blog Articles'].map((content, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <p className="font-semibold text-gray-800">{content}</p>
                                        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300">
                                            Edit
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="p-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-amber-900 mb-6">
                                System Settings
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Site Title', value: 'Sadaqa Jariya' },
                                    { label: 'Site Description', value: 'In Loving Memory' },
                                    { label: 'Contact Email', value: 'info@sadaqajariya.com' },
                                    { label: 'Support Phone', value: '+1 (555) 123-4567' },
                                ].map((setting, index) => (
                                    <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            {setting.label}
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={setting.value}
                                            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                                        />
                                    </div>
                                ))}
                                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300">
                                    Save Settings
                                </button>
                            </div>
                        </Card>
                    </div>
                </section>
            )}
        </main>
    );
}

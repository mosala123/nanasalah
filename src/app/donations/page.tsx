'use client';

import { useState } from 'react';
import { FaDonate, FaCheckCircle } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

const recentDonations = [
    {
        id: 1,
        name: 'سارة أحمد',
        amount: 50,
        message: 'يقبل الله منا ومنكم جميعاً',
        date: 'قبل يومين',
    },
    {
        id: 2,
        name: 'محمد حسن',
        amount: 100,
        message: 'في ذكرى روح طيبة',
        date: 'قبل أسبوع',
    },
    {
        id: 3,
        name: 'فاطمة الراشد',
        amount: 75,
        message: 'رحمة الله عليها',
        date: 'قبل أسبوعين',
    },
    {
        id: 4,
        name: 'علي إبراهيم',
        amount: 150,
        message: 'صدقة جارية',
        date: 'قبل شهر',
    },
    {
        id: 5,
        name: 'زينب خان',
        amount: 60,
        message: 'بكل الحب والاحترام',
        date: 'قبل شهر',
    },
    {
        id: 6,
        name: 'عمر محمد',
        amount: 90,
        message: 'يرحمها الله برحمته',
        date: 'قبل شهرين',
    },
];

export default function DonationsPage() {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', amount: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    const totalDonations = 25000;
    const goalAmount = 50000;
    const progressPercentage = (totalDonations / goalAmount) * 100;

    return (
        <main className="min-h-screen">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="ساهم في الخير"
                        subtitle="كل تبرع يهم"
                    />
                </div>
            </section>

            {/* Donation Summary Card */}
            <section className="px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 bg-gradient-to-br from-rose-50 to-amber-50 animate-scale-zoom-in">
                        <div className="flex items-center gap-3 mb-6">
                            <FaDonate className="text-3xl text-rose-600" />
                            <h2 className="text-3xl font-bold text-amber-900">
                                هدف التبرع
                            </h2>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700 font-semibold">
                                    تم جمع: {totalDonations.toLocaleString()} ر.س
                                </span>
                                <span className="text-gray-600">
                                    الهدف: {goalAmount.toLocaleString()} ر.س
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-rose-400 to-rose-600 h-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                ></div>
                            </div>
                            <p className="text-center text-gray-600 mt-2 font-semibold">
                                {Math.round(progressPercentage)}% مكتمل
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Donation Form & Recent Donations */}
            <section className="px-4 md:px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Form */}
                        <Card className="p-8 animate-slide-in-left">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                تبرع الآن
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        اسمك
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 transition-colors duration-300 text-right"
                                        placeholder="أدخل اسمك"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        مبلغ التبرع (ريال)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 transition-colors duration-300 text-right"
                                        placeholder="أدخل المبلغ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        رسالة (اختياري)
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 transition-colors duration-300 resize-none text-right"
                                        rows={4}
                                        placeholder="شارك أفكارك..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <FaDonate className="inline ml-2" /> تبرع الآن
                                </button>
                            </form>

                            {submitted && (
                                <div className="mt-6 p-4 bg-green-100 border-r-4 border-green-600 rounded animate-fade-in">
                                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                                        <FaCheckCircle /> تم استقبال التبرع! شكراً لك
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Recent Donations */}
                        <div className="animate-slide-in-right">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                التبرعات الأخيرة
                            </h2>
                            <div className="space-y-4 max-h-96 overflow-y-auto pl-2">
                                {recentDonations.map((donation, index) => (
                                    <Card
                                        key={donation.id}
                                        className="p-4 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-amber-900">
                                                {donation.name}
                                            </h3>
                                            <span className="text-rose-600 font-bold text-lg">
                                                ${donation.amount}
                                            </span>
                                        </div>
                                        {donation.message && (
                                            <p className="text-gray-600 text-sm mb-2 italic">
                                                "{donation.message}"
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-xs">{donation.date}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="px-4 md:px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="تأثيرك"
                        subtitle="انظر كيف يخلق تبرعك التغيير الدائم"
                    />
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: '📚',
                                title: 'الدعم التعليمي',
                                description: 'تمويل المنح الدراسية والموارد التعليمية',
                            },
                            {
                                icon: '🏥',
                                title: 'المبادرات الصحية',
                                description: 'دعم برامج المساعدة الطبية',
                            },
                            {
                                icon: '🤝',
                                title: 'رعاية المجتمع',
                                description: 'تقديم المساعدة للأسر المحتاجة',
                            },
                        ].map((impact, index) => (
                            <Card
                                key={index}
                                className="p-6 text-center animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-5xl mb-4">{impact.icon}</div>
                                <h3 className="text-xl font-bold text-amber-900 mb-2">
                                    {impact.title}
                                </h3>
                                <p className="text-gray-600">{impact.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

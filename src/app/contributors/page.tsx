'use client';

import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function ContributorsPage() {
    const contributors = [
        {
            id: 1,
            name: 'محمد صلاح   ',
            role: 'المؤسسة',
            contribution: 'الرؤية والقيادة',
            icon: '👑',
        },
        
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="مساهمونا الكرام"
                        subtitle="الأشخاص الرائعون خلف هذه الرسالة النبيلة"
                    />
                </div>
            </section>

            {/* Contributors Grid */}
            <section className="px-4 md:px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="تعرّف على الفريق"
                        subtitle="أشخاص مكرسون لإحداث فرق إيجابي"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contributors.map((contributor, index) => (
                            <Card
                                key={contributor.id}
                                className="p-6 text-center animate-fade-in"
                                style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                            >
                                <div className="text-6xl mb-4">{contributor.icon}</div>
                                <h3 className="text-xl font-bold text-amber-900 mb-1">
                                    {contributor.name}
                                </h3>
                                <p className="text-rose-600 font-semibold mb-3">
                                    {contributor.role}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {contributor.contribution}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join the Mission */}
            <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-amber-50 to-rose-50">
                <div className="max-w-4xl mx-auto text-center animate-slide-up">
                    <h2 className="text-4xl font-bold text-amber-900 mb-6">
                        انضم إلى رسالتنا
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        نحن نبحث دائماً عن أشخاص شغوفين للانضمام إلى فريقنا.
                        سواء كنت مطوراً أو مصمماً أو كاتباً أو شخصاً يريد إحداث فرق، نود أن نسمع منك!
                    </p>
                    <button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg">
                        شارك معنا
                    </button>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="px-4 md:px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="تأثيرنا معاً" />

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '👥', label: 'أعضاء الفريق', value: '50+' },
                            { icon: '🌍', label: 'دول وصلنا إليها', value: '12' },
                            { icon: '💝', label: 'أرواح مسنا', value: '1000+' },
                            { icon: '⭐', label: 'التقييم', value: '4.9/5' },
                        ].map((stat, index) => (
                            <Card
                                key={index}
                                className="p-6 text-center animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-5xl mb-4">{stat.icon}</div>
                                <p className="text-gray-600 font-semibold mb-2">
                                    {stat.label}
                                </p>
                                <p className="text-4xl font-bold text-amber-700">{stat.value}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

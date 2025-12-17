'use client';

import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function RewardsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="ثواب الصدقة"
                        subtitle="الوعد الإلهي للصدقة الجارية"
                    />
                </div>
            </section>

            {/* Islamic References */}
            <section className="px-4 md:px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="مفهوم الصدقة الجارية"
                        subtitle="الخير المستمر الذي يتجاوز الزمن"
                    />

                    <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
                        <Card className="p-8 text-right">
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                الصدقة الجارية هي العمل الخيري الذي يستمر نفعه بعد وفاة المتصدق.
                                وهي من أفضل أشكال العطاء في التقاليد الإسلامية.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                قال رسول الله صلى الله عليه وسلم: "إذا مات ابن آدم انقطع عمله إلا من ثلاث:
                                صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له"
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Rewards Grid */}
            <section className="px-4 md:px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="أنواع الصدقة الجارية"
                        subtitle="طرق لإحداث تأثير إيجابي دائم"
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: '📚',
                                title: 'العلم والتعليم',
                                description: 'دعم المدارس والمنح الدراسية والموارد التعليمية',
                            },
                            {
                                icon: '🏥',
                                title: 'المرافق الصحية',
                                description: 'بناء المستشفيات والعيادات التي تخدم المجتمعات',
                            },
                            {
                                icon: '💧',
                                title: 'آبار المياه',
                                description: 'توفير المياه النظيفة للمحتاجين',
                            },
                            {
                                icon: '🌳',
                                title: 'الأشجار والبيئة',
                                description: 'غرس الأشجار التي تستمر في نفع الأجيال',
                            },
                            {
                                icon: '🏠',
                                title: 'المأوى والمنازل',
                                description: 'بناء بيوت آمنة للعائلات المحتاجة',
                            },
                            {
                                icon: '📖',
                                title: 'العلم الديني',
                                description: 'دعم التعليم الإسلامي والبرامج المجتمعية',
                            },
                        ].map((reward, index) => (
                            <Card
                                key={index}
                                className="p-8 animate-fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="text-5xl mb-4">{reward.icon}</div>
                                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                                    {reward.title}
                                </h3>
                                <p className="text-gray-600 text-right">{reward.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spiritual Benefits */}
            <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="الفوائد الروحية"
                        subtitle="كيف تثري الصدقة الروح"
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                benefit: 'تطهير النفس',
                                description: 'الصدقة تنقي القلب من الطمع والأنانية',
                            },
                            {
                                benefit: 'البركة الإلهية',
                                description: 'الله يضاعف أجر المتصدقين',
                            },
                            {
                                benefit: 'السلام الداخلي',
                                description: 'الكرم يجلب الراحة والرضا',
                            },
                            {
                                benefit: 'الإرث الأبدي',
                                description: 'أعمالك الصالحة تستمر في نفع الآخرين',
                            },
                            {
                                benefit: 'ربط المجتمع',
                                description: 'بناء علاقات من التعاطف مع المجتمع',
                            },
                            {
                                benefit: 'الشفاعة',
                                description: 'الصدقة تشفع لك يوم القيامة',
                            },
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="p-6 text-center animate-fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <h3 className="text-lg font-bold text-blue-900 mb-2">
                                    {item.benefit}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quranic Verses */}
            <section className="px-4 md:px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="الإلهام القرآني"
                        subtitle="الحكمة الإلهية حول الصدقة والعطاء"
                    />

                    <div className="space-y-6">
                        {[
                            {
                                verse: '(2:261)',
                                text: 'مثل الذين ينفقون أموالهم في سبيل الله كمثل حبة أنبتت سبع سنابل في كل سنبلة مئة حبة',
                            },
                            {
                                verse: '(9:103)',
                                text: 'خذ من أموالهم صدقة تطهرهم وتزكيهم بها',
                            },
                            {
                                verse: '(51:19)',
                                text: 'وفي أموالهم حق للسائل والمحروم',
                            },
                        ].map((quote, index) => (
                            <Card
                                key={index}
                                className="p-6 border-l-4 border-green-600 animate-fade-in text-right"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <p className="text-2xl text-green-700 font-bold mb-3">
                                    {quote.verse}
                                </p>
                                <p className="text-lg text-gray-700 italic">{quote.text}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

const adhkarData = {
    morning: [
        {
            id: 1,
            arabic: 'الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور',
            translation: 'سبحانه الذي أعطانا الحياة وإليه سننقلب',
            repeat: 1,
            category: 'morning',
            times: 'مرة واحدة',
            benefits: 'من قالها حين يصبح أُجير من الجن حتى يمسي، ومن قالها حين يمسي أُجير من الجن حتى يصبح'
        },
        {
            id: 2,
            arabic: 'أصبحنا وأصبح الملك لله والحمد لله',
            translation: 'أصبحنا وأصبح الملك ملك الله والحمد لله على كل حال',
            repeat: 1,
            category: 'morning',
            times: 'مرة واحدة',
            benefits: 'من قالها في الصباح كُتب له أجر عشر حسنات ومحي عنه عشر سيئات'
        },
        {
            id: 3,
            arabic: 'اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت',
            translation: 'اللهم بعونك نبدأ يومنا وبحمايتك ننهيه',
            repeat: 1,
            category: 'morning',
            times: 'مرة واحدة',
            benefits: 'من قالها حين يصبح أو يمسي كفاه الله ما أهمه من أمر الدنيا والآخرة'
        },
        {
            id: 12,
            arabic: 'رضيت بالله رباً وبالإسلام ديناً وبمحمد صلى الله عليه وسلم نبياً',
            translation: 'أعلن الرضا بالله ورسوله ودينه',
            repeat: 3,
            category: 'morning',
            times: 'ثلاث مرات',
            benefits: 'من قالها ثلاثاً حين يصبح وثلاثاً حين يمسي كان حقاً على الله أن يرضيه يوم القيامة'
        },
        {
            id: 13,
            arabic: 'اللهم إني أصبحت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك أنك أنت الله لا إله إلا أنت',
            translation: 'شهادة لله بالتوحيد في بداية اليوم',
            repeat: 4,
            category: 'morning',
            times: 'أربع مرات',
            benefits: 'من قالها أربع مرات حين يصبح أعتقه الله من النار'
        },
        {
            id: 14,
            arabic: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم',
            translation: 'تفويض الأمر لله والاعتماد عليه',
            repeat: 7,
            category: 'morning',
            times: 'سبع مرات',
            benefits: 'من قالها كفاه الله ما أهمه من أمر الدنيا والآخرة'
        },
    ],

    evening: [
        {
            id: 4,
            arabic: 'أمسينا وأمسى الملك لله والحمد لله',
            translation: 'أمسينا وأمسى الملك ملك الله والحمد لله على كل حال',
            repeat: 1,
            category: 'evening',
            times: 'مرة واحدة',
            benefits: 'من قالها في المساء كُتب له أجر عشر حسنات ومحي عنه عشر سيئات'
        },
        {
            id: 5,
            arabic: 'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام',
            translation: 'يا إلهنا أنت مصدر السلام وإليك يعود',
            repeat: 1,
            category: 'evening',
            times: 'مرة واحدة',
            benefits: 'من قالها حين يمسي أو يصبح كفاه الله ما أهمه'
        },
        {
            id: 6,
            arabic: 'يا عزيز يا غفار اغفر لي ذنوبي وإسرافي في أمري',
            translation: 'يا الله اغفر لنا ما مضى وما قصرنا فيه',
            repeat: 1,
            category: 'evening',
            times: 'مرة واحدة',
            benefits: 'من دعا بهذا الدعاء غفر الله له ذنوبه وإن كانت مثل زبد البحر'
        },
        {
            id: 15,
            arabic: 'اللهم إني أمسيت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك أنك أنت الله لا إله إلا أنت',
            translation: 'شهادة المساء لله بالتوحيد',
            repeat: 4,
            category: 'evening',
            times: 'أربع مرات',
            benefits: 'من قالها أربع مرات حين يمسي أعتقه الله من النار'
        },
        {
            id: 16,
            arabic: 'اللهم إنك عفو تحب العفو فاعفُ عني',
            translation: 'طلب العفو والمغفرة من الله',
            repeat: 3,
            category: 'evening',
            times: 'ثلاث مرات',
            benefits: 'من قالها ثلاث مرات في المساء غفر الله له ذنوبه وإن كانت مثل زبد البحر'
        },
        {
            id: 17,
            arabic: 'اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك',
            translation: 'الاعتراف بأن النعم كلها من الله',
            repeat: 1,
            category: 'evening',
            times: 'مرة واحدة',
            benefits: 'من قالها حين يمسي أدى شكر يومه'
        },
    ],

    sleep: [
        {
            id: 7,
            arabic: 'باسمك ربي وضعت جنبي وبك أرفعه',
            translation: 'أتوكّل عليك يا الله عند النوم والاستيقاظ',
            repeat: 1,
            category: 'sleep',
            times: 'مرة واحدة',
            benefits: 'من قالها عند نومه ثم مات مات على الفطرة'
        },
        {
            id: 8,
            arabic: 'اللهم قني عذابك يوم تبعث عبادك',
            translation: 'اللهم احفظني يوم القيامة',
            repeat: 1,
            category: 'sleep',
            times: 'مرة واحدة',
            benefits: 'من قالها ثلاثاً عند نومه وكّل الله به ملكاً يحفظه حتى يستيقظ'
        },
        {
            id: 18,
            arabic: 'اللهم أسلمت نفسي إليك وفوضت أمري إليك',
            translation: 'تسليم الأمر لله قبل النوم',
            repeat: 1,
            category: 'sleep',
            times: 'مرة واحدة',
            benefits: 'من قالها عند نومه ثم مات مات على الإسلام'
        },
        {
            id: 19,
            arabic: 'سبحان الله ٣٣ والحمد لله ٣٣ والله أكبر ٣٤',
            translation: 'ذكر النوم الذي أوصى به النبي فاطمة رضي الله عنها',
            repeat: 1,
            category: 'sleep',
            times: 'مرة واحدة (مائة مرة)',
            benefits: 'من قالها عند نومه غفرت ذنوبه وإن كانت مثل زبد البحر'
        },
    ],

    general: [
        {
            id: 9,
            arabic: 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر',
            translation: 'ذكر جامع للتسبيح والتهليل',
            repeat: 1,
            category: 'general',
            times: 'مرة واحدة',
            benefits: 'أحب الكلام إلى الله تعالى'
        },
        {
            id: 10,
            arabic: 'لا حول ولا قوة إلا بالله العلي العظيم',
            translation: 'لا قوة ولا قدرة إلا بالله',
            repeat: 1,
            category: 'general',
            times: 'مرة واحدة',
            benefits: 'كنز من كنوز الجنة'
        },
        {
            id: 11,
            arabic: 'استغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه',
            translation: 'طلب المغفرة من الله عن كل الذنوب',
            repeat: 3,
            category: 'general',
            times: 'ثلاث مرات',
            benefits: 'من قالها غفر الله له وإن كان فاراً من الزحف'
        },
        {
            id: 20,
            arabic: 'سبحان الله وبحمده',
            translation: 'تسبيح لله وثناء عليه',
            repeat: 100,
            category: 'general',
            times: 'مائة مرة',
            benefits: 'من قالها في يوم مائة مرة حُطت خطاياه وإن كانت مثل زبد البحر'
        },
        {
            id: 21,
            arabic: 'اللهم ارزقني علماً نافعاً ورزقاً طيباً وعملاً متقبلاً',
            translation: 'دعاء جامع للعلم والرزق والعمل',
            repeat: 1,
            category: 'general',
            times: 'مرة واحدة',
            benefits: 'من داوم عليه يرزقه الله علماً نافعاً ورزقاً واسعاً'
        },
        {
            id: 22,
            arabic: 'حسبي الله ونعم الوكيل',
            translation: 'تفويض الأمر لله فهو خير من يُوكَل إليه',
            repeat: 1,
            category: 'general',
            times: 'مرة واحدة',
            benefits: 'من قالها حين يهم بالأمر كفاه الله ما أهمه'
        },
    ],
};

export default function AdhkarPage() {
    const [activeCategory, setActiveCategory] = useState<'morning' | 'evening' | 'sleep' | 'general'>('morning');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAdhkar = adhkarData[activeCategory as keyof typeof adhkarData].filter(
        (dhikr) =>
            dhikr.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dhikr.arabic.includes(searchTerm)
    );

    const categories: { id: 'morning' | 'evening' | 'sleep' | 'general'; label: string }[] = [
        { id: 'morning', label: 'أذكار الصباح' },
        { id: 'evening', label: 'أذكار المساء' },
        { id: 'sleep', label: 'أذكار النوم' },
        { id: 'general', label: 'أذكار عامة' },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="الأذكار والأدعية"
                        subtitle="أدعية وأذكار للحياة اليومية"
                    />
                </div>
            </section>

            {/* Category Tabs */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setSearchTerm('');
                                }}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                    : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <input
                            type="text"
                            placeholder="ابحث عن ذكر..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-amber-200 focus:outline-none focus:border-amber-500 transition-colors duration-300 text-right cursor-text"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" />
                    </div>

                    {/* Dhikr Cards - Grid Layout 2 per row */}
                    <div className="grid md:grid-cols-2 gap-5 mb-8 mt-10">
                        {filteredAdhkar.map((dhikr, index) => (
                            <Card
                                key={dhikr.id}
                                className="p-6 animate-fade-in border-r-4 border-amber-500 hover:shadow-lg transition-all duration-300"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="space-y-4">
                                    {/* Arabic Text */}
                                    <p className="text-2xl font-bold text-amber-900 text-right leading-loose">
                                        {dhikr.arabic}
                                    </p>

                                    {/* Translation */}
                                    <p className="text-gray-700 text-lg leading-relaxed italic border-r-2 border-amber-300 pr-3">
                                        "{dhikr.translation}"
                                    </p>

                                    {/* Repetition Count */}
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                        <p className="text-amber-800 font-bold">
                                            <span className="text-amber-600">عدد المرات:</span> {dhikr.times}
                                        </p>
                                    </div>

                                    {/* Benefits */}
                                    {dhikr.benefits && (
                                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                            <p className="text-green-800">
                                                <span className="text-green-600 font-bold">فضائل الذكر:</span> {dhikr.benefits}
                                            </p>
                                        </div>
                                    )}

                                    {/* Decorative Element */}
                                    <div className="flex justify-end">
                                        <span className="text-amber-700 text-sm font-semibold bg-amber-100 px-3 py-1 rounded-full">
                                            {dhikr.category === 'morning' && '☀️ أذكار الصباح'}
                                            {dhikr.category === 'evening' && '🌙 أذكار المساء'}
                                            {dhikr.category === 'sleep' && '😴 أذكار النوم'}
                                            {dhikr.category === 'general' && '✨ أذكار عامة'}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredAdhkar.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">
                                لم يتم العثور على أذكار. حاول بحثاً مختلفاً.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 md:px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="فوائد الأذكار"
                        subtitle="الفوائد الروحية والنفسية لذكر الله"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'راحة النفس',
                                description: 'تجلب السكينة والطمأنينة للقلب وتزيل الهم والغم',
                                icon: '🧘'
                            },
                            {
                                title: 'النمو الروحي',
                                description: 'تقوي الصلة بالله تعالى وترفع الدرجات في الجنة',
                                icon: '🕌'
                            },
                            {
                                title: 'حفظ الإنسان',
                                description: 'تحفظ الإنسان من الشيطان وتقيه من الشرور والأذى',
                                icon: '🛡️'
                            },
                            {
                                title: 'غفران الذنوب',
                                description: 'تمحو الخطايا والذنوب وتكون سبباً في مغفرة الله تعالى',
                                icon: '✨'
                            },
                        ].map((benefit, index) => (
                            <Card
                                key={index}
                                className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">{benefit.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-900 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important Note Section */}
            <section className="px-4 md:px-6 py-8 bg-amber-50">
                <div className="max-w-7xl mx-auto">
                    <Card className="p-6 bg-gradient-to-r from-amber-100 to-orange-50 border-2 border-amber-300">
                        <div className="flex items-start gap-4">
                            <div className="bg-amber-500 text-white p-3 rounded-full">
                                <span className="text-xl">💡</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-amber-900 mb-3">
                                    ملاحظات مهمة:
                                </h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">•</span>
                                        <span>يستحب الإكثار من الأذكار في جميع الأوقات</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">•</span>
                                        <span>الأذكار تقال بصوت خافت ولا يشترط الجهر بها</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">•</span>
                                        <span>يستحب الدوام على الأذكار وعدم تركها</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">•</span>
                                        <span>الأذكار تحصن المسلم وتقيه من الشرور</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </main>
    );
}
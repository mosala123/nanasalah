'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import HeroBanner from '../components/HeroBanner';

// Beautiful Quranic verses for rotation
const quranicVerses = [
  {
    text: 'الصَّدَقَةُ لَا تُخِفِّفُ الْمَالَ',
    surah: 'صحيح مسلم',
    meaning: 'الصدقة لا تنقص المال',
  },
  {
    text: 'خَيْرُ الْمَالِ مَا أُنْفِقَ',
    surah: 'الأثر',
    meaning: 'أفضل المال ما تم إنفاقه في سبيل الله',
  },
  {
    text: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ',
    surah: 'صحيح مسلم',
    meaning: 'الإيمان القوي المصحوب بالعمل أفضل وأحب إلى الله',
  },
  {
    text: 'مَنْ سَرَّهُ أَنْ يَرَى اللَّهَ يَوْمَ الْقِيَامَةِ فَلْيَسْتَكْثِرْ مِنَ التَّطَوُّعِ',
    surah: 'الأثر',
    meaning: 'من أراد لقاء الله يوم القيامة فليكثر من العمل الصالح',
  },
  {
    text: 'مَا الدُّنْيَا إِلَّا مَتَاعٌ وَإِنَّ خَيْرَ الْمَتَاعِ التَّقْوَى',
    surah: 'سورة آل عمران',
    meaning: 'الدنيا إلا متاع زائل والتقوى هي الخير الحقيقي',
  },
  {
    text: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى',
    surah: 'سورة المائدة',
    meaning: 'تعاونوا على فعل الخير والتقوى',
  },
  {
    text: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    surah: 'سورة البقرة',
    meaning: 'الله تعالى مع الصابرين في محنهم',
  },
  {
    text: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',
    surah: 'سورة البقرة',
    meaning: 'الله قريب من عبده الداعي',
  },
  {
    text: 'الدُّعَاءُ سِلَاحُ الْمُؤْمِنِ',
    surah: 'الحديث الشريف',
    meaning: 'الدعاء هو سلاح المؤمن في كل أحواله',
  },
  {
    text: 'مَنْ عَمِلَ صَالِحًا مِنْ ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً',
    surah: 'سورة النحل',
    meaning: 'من يعمل عملاً صالحاً مع الإيمان فله حياة طيبة',
  },
];

const duas = [
  'اللهم اجعل هذا العمل خالصاً لوجهك الكريم، وتقبله منا بقبول حسن',
  'اللهم ارحم روحها برحمتك الواسعة، وأسكنها فسيح جناتك',
  'اللهم اغفر لها وارحمها، وعافها واعف عنها، وأكرم نزلها ووسع مدخلها',
  'اللهم اجعل قبرها روضة من رياض الجنة، ولا تجعله حفرة من حفر النار',
  'اللهم أنر عليها قبرها، وافسح لها في قبرها، واجعلها من أهل الفردوس الأعلى',
  'اللهم اجمعنا وإياها في جنات النعيم، تحت عرشك الكريم',
  'اللهم إنها قد رحلت عنا، فأبدلها داراً خيراً من دارها، وأهلأ خيراً من أهلها',
  'اللهم اجعل ثواب ما نقدمه لها في ميزان حسناتها، وزِدها به درجة وقرباً عندك',
  'اللهم اكتب لها الأجر والمغفرة، والرضوان والجنة',
  'اللهم اجعلها من الذين قال فيهم: "عَيْناً قَاعِدَةٌ عِنْدَ رَبِّهَا نَاعِمَةٌ"',
  'اللهم اجعل عملي هذا صدقة جارية ترفع درجاتها في عليين',
  'اللهم انقلها من ضيق اللحود إلى سعة الجنان، ومن ظلمة القبور إلى نور العرش',
  'اللهم أبدلها بعد خوفها أمناً، وبعد وحشتها أنساً، وبعد ظلمتها نوراً',
  'اللهم احفظها من عذاب القبر، ونجها من فتنته وظلمته ووحشته',
  'اللهم ارزقها شفاعة نبيك محمد صلى الله عليه وسلم',
  'اللهم أدخلها الجنة بغير حساب ولا عذاب',
  'اللهم اجمع شملنا بها في دار كرامتك، حيث لا فراق ولا حزن ولا تعب',
  'اللهم اجعل قبرها بستاناً من بساتين الجنة، وثبتها عند السؤال',
  'اللهم اكتب لها الرحمة والمغفرة، واكتب لنا الصبر والسلوان',
  'اللهم تقبل منا ومنها صالح الأعمال، وارحمنا برحمتك يا أرحم الراحمين',
];

export default function Home() {
  const [daysSincePassing, setDaysSincePassing] = useState(0);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);

  useEffect(() => {
    // حساب الأيام منذ يوم الرحيل: 29/10/2021
    const passingDate = new Date('2021-10-29');
    const today = new Date();
    const diffTime = Math.abs(today - passingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSincePassing(diffDays);

    // حساب الأيام حتى عيد الميلاد القادم (17 يناير)
    const nextBirthday = new Date(today.getFullYear(), 0, 17); // 0 = يناير
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime2 = Math.abs(nextBirthday - today);
    const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
    setDaysUntilBirthday(diffDays2);
  }, []);

  // تدوير الآيات كل 6 ثوانٍ
  useEffect(() => {
    const verseTimer = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % quranicVerses.length);
    }, 6000);
    return () => clearInterval(verseTimer);
  }, []);

  // تدوير الأدعية كل 8 ثوانٍ
  useEffect(() => {
    const duaTimer = setInterval(() => {
      setCurrentDuaIndex((prev) => (prev + 1) % duas.length);
    }, 8000);
    return () => clearInterval(duaTimer);
  }, []);

  const stats = [
    { icon: '📅', label: 'يوم الرحيل', value: '29/10/2021', unit: '' },
    { icon: '⏳', label: 'أيام منذ الرحيل', value: daysSincePassing, unit: 'يوم' },
    { icon: '🎂', label: 'عيد الميلاد', value: '17 يناير', unit: '' },
  ];

  const quickActions = [
    {
      label: 'التبرعات والعطاء',
      href: '/donations',
      color: 'from-rose-500 to-rose-700',
      description: 'ساهم في الصدقة الجارية والبرامج الخيرية'
    },
    {
      label: 'القرآن الكريم',
      href: '/quran',
      color: 'from-green-500 to-green-700',
      description: 'استمع وتدبر آيات القرآن الكريم'
    },
    {
      label: 'الأذكار اليومية',
      href: '/adhkar',
      color: 'from-blue-500 to-blue-700',
      description: 'حصن نفسك بأذكار الصباح والمساء'
    },
    {
      label: 'التذكيرات',
      href: '/dailyReminder',
      color: 'from-amber-500 to-amber-700',
      description: 'تذكيرات يومية للعمل الصالح'
    },
    {
      label: 'المكافآت',
      href: '/rewards',
      color: 'from-purple-500 to-purple-700',
      description: 'حسنات وأجور الأعمال الصالحة'
    },
    {
      label: 'اتصل بنا',
      href: '/contact',
      color: 'from-teal-500 to-teal-700',
      description: 'للاقتراحات والاستفسارات'
    },
  ];

  const previewCards = [
    {
      title: 'القرآن الكريم',
      description: 'تلاوات قرآنية بتلاوات متنوعة وكاملة، مع إمكانية الاستماع والتحميل',
      href: '/quran',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    {
      title: 'الأذكار والدعاء',
      description: 'أذكار الصباح والمساء وأدعية مأثورة من القرآن والسنة',
      href: '/adhkar',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100'
    },
    {
      title: 'التبرعات',
      description: 'مشاريع خيرية وصدقات جارية باسم الفقيدة لتكون في ميزان حسناتها',
      href: '/donations',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100'
    },
    {
      title: 'التذكيرات',
      description: 'تذكيرات يومية بأعمال الخير والأجور المضاعفة في أوقات مخصوصة',
      href: '/dailyreminder',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100'
    },
    {
      title: 'عن الفقيدة',
      description: 'تعرف على سيرة الفقيدة وأخلاقها وذكراها الطيبة',
      href: '/about',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100'
    },
    {
      title: 'المساهمون',
      description: 'قائمة المحسنين الذين ساهموا في إنجاح هذا المشروع الخيري',
      href: '/contributors',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100'
    },
  ];

  const siteGoals = [
    {
      title: 'التعريف بالفقيدة',
      description: 'نشر سيرة الفقيدة وذكراها الطيبة ليكون قدوة للأحياء'
    },
    {
      title: 'الصدقة الجارية',
      description: 'إنشاء مشاريع خيرية مستمرة تكون صدقة جارية لها'
    },
    {
      title: 'التوعية الدينية',
      description: 'نشر العلم الشرعي والتذكير بالآخرة والعمل الصالح'
    },
    {
      title: 'تذكير الأحياء',
      description: 'تذكير الناس بأهمية الإحسان والمسارعة في الخيرات'
    },
    {
      title: 'توحيد الجهود',
      description: 'جمع المحسنين على عمل خيري واحد باسم الفقيدة'
    },
    {
      title: 'الدعاء المستمر',
      description: 'توفير منصة لدعاء المسلمين لها بشكل مستمر'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="صدقة جارية"
            subtitle="في ذكرى روح طاهرة - إرث من العطاء والخير المستمر"
            additionalText="مشروع خيري لذكرى الفقيدة التي انتقلت إلى رحمة الله بتاريخ 29/10/2021"
          />
        </div>
      </section>

      {/* Rotating Quranic Verse */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="text-center">
              <div className="mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
                  آية كريمة
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-emerald-900 mb-4 leading-relaxed">
                "{quranicVerses[currentVerseIndex].text}"
              </p>
              <p className="text-emerald-700 font-semibold mb-2">
                {quranicVerses[currentVerseIndex].surah}
              </p>
              <p className="text-emerald-600 text-sm">
                {quranicVerses[currentVerseIndex].meaning}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Rotating Dua */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="text-center">
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  دعاء للميت
                </span>
              </div>
              <p className="text-lg md:text-xl font-bold text-blue-900 leading-relaxed">
                {duas[currentDuaIndex]}
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-blue-700 text-sm">
                  أدعوا لها بالرحمة والمغفرة، فهذا من أفضل ما تقدمه للميت
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
   <section className="px-4 md:px-6 py-12">
  <div className="max-w-7xl mx-auto flex justify-center">
    
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-6 place-items-center"  >
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="w-full max-w-[160px] h-full min-h-[180px] 
                     flex flex-col justify-center text-center p-4 px-6 
                     animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-3xl mb-4 flex justify-center">
            {stat.icon}
          </div>

          <p className="text-gray-600 text-s mb-1">
            {stat.label}
          </p>

          <p className="text-2xl font-bold text-amber-700 mb-1">
            {stat.value}
          </p>

          {stat.unit && (
            <p className="text-gray-500 text-s mt-1">
              {stat.unit}
            </p>
          )}
        </Card>
      ))}
    </div>

  </div>
</section>


      {/* Quick Action Buttons */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="روابط سريعة"
            subtitle="انتقل مباشرة إلى أقسام الموقع المختلفة"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex flex-col items-center justify-center gap-2 text-center h-full`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-sm font-bold">{action.label}</span>
                <span className="text-xs opacity-90">{action.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Site Goals Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="أهداف الموقع"
            subtitle="رسالتنا وغاياتنا من هذا المشروع الخيري"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteGoals.map((goal, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Cards Section */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="اكتشف أقسام الموقع"
            subtitle="محتوى غني يعود بالنفع على الأحياء والأموات"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewCards.map((preview, index) => (
              <Link key={index} href={preview.href}>
                <Card className={`h-full p-6 cursor-pointer flex flex-col ${preview.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {preview.title}
                  </h3>
                  <p className="text-gray-600 flex-grow mb-4 text-sm leading-relaxed">
                    {preview.description}
                  </p>
                  <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm hover:gap-3 transition-all duration-300 mt-auto">
                    <FaArrowLeft /> ابدأ الاستكشاف
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            شارك في بناء الإرث الخيري
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            كل تبرع، كل دعاء، كل ذكر هو لبنة في بناء صدقة جارية ترفع درجات الفقيدة 
            وتعود بالخير على المحسن في الدنيا والآخرة. كن شريكاً في هذا الأجر العظيم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donations"
              className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              تبرع باسمها
            </Link>
            <Link
              href="/adhkar"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ادعُ لها
            </Link>
          </div>
          <p className="text-amber-800 text-sm mt-6">
            "ما يلفظ من قول إلا لديه رقيب عتيد"
          </p>
        </div>
      </section>
    </main>
  );
}
'use client';

import HeroBanner from '@/components/HeroBanner';
import Link from 'next/link';

// Components
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">{title}</h2>
    {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-white rounded-2xl shadow-md ${className}`} style={style}>
    {children}
  </div>
);

 
export default function SupplicationsPage() {
  const duas = [
    {
      text: 'اللهم اغفر لها وارحمها وعافها واعف عنها وأكرم نزلها ووسع مدخلها',
      category: 'للميت'
    },
    {
      text: 'اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل',
      category: 'عامة'
    },
    {
      text: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار',
      category: 'قرآنية'
    },
    {
      text: 'اللهم اجعل قبرها روضة من رياض الجنة ولا تجعله حفرة من حفر النار',
      category: 'للميت'
    },
    {
      text: 'اللهم ألهمنا الصبر والسلوان واجعل ما أصابنا في ميزان حسناتنا',
      category: 'عامة'
    },
    {
      text: 'اللهم ارحمها برحمتك الواسعة واغسلها بالماء والثلج والبرد',
      category: 'للميت'
    },
    {
      text: 'ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إماما',
      category: 'قرآنية'
    },
    {
      text: 'اللهم تقبل منا صالح الأعمال واجعلها خالصة لوجهك الكريم',
      category: 'عامة'
    },
    {
      text: 'اللهم نور قبرها واجعله روضة من رياض الجنة',
      category: 'للميت'
    },
    {
      text: 'ربنا لا تزغ قلوبنا بعد إذ هديتنا وهب لنا من لدنك رحمة إنك أنت الوهاب',
      category: 'قرآنية'
    },
    {
      text: 'اللهم اجعل عملنا الصالح نوراً ينير قبرها ويرفع درجتها',
      category: 'للميت'
    },
    {
      text: 'اللهم إني أعوذ بك من عذاب القبر ومن عذاب جهنم ومن فتنة المحيا والممات',
      category: 'عامة'
    },
  ];

  const duaTimes = [
    {
      title: 'الثلث الأخير من الليل',
      description: 'ينزل ربنا إلى السماء الدنيا فيقول: من يدعوني فأستجيب له'
    },
    {
      title: 'بين الأذان والإقامة',
      description: 'الدعاء بين الأذان والإقامة لا يرد'
    },
    {
      title: 'عند السجود',
      description: 'أقرب ما يكون العبد من ربه وهو ساجد فأكثروا الدعاء'
    },
    {
      title: 'يوم الجمعة',
      description: 'في يوم الجمعة ساعة لا يوافقها عبد مسلم يسأل الله شيئاً إلا أعطاه إياه'
    },
    {
      title: 'عند نزول المطر',
      description: 'ساعة نزول المطر من أوقات إجابة الدعاء'
    },
    {
      title: 'عند الإفطار',
      description: 'للصائم عند فطره دعوة لا ترد'
    },
  ];

  const duaEtiquette = [
    'ابدأ بحمد الله والثناء عليه',
    'الصلاة على النبي محمد ﷺ',
    'الإخلاص والخشوع في الدعاء',
    'حضور القلب واليقين بالإجابة',
    'عدم الاستعجال في الإجابة',
    'الإلحاح في الدعاء وتكراره',
    'اختر جوامع الدعاء',
    'اختم الدعاء بالصلاة على النبي ﷺ',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Banner */}
     <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="الأدعية والتضرعات"
            subtitle="ادعُ الله بقلب خاشع وأنت موقن بالإجابة"
          />
        </div>
      </section>

      {/* Duas Grid */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="أدعية مختارة"
            subtitle="أدعية مأثورة من القرآن الكريم والسنة النبوية الشريفة"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {duas.map((dua, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 border-r-4 border-amber-600"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="mb-3">
                  <span className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full font-semibold">
                    {dua.category}
                  </span>
                </div>
                <p className="text-xl text-gray-800 font-semibold leading-loose text-right">
                  {dua.text}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/adhkar"
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              عرض المزيد من الأدعية والأذكار
            </Link>
          </div>
        </div>
      </section>

      {/* Best Times for Dua */}
      <section className="px-4 md:px-6 py-16 bg-amber-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="أوقات إجابة الدعاء"
            subtitle="اغتنم هذه الأوقات المباركة"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {duaTimes.map((time, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-amber-900 mb-3 text-right">
                  {time.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-right">
                  {time.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dua Etiquette */}
      <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="آداب الدعاء"
            subtitle="اتبع هذه الآداب ليكون دعاؤك مستجاباً بإذن الله"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {duaEtiquette.map((item, index) => (
              <Card
                key={index}
                className="p-5 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <p className="text-gray-800 font-semibold">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Importance of Dua */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="فضل الدعاء"
            subtitle="الدعاء سلاح المؤمن وعبادة عظيمة"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16  rounded-full    mx-auto mb-4" style={{ backgroundColor: 'rgba(217, 119, 6, 0.8)' }}></div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                قرب من الله
              </h3>
              <p className="text-gray-600 leading-relaxed">
                الدعاء يقربك من الله تعالى ويزيد من إيمانك وتقواك ويجعلك دائماً في معية الله
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16   rounded-full mx-auto mb-4" style={{ backgroundColor: 'rgba(217, 119, 6, 0.8)' }}></div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                تفريج الكروب
              </h3>
              <p className="text-gray-600 leading-relaxed">
                الدعاء الصادق بقلب خاشع يفرج الهموم والكروب ويزيل الغم والحزن
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16  rounded-full  mx-auto mb-4" style={{ backgroundColor: 'rgba(217, 119, 6, 0.8)' }}></div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                استجابة مؤكدة
              </h3>
              <p className="text-gray-600 leading-relaxed">
                الله سبحانه وتعالى وعد بإجابة الدعاء للمخلصين الموقنين بالإجابة
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 md:px-6 py-16   ">
        <div className="max-w-4xl mx-auto text-center  ">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            "وقال ربكم ادعوني أستجب لكم"
          </h2>
          <p className="text-xl opacity-90 mb-8">
            سورة غافر - آية 60
          </p>
          <p className="text-lg leading-relaxed opacity-95 max-w-2xl mx-auto">
            لا تيأس من رحمة الله، فالله سبحانه وتعالى يحب أن يسمع دعاء عبده
            ويستجيب له في الوقت المناسب. داوم على الدعاء بإخلاص وثقة بالله
          </p>
        </div>
      </section>
    </main>
  );
}
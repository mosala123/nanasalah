'use client';

import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: 'فضل الصدقة الجارية',
      excerpt: 'تعرف على أعظم الأعمال التي تستمر في نفعك بعد موتك',
      date: '15/12/2024',
      category: 'الصدقة',
    },
    {
      id: 2,
      title: 'قصص من الحياة',
      excerpt: 'ذكريات طيبة وحكايات مؤثرة من حياتنا',
      date: '10/12/2024',
      category: 'الذكريات',
    },
    {
      id: 3,
      title: 'الدعاء والتضرع',
      excerpt: 'أدعية مأثورة وآداب الدعاء من القرآن والسنة',
      date: '5/12/2024',
      category: 'الدعاء',
    },
    {
      id: 4,
      title: 'العطاء والكرم',
      excerpt: 'رحلة في قيم العطاء والكرم الإسلامي',
      date: '1/12/2024',
      category: 'القيم',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="المقالات والمواضيع"
            subtitle="اقرأ مقالات مفيدة وملهمة"
          />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="أحدث المقالات"
            subtitle="مواضيع تثري المعرفة والروح"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className="p-6 animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3 text-right">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-right leading-relaxed">
                  {article.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-semibold text-right w-full">
                  اقرأ المزيد ←
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="التصنيفات"
            subtitle="تصفح المقالات حسب الفئات"
          />

          <div className="grid md:grid-cols-4 gap-6">
            {['الصدقة', 'الذكريات', 'الدعاء', 'القيم'].map((category, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in hover:shadow-lg transition-all cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-bold text-amber-900">
                  {category}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

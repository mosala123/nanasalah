'use client';

import Link from 'next/link';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function AzkarPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="الأذكار المختلفة"
            subtitle="أذكار متنوعة لكل وقت"
          />
        </div>
      </section>

      {/* Redirect Info */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center animate-scale-zoom-in bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              الأذكار والتسبيحات
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-right">
              تجد الأذكار والتسبيحات المختلفة في صفحة الأذكار الرئيسية التي تحتوي على أذكار الصباح والمساء والنوم والأذكار العامة
            </p>
            <Link
              href="/adhkar"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              اذهب إلى الأذكار الرئيسية
            </Link>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="فوائد الأذكار"
            subtitle="حكمة وروحانية تملأ القلب"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🕯️',
                title: 'طمأنينة النفس',
                description: 'الأذكار تريح القلب وتملؤه بالسلام الداخلي',
              },
              {
                icon: '💪',
                title: 'قوة الروح',
                description: 'تقوي إيمانك وتزيد من قربك من الله',
              },
              {
                icon: '🌟',
                title: 'حماية يومية',
                description: 'تحميك من الشرور وتجلب البركة لك',
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

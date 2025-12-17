'use client';

import Link from 'next/link';
import { FaDonate } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function SadakaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="الصدقة والعطاء"
            subtitle="اسم حسن وذكر جميل"
          />
        </div>
      </section>

      {/* Redirect Info */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center animate-scale-zoom-in bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              الصدقة والعطاء
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-right">
              إذا كنت تريد المساهمة والتبرع لدعم مشروعنا الخيري، تفضل بزيارة صفحة التبرعات حيث يمكنك أن تساهم في نشر الخير
            </p>
            <Link
              href="/donations"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <FaDonate /> اذهب إلى صفحة التبرعات
            </Link>
          </Card>
        </div>
      </section>

      {/* Benefits of Charity */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="فضل الصدقة"
            subtitle="الخير المستمر الذي يتجاوز الزمن"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌈',
                title: 'البركة والرزق',
                description: 'الصدقة تزيل الحسرات وتجلب البركة في المال',
              },
              {
                icon: '👼',
                title: 'الدعاء والشفاعة',
                description: 'دعاء المحتاجين يكون شفيعاً لك يوم القيامة',
              },
              {
                icon: '💎',
                title: 'الأجر الخالد',
                description: 'أجر الصدقة الجارية يستمر حتى بعد موتك',
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

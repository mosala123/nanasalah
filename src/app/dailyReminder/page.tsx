'use client';

import { useState } from 'react';
import { FaBell, FaCheckCircle, FaCalendar } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

const memoryDates = [
  { date: '17/1', title: 'عيد الميلاد', description: 'الاحتفال بحياتها الطيبة' },
  { date: '15/12', title: 'ذكرى الوفاة', description: 'في ذكرى عطرة' },
  { date: '1/1', title: 'السنة الجديدة', description: 'سنة من الخير والعطاء' },
];

export default function DailyRemindersPage() {
  const [email, setEmail] = useState('');
  const [reminderType, setReminderType] = useState('daily');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const reminderTypes = [
    { value: 'daily', label: 'يومي', icon: '📅' },
    { value: 'weekly', label: 'أسبوعي', icon: '📆' },
    { value: 'yearly', label: 'سنوي', icon: '🎯' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="التذكيرات اليومية"
            subtitle="ابقَ على اتصال مع محتوى ذي مغزى روحي"
          />
        </div>
      </section>

      {/* Subscription Card */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-scale-zoom-in bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-6">
              <FaBell className="text-3xl text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                اشترك في التذكيرات
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  عنوان بريدك الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-right"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Reminder Type Toggle */}
              <div>
                <label className="block text-gray-700 font-semibold mb-4 text-right">
                  اختر تكرار التذكير
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {reminderTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${reminderType === type.value
                        ? 'bg-blue-500 border-blue-600 text-white shadow-lg'
                        : 'bg-white border-blue-200 hover:border-blue-400 text-gray-700'
                        }`}
                    >
                      <input
                        type="radio"
                        name="reminderType"
                        value={type.value}
                        checked={reminderType === type.value}
                        onChange={(e) => setReminderType(e.target.value)}
                        className="hidden"
                      />
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-bold">{type.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg flex items-center justify-center gap-2"
              >
                <FaBell /> اشترك الآن
              </button>
            </form>

            {submitted && (
              <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in">
                <div className="flex items-center gap-2 text-green-700 font-semibold text-right">
                  <FaCheckCircle /> تم تأكيد الاشتراك! تحقق من بريدك الإلكتروني.
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Memory Dates Calendar */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="تقويم الذكريات"
            subtitle="التواريخ المهمة التي يجب تذكرها"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {memoryDates.map((memory, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FaCalendar className="text-5xl text-amber-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-amber-900 mb-2">
                  {memory.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {memory.title}
                </h3>
                <p className="text-gray-600">{memory.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="ما الذي ستتلقاه"
            subtitle="محتوى مفيد يصل إلى بريدك الإلكتروني"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📖', title: 'آيات قرآنية', description: 'آيات قرآنية إلهام يومية' },
              { icon: '🤲', title: 'أدعية', description: 'أدعية جميلة وتضرعات مأثورة' },
              { icon: '📝', title: 'قصص', description: 'دروس حياتية وذكريات غالية' },
              { icon: '💝', title: 'أخبار', description: 'آخر أخبار الأنشطة الخيرية' },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            لماذا تشترك؟
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'ابقَ على اتصال مع المحتوى الروحي ذي المغزى',
              'لا تفوت أبداً التواريخ التذكارية المهمة',
              'تلقّ رسائل إلهام إسلامية كل أسبوع',
              'ادعم مهمة العطاء والصدقة المستمرة',
            ].map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FaCheckCircle className="text-2xl text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

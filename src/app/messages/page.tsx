'use client';

import { useState } from 'react';
import { FaHeart, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function MessagesPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    message: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ senderName: '', message: '', email: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="الرسائل والتأبين"
            subtitle="شارك ذكرياتك ورسالتك من القلب"
          />
        </div>
      </section>

      {/* Message Form */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-scale-zoom-in bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="flex items-center gap-3 mb-6">
              <FaHeart className="text-3xl text-rose-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                اترك رسالتك
              </h2>
            </div>

            <p className="text-gray-600 mb-8 text-right">
              شارك ذكرياتك الجميلة أو رسالة من القلب تكون في ذكراها الطيبة
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sender Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  اسمك *
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 text-right"
                  placeholder="أدخل اسمك"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 text-right"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  رسالتك *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 resize-none text-right"
                  rows={8}
                  placeholder="شارك ذكرياتك أو رسالتك الطيبة..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                <FaPaperPlane /> أرسل الرسالة
              </button>

              {submitted && (
                <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end text-green-700 font-semibold">
                    <span>شكراً على رسالتك الطيبة</span>
                    <FaCheckCircle />
                  </div>
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="أهمية الرسائل"
            subtitle="شارك ذكرياتك الغالية"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💭',
                title: 'الذكريات الجميلة',
                description: 'احفظ اللحظات التي ستبقى خالدة في القلب',
              },
              {
                icon: '❤️',
                title: 'التعبير عن الحب',
                description: 'اكتب كلمات الحب والتقدير من قلبك',
              },
              {
                icon: '🤝',
                title: 'تقريب القلوب',
                description: 'شارك الآخرين في أحزانك وفرحك',
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-rose-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

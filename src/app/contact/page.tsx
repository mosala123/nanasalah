'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="تواصل معنا"
            subtitle="نود أن نسمع منك"
          />
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6 md:order-2">
              {[
                {
                  icon: <FaEnvelope className="text-3xl" />,
                  title: 'البريد الإلكتروني',
                  info: 'elmosalah@gmail.com',
                  color: 'from-blue-400 to-blue-600',
                },
                {
                  icon: <FaPhone className="text-3xl" />,
                  title: 'الهاتف',
                  info: '+201024668770',
                  color: 'from-green-400 to-green-600',
                },
                {
                  icon: <FaMapMarkerAlt className="text-3xl" />,
                  title: 'الموقع',
                  info: 'مصر',
                  color: 'from-rose-400 to-rose-600',
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className={`p-6 bg-gradient-to-br ${contact.color} text-white animate-slide-in-left`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{contact.icon}</div>
                    <div className="text-right">
                      <h3 className="text-lg font-bold mb-2">{contact.title}</h3>
                      <p className="text-opacity-90">{contact.info}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 md:order-1">
              <Card className="p-8 animate-slide-in-right text-right">
                <h2 className="text-3xl font-bold text-amber-900 mb-6">
                  أرسل لنا رسالة
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      اسمك الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-right"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      بريدك الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-right"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      رسالتك *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 resize-none text-right"
                      rows={6}
                      placeholder="شارك أفكارك أو استفسارك..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-lg"
                  >
                    <IoSend /> أرسل الرسالة
                  </button>
                </form>

                {submitted && (
                  <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in text-right">
                    <div className="flex items-center gap-2 text-green-700 font-semibold justify-end">
                      <span>شكراً! سنتواصل معك قريباً.</span>
                      <FaCheckCircle />
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="كيف يمكننا مساعدتك"
            subtitle="طرق مختلفة للتواصل معنا"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💬',
                title: 'الاستفسارات العامة',
                description: 'اسأل عن مهمتنا وأنشطتنا',
              },
              {
                icon: '🤝',
                title: 'فرص الشراكة',
                description: 'استكشف طرق التعاون معنا',
              },
              {
                icon: '👥',
                title: 'الاهتمام بالتطوع',
                description: 'انضم إلى مجتمع المساعدين والمؤيدين',
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            وقت الرد السريع
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            نرد عادةً على الرسائل خلال 24 ساعة. شكراً لتواصلك معنا!
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {['📧 البريد الإلكتروني', '📱 الهاتف', '💻 الدردشة'].map((method, index) => (
              <div
                key={index}
                className="text-lg font-semibold text-amber-800 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
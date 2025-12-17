'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة!');
      return;
    }
    if (!agreed) {
      alert('يجب الموافقة على الشروط والأحكام');
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="إنشاء حساب جديد"
            subtitle="انضم إلى مجتمعنا"
          />
        </div>
      </section>

      {/* Signup Form */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8 animate-scale-zoom-in shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  <FaUser className="inline mr-2" />
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  <FaEnvelope className="inline mr-2" />
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="example@email.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  <FaPhone className="inline mr-2" />
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="+20 123456789"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  <FaLock className="inline mr-2" />
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right">
                  <FaLock className="inline mr-2" />
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              {/* Terms Agreement */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 text-right flex-1">
                  أوافق على{' '}
                  <Link href="#" className="text-green-600 hover:text-green-800 font-semibold">
                    الشروط والأحكام
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                إنشاء الحساب
              </button>

              {submitted && (
                <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span>تم إنشاء الحساب بنجاح!</span>
                    <FaCheckCircle className="text-green-700" />
                  </div>
                </div>
              )}
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600 mb-4">
                هل لديك حساب بالفعل؟{' '}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-800 font-bold"
                >
                  دخول
                </Link>
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
              >
                <FaArrowLeft />
                العودة للرئيسية
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

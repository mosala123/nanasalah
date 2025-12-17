'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="تسجيل الدخول"
            subtitle="ادخل حسابك الخاص"
          />
        </div>
      </section>

      {/* Login Form */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8 animate-scale-zoom-in shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-right">
                  <FaEnvelope className="inline mr-2" />
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="example@email.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-right">
                  <FaLock className="inline mr-2" />
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>تذكرني</span>
                </label>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                دخول
              </button>

              {submitted && (
                <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in text-right">
                  <p className="text-green-700 font-semibold">
                    تم تسجيل الدخول بنجاح!
                  </p>
                </div>
              )}
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600 mb-4">
                ليس لديك حساب؟{' '}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  أنشئ حساباً جديداً
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

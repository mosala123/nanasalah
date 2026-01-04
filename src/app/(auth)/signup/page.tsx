'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';
import { supabase } from '../../../lib/supabaseClient';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // مسح الرسائل الخطأ عند تعديل الحقول
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('كلمات المرور غير متطابقة!');
      }

      if (!agreed) {
        throw new Error('يجب الموافقة على الشروط والأحكام');
      }

      const { data, error: supabaseError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
          },
        },
      });

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      setAgreed(false);

      setTimeout(() => setSubmitted(false), 4000);

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-580 to-emerald-50">
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
              <div   >
                <label className="block text-gray-700 font-semibold mb-2 text-right " style={{display:"flex",alignItems:"center"}} >
                  <FaUser className="inline mr-2 ml-2   "  />
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right"  style={{display:"flex",alignItems:"center"}}>
                  <FaEnvelope className="inline mr-2  ml-2 " />
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="example@email.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right"  style={{display:"flex",alignItems:"center"}}>
                  <FaPhone className="inline mr-2  ml-2 " />
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="phone"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right"  style={{display:"flex",alignItems:"center"}}>
                  <FaLock className="inline mr-2  ml-2  " />
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="أدخل كلمة المرور"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-right" style={{display:"flex",alignItems:"center"}}>
                  <FaLock className="inline mr-2  ml-2 " />
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>

              {/* Terms Agreement */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 text-right flex-1">
                  أوافق على{' '}
                  <Link href="#" className="text-green-600 hover:text-green-800 font-semibold">
                    الشروط والأحكام
                  </Link>
                </span>
              </label>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-100 border-l-4 border-red-600 rounded animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {submitted && (
                <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span>تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني للتأكيد.</span>
                    <FaCheckCircle className="text-green-700" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </button>
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
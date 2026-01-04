'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({  
        email: email.trim(),
        password: password,
      });

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      
      setEmail('');
      setPassword('');

      setTimeout(() => {
        router.push('/');  
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
      
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
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
                <label className="block text-gray-700 font-semibold mb-3 text-right"  style={{display:"flex",alignItems:"center"}}>
                  <FaEnvelope className="inline mr-2  ml-2  " />
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="example@email.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-right"  style={{display:"flex",alignItems:"center"}}>
                  <FaLock className="inline mr-2 ml-2" />
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                  placeholder="أدخل كلمة المرور"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span className={loading ? 'opacity-50' : ''}>تذكرني</span>
                </label>
                <Link
                  href="/forgot-password" // أضف صفحة استعادة كلمة المرور
                  className={`text-blue-600 hover:text-blue-800 font-semibold text-sm ${loading ? 'pointer-events-none opacity-50' : ''}`}
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-red-700 font-medium">{error}</span>
                    <FaExclamationTriangle className="text-red-600" />
                  </div>
                </div>
              )}

              {/* Success Message */}
              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-green-700 font-medium">
                      تم تسجيل الدخول بنجاح! يتم توجيهك الآن...
                    </span>
                    <FaCheckCircle className="text-green-600" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600 mb-4">
                ليس لديك حساب؟{' '}
                <Link
                  href="/signup"
                  className={`text-blue-600 hover:text-blue-800 font-bold ${loading ? 'pointer-events-none opacity-50' : ''}`}
                >
                  أنشئ حساباً جديداً
                </Link>
              </p>
              <Link
                href="/"
                className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold ${loading ? 'pointer-events-none opacity-50' : ''}`}
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
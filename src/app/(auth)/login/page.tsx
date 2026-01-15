'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
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
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  
  const router = useRouter();

  // التحقق مما إذا كان المستخدم مسجل دخوله بالفعل
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/profile');
      }
    };
    
    checkSession();
  }, [router]);

  // العد التنازلي لإعادة التوجيه بعد تسجيل الدخول الناجح
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    
    if (submitted && redirectCountdown > 0) {
      countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            router.push('/profile');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [submitted, redirectCountdown, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }

    // التحقق من كلمة المرور
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({  
        email: email.trim(),
        password: password,
      });

      if (supabaseError) {
        // تحسين رسائل الخطأ
        switch (supabaseError.message) {
          case 'Invalid login credentials':
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
          case 'Email not confirmed':
            throw new Error('الرجاء تأكيد بريدك الإلكتروني أولاً');
          default:
            throw new Error(supabaseError.message || 'حدث خطأ أثناء تسجيل الدخول');
        }
      }

      // إذا تم تسجيل الدخول بنجاح
      if (data?.user) {
        setSubmitted(true);
        
        // حفظ تفضيل "تذكرني" إذا كان مفعلاً
        if (rememberMe) {
          localStorage.setItem('rememberEmail', email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        // تفريغ الحقول بعد النجاح
        setEmail('');
        setPassword('');
      }

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  // استرجاع البريد الإلكتروني المحفوظ
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // الزر للذهاب الفوري للبروفايل
  const handleImmediateRedirect = () => {
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="تسجيل الدخول"
            subtitle="ادخل إلى حسابك الشخصي"
          />
        </div>
      </section>

      {/* Login Form */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-6 md:p-8 animate-scale-zoom-in shadow-2xl">
            
            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-3">
                      <FaEnvelope className="ml-2" />
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
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-3">
                      <FaLock className="ml-2" />
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
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={loading ? 'opacity-50' : ''}>تذكرني</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className={`text-blue-600 hover:text-blue-800 font-semibold text-sm ${loading ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      هل نسيت كلمة المرور؟
                    </Link>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="flex-1 text-right">{error}</span>
                        <FaExclamationTriangle className="text-red-600" />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin" />
                        جاري تسجيل الدخول...
                      </span>
                    ) : (
                      'دخول'
                    )}
                  </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center border-t pt-6">
                  <p className="text-gray-600 mb-4">
                    ليس لديك حساب؟{' '}
                    <Link
                      href="/signup"
                      className={`text-blue-600 hover:text-blue-800 font-bold underline ${loading ? 'pointer-events-none opacity-50' : ''}`}
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
              </>
            ) : (
              /* Success Message Section */
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FaCheckCircle className="text-5xl text-green-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-green-700 mb-3">
                  تم تسجيل الدخول بنجاح! 🎉
                </h3>
                
                <p className="text-gray-600 mb-6">
                  يتم توجيهك إلى صفحة الملف الشخصي...
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <p className="text-green-700 font-medium mb-2">
                    سيتم إعادة توجيهك خلال:
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-green-600 animate-pulse">
                      {redirectCountdown}
                    </span>
                    <span className="text-green-700">ثوانٍ</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleImmediateRedirect}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300"
                  >
                    الذهاب إلى الملف الشخصي الآن
                  </button>
                  
                  <Link
                    href="/"
                    className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                  >
                    العودة للرئيسية
                  </Link>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}
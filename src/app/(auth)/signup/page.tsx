'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';
import { supabase } from '../../../lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
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
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // مسح الرسائل الخطأ عند تعديل الحقول
    if (error) setError(null);
  };

  // العد التنازلي لإعادة التوجيه
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    
    if (submitted && redirectCountdown > 0) {
      countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            router.push('/login');
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
    
    // التحقق من كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة!');
      return;
    }

    // التحقق من الموافقة على الشروط
    if (!agreed) {
      setError('يجب الموافقة على الشروط والأحكام');
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }

    // التحقق من طول كلمة المرور
    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);

    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (supabaseError) {
        // تحسين رسائل الخطأ
        switch (supabaseError.message) {
          case 'User already registered':
            throw new Error('هذا البريد الإلكتروني مسجل مسبقاً');
          case 'Invalid email':
            throw new Error('البريد الإلكتروني غير صالح');
          default:
            throw new Error(supabaseError.message || 'حدث خطأ أثناء إنشاء الحساب');
        }
      }

      // إذا تم إنشاء المستخدم بنجاح
      if (data?.user) {
        setSubmitted(true);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          password: '', 
          confirmPassword: '' 
        });
        setAgreed(false);
      }

    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  // زر إعادة التوجيه الفوري
  const handleImmediateRedirect = () => {
    router.push('/login');
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
          <Card className="p-6 md:p-8 animate-scale-zoom-in shadow-2xl">
            
            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name Field */}
                  <div>
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-2">
                      <FaUser className="ml-2" />
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
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-2">
                      <FaEnvelope className="ml-2" />
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
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-2">
                      <FaPhone className="ml-2" />
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
                      placeholder="xxXXXXXXXXx"
                      pattern="[0-9]{11}"
                      title="أدخل 11 أرقام فقط"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-2">
                      <FaLock className="ml-2" />
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
                    <p className="text-xs text-gray-500 text-right mt-1">
                      يجب أن تكون كلمة المرور 6 أحرف على الأقل
                    </p>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="flex items-center justify-end text-gray-700 font-semibold mb-2">
                      <FaLock className="ml-2" />
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
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={loading}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 flex-1 cursor-pointer">
                      <span className="text-right block">
                        أوافق على{' '}
                        <Link 
                          href="/terms" 
                          className="text-green-600 hover:text-green-800 font-semibold underline"
                          target="_blank"
                        >
                          الشروط والأحكام
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="flex-1 text-right">{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        جاري إنشاء الحساب...
                      </span>
                    ) : (
                      'إنشاء الحساب'
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center border-t pt-6">
                  <p className="text-gray-600 mb-4">
                    هل لديك حساب بالفعل؟{' '}
                    <Link
                      href="/login"
                      className="text-green-600 hover:text-green-800 font-bold underline"
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
                  تم إنشاء الحساب بنجاح! 🎉
                </h3>
                
                <p className="text-gray-600 mb-6">
                  تم إرسال رابط تأكيد إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد أو الرسائل غير المرغوب فيها.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <p className="text-green-700 font-medium mb-2">
                    سيتم إعادة توجيهك إلى صفحة تسجيل الدخول تلقائياً خلال:
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
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors duration-300"
                  >
                    الذهاب إلى تسجيل الدخول الآن
                  </button>
                  
                  <p className="text-sm text-gray-500">
                    إذا لم تستلم رسالة التأكيد، تحقق من مجلد البريد العشوائي أو{' '}
                    <button
                      onClick={handleImmediateRedirect}
                      className="text-green-600 hover:text-green-800 font-medium underline"
                    >
                      سجل الدخول لاحقاً
                    </button>
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}
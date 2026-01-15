'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import HeroBanner from '../../../components/HeroBanner';
import Card from '../../../components/Card';
import { supabase } from '../../../lib/supabaseClient';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        
        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('البريد الإلكتروني غير صالح');
            return;
        }

        setLoading(true);

        try {
            const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
                email.trim(),
                {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                }
            );

            if (supabaseError) {
                // تحسين رسائل الخطأ
                switch (supabaseError.message) {
                    case 'Email rate limit exceeded':
                        throw new Error('لقد تجاوزت الحد المسموح من المحاولات، حاول مرة أخرى لاحقاً');
                    default:
                        throw new Error(supabaseError.message || 'حدث خطأ أثناء إرسال رابط الاستعادة');
                }
            }

            setSubmitted(true);
            setEmail('');

            // إعادة التوجيه إلى صفحة التعليمات بعد 5 ثوانٍ
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);

        } catch (err: any) {
            setError(err.message || 'حدث خطأ أثناء إرسال رابط استعادة كلمة المرور');
            setSubmitted(false);
        } finally {
            setLoading(false);
        }
    };

    // الزر للذهاب إلى صفحة التعليمات
    const handleGoToInstructions = () => {
        router.push('/reset-instructions');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <HeroBanner
                        title="استعادة كلمة المرور"
                        subtitle="أدخل بريدك الإلكتروني لاستعادة كلمة المرور"
                    />
                </div>
            </section>

            {/* Recovery Form */}
            <section className="px-4 md:px-6 py-12">
                <div className="max-w-md mx-auto">
                    <Card className="p-6 md:p-8 animate-scale-zoom-in shadow-2xl">
                        
                        {!submitted ? (
                            <>
                                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-blue-700 text-sm text-right">
                                        أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
                                    </p>
                                </div>

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
                                            className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-right placeholder-gray-400 disabled:opacity-50"
                                            placeholder="example@email.com"
                                        />
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
                                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <FaSpinner className="animate-spin" />
                                                جاري الإرسال...
                                            </span>
                                        ) : (
                                            'إرسال رابط الاستعادة'
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Success Message Section */
                            <div className="text-center py-6">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <FaCheckCircle className="text-4xl text-green-600" />
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-green-700 mb-3">
                                    تم إرسال رابط الاستعادة! ✅
                                </h3>
                                
                                <div className="bg-green-50 p-4 rounded-lg mb-6">
                                    <p className="text-green-700 text-sm text-right mb-2">
                                        تم إرسال رابط إعادة تعيين كلمة المرور إلى:
                                    </p>
                                    <p className="text-green-800 font-medium text-right">
                                        {email}
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-blue-700 text-sm text-right mb-2">
                                            تعليمات مهمة:
                                        </p>
                                        <ul className="text-right text-sm text-blue-600 space-y-1">
                                            <li>• تحقق من صندوق الوارد والبريد العشوائي</li>
                                            <li>• اضغط على الرابط في البريد</li>
                                            <li>• الرابط صالح لمدة 1 ساعة فقط</li>
                                            <li>• اتبع التعليمات لتعيين كلمة مرور جديدة</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleGoToInstructions}
                                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
                                        >
                                            عرض تعليمات مفصلة
                                        </button>
                                        
                                        <Link
                                            href="/login"
                                            className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                                        >
                                            العودة لتسجيل الدخول
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="mt-6 text-center border-t pt-6 space-y-4">
                            <p className="text-gray-600">
                                تذكرت كلمة المرور؟{' '}
                                <Link
                                    href="/login"
                                    className="text-purple-600 hover:text-purple-800 font-bold underline"
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
'use client';

import Link from 'next/link';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = [
        { label: 'عنا', href: '/about' },
        { label: 'اتصل بنا', href: '/contact' },
        { label: 'التبرعات', href: '/donations' },
        { label: 'المكافآت', href: '/rewards' },
        { label: 'الأذكار', href: '/adhkar' },
    ];

    const socialLinks = [
        { icon: FaFacebook, label: 'Facebook', url: '#' },
        { icon: FaTwitter, label: 'Twitter', url: '#' },
        { icon: FaInstagram, label: 'Instagram', url: '/stagram.com/mo_salah_10_74/' },
        { icon: FaEnvelope, label: 'Email', url: 'elmosalah74@gmail.com' },
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-4">
                            <FaHeart className="text-rose-500 text-2xl" />
                            <h3 className="text-2xl font-bold bg-gradient-to-l from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                صدقة جارية
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            في الذكرى الطيبة - مكان لتكريم وتذكر والعطاء باسمها. نسأل الله أن يجعل عملنا هذا صدقة جارية في ميزانها.
                        </p>
                    </div>

                    {/* Quick Links 1 */}
                    <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-amber-500">
                            المحتوى الديني
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'القرآن الكريم', href: '/quran' },
                                { label: 'الأذكار والدعاء', href: '/adhkar' },
                                { label: 'الصوتيات', href: '/audios' },
                                { label: 'الأدعية', href: '/supplications' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="text-amber-500">→</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links 2 */}
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-amber-500">
                            حول المشروع
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="text-amber-500">→</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-amber-500">
                            تواصل معنا
                        </h4>
                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm">البريد الإلكتروني:</p>
                                <a href="elmosalah74@gmail.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                                    elmosalah74@gmail.com"
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">الهاتف:</p>
                                <a href="tel:+01024668770" className="text-amber-400 hover:text-amber-300 transition-colors">
                                    +201024668770
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <h5 className="text-sm font-semibold text-white mb-4">متابعة على:</h5>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                                    title={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8 mb-8">
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { number: '2,847', label: 'متبرع' },
                            { number: '50+', label: 'متطوع' },
                            { number: '1000+', label: 'حياة مس' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-amber-400">
                                    {stat.number}
                                </div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Copyright & Credits */}
                    <div className="text-center space-y-3">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} صدقة جارية - في الذكرى الطيبة. جميع الحقوق محفوظة.
                        </p>
                        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                            تم بناؤه بـ <FaHeart className="text-rose-500" /> من أجل قضية ذات معنى
                        </p>
                        <p className="text-gray-600 text-xs">
                            هذا الموقع مكرس لتطبيق قيمة الصدقة الجارية ونشر الخير والعطاء
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar with Scroll to Top */}
            <div className="bg-black border-t border-gray-800 px-4 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-gray-500 text-sm">
                        Made with <FaHeart className="inline text-rose-500 mx-1" /> for a noble cause
                    </div>
                    <button
                        onClick={scrollToTop}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
                        title="العودة للأعلى"
                    >
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}

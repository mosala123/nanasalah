'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaUser, FaSignInAlt } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { href: '/', label: 'الرئيسية' },
        { href: '/quran', label: 'القرآن الكريم' },
        { href: '/adhkar', label: 'الأذكار والدعاء' },
        { href: '/supplications', label: 'أدعية ' },
        { href: '/rewards', label: 'المكافآت' },
        { href: '/sadaka', label: 'الصدقه   ' },
        { href: '/about', label: 'عنها  ' },
        { href: '/dailyReminder', label: 'التذكيرات اليومية' },
        { href: '/contact', label: 'اتصل بنا' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mx-4">
                        <Image
                            src="/logo.png"
                            alt="أثر حنين - موقع خيري"
                            width={140}
                            height={60}
                            className="object-contain w-auto h-16 md:h-18"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-1 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-300 text-sm font-medium hover:scale-105"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Links - Desktop */}
                    <div className="hidden md:flex gap-3 items-center">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold hover:bg-blue-50 rounded-lg"
                        >
                            <FaSignInAlt />
                            دخول
                        </Link>
                        <Link
                            href="/signup"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                        >
                            <FaUser />
                            إنشاء حساب
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Mobile Menu */}
                    <div
                        ref={menuRef}
                        className={`md:hidden fixed top-20 right-0 left-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${isOpen
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 -translate-y-4 invisible'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 text-right border-b border-gray-100"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="border-t pt-4 mt-4 space-y-3">
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-end gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    <span>دخول</span>
                                    <FaSignInAlt />
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={closeMenu}
                                    className="flex items-center justify-end gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold text-center"
                                >
                                    <span>إنشاء حساب</span>
                                    <FaUser />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
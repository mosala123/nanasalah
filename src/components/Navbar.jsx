'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleScroll = () => setScrolled(window.scrollY > 10);

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navLinks = [
        { href: '/', label: 'الرئيسية' },
        { href: '/quran', label: 'القرآن الكريم' },
        { href: '/adhkar', label: 'الأذكار والدعاء' },
        { href: '/supplications', label: 'أدعية' },
        { href: '/rewards', label: 'المكافآت' },
        { href: '/sadaka', label: 'الصدقه' },
        { href: '/about', label: 'عنها' },
        { href: '/dailyReminder', label: 'التذكيرات' },
        { href: '/messages', label: 'الرسايل' },
        { href: '/contact', label: 'التواصل' },
    ];

    return (
        <>
            <nav
                dir="rtl"
                className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
                    scrolled ? 'shadow-md' : 'shadow-sm'
                }`}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
                            <Image
                                src="/logo.png"
                                alt="أثر حنين - موقع خيري"
                                width={140}
                                height={60}
                                className="object-contain h-10 sm:h-12 lg:h-14 w-auto"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav Links - lg and up */}
                        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center px-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-2.5 py-2 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 text-sm font-medium whitespace-nowrap hover:scale-105"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Tablet Nav Links - md only (condensed) */}
                        <div className="hidden md:flex lg:hidden items-center gap-0.5 flex-1 justify-center px-2 overflow-x-auto scrollbar-none">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-2 py-1.5 rounded-md text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 text-xs font-medium whitespace-nowrap"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons - Desktop & Tablet */}
                        <div className="hidden md:flex items-center gap-2 flex-shrink-0 mr-2">
                            <Link
                                href="/profile"
                                className="flex items-center justify-center w-9 h-9 text-blue-600 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="الملف الشخصي"
                            >
                                <CgProfile size={24} />
                            </Link>
                            <Link
                                href="/signup"
                                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 text-sm font-semibold whitespace-nowrap"
                            >
                                <FaUser size={12} />
                                إنشاء حساب
                            </Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
                            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeMenu}
            />

            {/* Mobile Slide-in Menu */}
            <div
                ref={menuRef}
                dir="rtl"
                className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-gradient-to-l from-green-50 to-emerald-50">
                    <Link href="/" onClick={closeMenu}>
                        <Image
                            src="/logo.png"
                            alt="أثر حنين"
                            width={100}
                            height={40}
                            className="object-contain h-9 w-auto"
                        />
                    </Link>
                    <button
                        onClick={closeMenu}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <FaTimes size={16} />
                    </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="overflow-y-auto h-[calc(100%-140px)] py-2">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="flex items-center px-5 py-3.5 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150 text-base font-medium border-b border-gray-50"
                            style={{ animationDelay: `${index * 30}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-gray-100 bg-white space-y-2.5">
                    <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-blue-600 hover:text-green-600 border border-blue-200 hover:border-green-300 rounded-lg transition-colors duration-200 font-semibold text-sm"
                    >
                        <CgProfile size={20} />
                        <span>الملف الشخصي</span>
                    </Link>
                    <Link
                        href="/signup"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-semibold text-sm"
                    >
                        <FaUser size={13} />
                        <span>إنشاء حساب</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
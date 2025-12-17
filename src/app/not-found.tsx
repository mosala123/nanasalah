'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaHome } from 'react-icons/fa'

const NotFound = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="text-center mt-13 max-w-2xl">
                <div className="mb-8 animate-fade-in">
                    <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-4">
                        404
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        الصفحة غير موجودة
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto text-lg">
                        عذراً، لم نتمكن من إيجاد الصفحة التي تبحث عنها.
                        قد تكون الصفحة قد نُقلت أو حُذفت.
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-slide-up">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-lg"
                    >
                        <FaHome />
                        العودة للرئيسية
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-700 px-8 py-4 rounded-lg hover:bg-amber-50 transition-all duration-300 font-bold text-lg"
                    >
                        <FaArrowLeft />
                        رجوع
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
'use client';

import Link from "next/link";

const GeneralHandlingError = ({ error, reset }) => {
  return (
    <main className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white max-w-md w-full border border-red-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">عذراً!</h1>
        <h4 className="text-gray-600 mb-6 text-sm">حدث خطأ ما</h4>

        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          {error?.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً."}
        </p>

        <button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={reset}
        >
          محاولة مجدداً
        </button>
        <Link href="/" className="mt-4 inline-block text-sm text-red-600 hover:text-red-800 font-semibold">
          العودة للرئيسية
        </Link>

      </div>
    </main>
  );
};

export default GeneralHandlingError;

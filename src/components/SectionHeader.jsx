'use client';

export default function SectionHeader({ title, subtitle = '', className = '' }) {
    return (
        <div className={`text-center mb-12 animate-slide-up ${className}`}>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>
    );
}

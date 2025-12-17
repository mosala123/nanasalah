'use client';

export default function HeroBanner({ title, subtitle = '', backgroundImage = null }) {
    return (
        <div
            className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg"
            style={{
                backgroundImage: backgroundImage
                    ? `linear-gradient(135deg, rgba(217, 119, 6, 0.8), rgba(120, 53, 15, 0.8)), url(${backgroundImage})`
                    : 'linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(120, 53, 15, 0.9))',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Decorative Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                }}
            ></div>

            {/* Content */}
            <div className="relative text-center text-white px-4 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                {subtitle && (
                    <p className="text-lg md:text-2xl text-amber-100">{subtitle}</p>
                )}
            </div>
        </div>
    );
}

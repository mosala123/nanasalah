'use client';

import { ReactNode, CSSProperties } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    animated?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}

export default function Card({
    children,
    className = '',
    hover = true,
    animated = true,
    style = {},
    onClick = undefined
}: CardProps) {
    const baseClasses = `bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${hover ? 'hover:shadow-2xl hover:scale-105' : ''
        } ${animated ? 'animate-fade-in' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`;

    return <div className={baseClasses} style={style} onClick={onClick}>{children}</div>;
}

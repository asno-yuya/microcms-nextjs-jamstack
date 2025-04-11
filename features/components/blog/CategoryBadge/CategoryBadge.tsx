import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/blog';
import { getCategoryUrl } from '@/app/libs/utils';

type CategoryBadgeProps = {
    category: Category;
    isActive?: boolean;
    className?: string;
};

export default function CategoryBadge({
    category,
    isActive = false,
    className = '',
}: CategoryBadgeProps) {
    return (
        <Link
            href={getCategoryUrl(category.id)}
            className={`inline-block px-4 py-2 text-base rounded-full ${isActive
                    ? 'bg-gray-300 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${className}`}
        >
            {category.name}
        </Link>
    );
}
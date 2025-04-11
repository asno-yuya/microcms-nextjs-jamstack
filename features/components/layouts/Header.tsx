import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/blog';

type HeaderProps = {
    categories?: Category[];
};

export default function Header({ categories }: HeaderProps) {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-black">
                            My Blog
                        </Link>

                        <button className="md:hidden p-2 rounded-md hover:bg-gray-100" aria-label="メニュー">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                            ホーム
                        </Link>
                        <Link href="/blog" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                            ブログ
                        </Link>
                        <Link href="/blog/categories" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                            カテゴリー
                        </Link>
                    </nav>
                </div>

                {categories && categories.length > 0 && (
                    <div className="mt-4 overflow-x-auto">
                        <div className="flex space-x-2 py-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/blog/categories/${category.id}`}
                                    className="whitespace-nowrap px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
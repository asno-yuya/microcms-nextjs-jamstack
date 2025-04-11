import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '../../libs/blog';
import { getCategoryUrl } from '../../libs/utils';

export const metadata: Metadata = {
    title: 'カテゴリー一覧 | My Blog',
    description: 'ブログのカテゴリー一覧です。興味のあるカテゴリーから記事を探すことができます。',
};

export default async function CategoriesPage() {
    const categoriesData = await getCategories({ limit: 100 });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">カテゴリー一覧</h1>
                <p className="text-gray-200">興味のあるカテゴリーから記事を探してみましょう</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriesData.contents.map((category) => (
                    <Link
                        key={category.id}
                        href={getCategoryUrl(category.id)}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl text-black font-bold mb-2">{category.name}</h2>
                        <p className="text-gray-500 text-sm">
                            関連記事を見る
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
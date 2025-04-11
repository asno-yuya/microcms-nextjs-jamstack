import React from 'react';
import { Metadata } from 'next';
import { getBlogs, getCategories } from '../libs/blog';
import BlogList from '@/features/components/blog/BlogList/BlogList';
import CategoryBadge from '@/features/components/blog/CategoryBadge/CategoryBadge';

export const metadata: Metadata = {
    title: 'ブログ記事一覧 | My Blog',
    description: '最新のブログ記事一覧です。様々なトピックの記事をお楽しみください。',
};

// 1ページあたりの記事数
const PER_PAGE = 12;

// 型定義
interface PageProps {
    params: { [key: string]: string | string[] };
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // Promise を明示
}

export default async function BlogPage({ searchParams }: PageProps) {
    // searchParams を await で解決
    const resolvedSearchParams = await searchParams;
    const pageParam = resolvedSearchParams.page as string | undefined;
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    // 記事データの取得
    const blogsData = await getBlogs({
        limit: PER_PAGE,
        offset: (currentPage - 1) * PER_PAGE,
    });

    // カテゴリーデータの取得（サイドバー用）
    const categoriesData = await getCategories();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">ブログ記事一覧</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* メインコンテンツ */}
                <div className="w-full lg:w-3/4">
                    <BlogList
                        blogs={blogsData.contents}
                        totalCount={blogsData.totalCount}
                        currentPage={currentPage}
                        perPage={PER_PAGE}
                        basePath="/blog"
                    />
                </div>

                {/* サイドバー */}
                <aside className="w-full lg:w-1/4 space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl text-black font-bold mb-4">カテゴリー</h2>
                        <div className="flex flex-wrap gap-2">
                            {categoriesData.contents.map((category) => (
                                <CategoryBadge key={category.id} category={category} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

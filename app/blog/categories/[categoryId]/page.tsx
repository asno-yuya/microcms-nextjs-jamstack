import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryById, getBlogsByCategory, getCategories } from '../../../libs/blog';
import BlogList from '@/features/components/blog/BlogList/BlogList';
import CategoryBadge from '@/features/components/blog/CategoryBadge/CategoryBadge';

// 静的生成のためのパスを生成
export async function generateStaticParams() {
    const { contents } = await getCategories({ limit: 100 });

    return contents.map((category) => ({
        categoryId: category.id,
    }));
}

// 動的メタデータの生成
export async function generateMetadata(
    props: {
        params: Promise<{ categoryId: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const { categoryId } = params;

    try {
        const category = await getCategoryById(categoryId);

        return {
            title: `${category.name}の記事一覧 | My Blog`,
            description: `${category.name}に関連する記事の一覧です。`,
        };
    } catch (error) {
        return {
            title: 'カテゴリー | My Blog',
            description: 'カテゴリー別の記事一覧です。',
        };
    }
}

// 1ページあたりの記事数
const PER_PAGE = 12;

interface PageProps {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    try {
        const { categoryId } = params;
        const pageParam = searchParams.page as string | undefined;
        const currentPage = pageParam ? parseInt(pageParam) : 1;

        const category = await getCategoryById(categoryId);

        const blogsData = await getBlogsByCategory(category.id, {
            limit: PER_PAGE,
            offset: (currentPage - 1) * PER_PAGE,
        });

        const categoriesData = await getCategories();

        return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/blog/categories" className="text-white hover:underline mb-4 inline-block">
                        ← カテゴリー一覧に戻る
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                    <p className="text-white">{`${category.name}に関連する記事一覧`}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* メインコンテンツ */}
                    <div className="w-full lg:w-3/4">
                        <BlogList
                            blogs={blogsData.contents}
                            totalCount={blogsData.totalCount}
                            currentPage={currentPage}
                            perPage={PER_PAGE}
                            basePath={`/blog/categories/${categoryId}`}
                        />
                    </div>

                    {/* サイドバー */}
                    <aside className="w-full lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl text-black font-bold mb-4">カテゴリー</h2>
                            <div className="flex flex-wrap gap-2">
                                {categoriesData.contents.map((cat) => (
                                    <CategoryBadge
                                        key={cat.id}
                                        category={cat}
                                        isActive={cat.id === category.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    } catch (error) {
        console.error('カテゴリー詳細ページでエラーが発生しました:', error);
        notFound();
    }
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogById, getBlogs } from '../../libs/blog';
import { formatDate, extractTableOfContents, getCategoryUrl } from '../../libs/utils';
import TableOfContents from '@/features/components/blog/TableOfContents/TableOfContents';
import CategoryBadge from '@/features/components/blog/CategoryBadge/CategoryBadge';

// 静的生成のためのパスを生成
export async function generateStaticParams() {
    const { contents } = await getBlogs({ limit: 100 });

    return contents.map((blog) => ({
        id: blog.id,
    }));
}

// 動的メタデータの生成
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    // params を await する
    const resolvedParams = await params;

    try {
        const blog = await getBlogById(resolvedParams.id);

        return {
            title: `${blog.title} | My Blog`,
            description: blog.excerpt || '',
            openGraph: blog.eyecatch
                ? {
                    images: [{ url: blog.eyecatch.url, width: 1200, height: 630 }],
                }
                : undefined,
        };
    } catch (error) {
        return {
            title: 'ブログ記事 | My Blog',
            description: 'ブログ記事の詳細ページです。',
        };
    }
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // params を await する
    const resolvedParams = await params;

    try {
        const blog = await getBlogById(resolvedParams.id);
        const toc = extractTableOfContents(blog.content);

        // microCMSの画像のURLは幅と高さを指定できます
        const imageUrl = blog.eyecatch
            ? `${blog.eyecatch.url}?w=1200&h=630&fit=crop`
            : null;

        return (
            <div className="max-w-4xl mx-auto">
                {/* 記事ヘッダー */}
                <div className="mb-8">
                    {blog.categories && blog.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.categories.map((category) => (
                                <CategoryBadge key={category.id} category={category} />
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">{blog.title}</h1>

                    <div className="flex items-center text-gray-200 mb-6">
                        <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                    </div>

                    {blog.eyecatch && (
                        <div className="mb-8 rounded-lg overflow-hidden">
                            <Image
                                src={imageUrl || blog.eyecatch.url}
                                alt={blog.title}
                                width={1200}
                                height={630}
                                className="w-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* 目次 */}
                {toc.length > 0 && <TableOfContents toc={toc} />}

                {/* 本文 */}
                <article className="prose max-w-none lg:prose-lg">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                {/* 前後の記事へのリンク */}
                <div className="mt-12 border-t border-gray-200 py-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <Link
                            href="/blog"
                            className="text-white hover:underline inline-flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            記事一覧に戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ブログ詳細ページでエラーが発生しました:', error);
        notFound();
    }
}
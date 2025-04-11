import React from 'react';
import Link from 'next/link';
import { buildQueryString } from '@/app/libs/utils';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    // 表示するページ番号の範囲を決定
    const displayPages = (): number[] => {
        const pages = [];
        const delta = 2; // 現在のページの前後に表示するページ数

        let start = Math.max(1, currentPage - delta);
        let end = Math.min(totalPages, currentPage + delta);

        // 常に同じ数のページリンクを表示するための調整
        if (currentPage <= delta) {
            end = Math.min(totalPages, 1 + delta * 2);
        }

        if (currentPage >= totalPages - delta) {
            start = Math.max(1, totalPages - delta * 2);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    // ページへのURLを生成
    const getPageUrl = (page: number): string => {
        if (page === 1) return basePath;
        return `${basePath}${buildQueryString({ page })}`;
    };

    const pages = displayPages();

    return (
        <nav className="flex justify-center mt-8">
            <ul className="flex items-center space-x-1">
                {/* 前のページへのリンク */}
                {currentPage > 1 && (
                    <li>
                        <Link
                            href={getPageUrl(currentPage - 1)}
                            className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            aria-label="前のページへ"
                        >
                            &lt;
                        </Link>
                    </li>
                )}

                {/* 最初のページへのリンク (必要な場合) */}
                {pages[0] > 1 && (
                    <>
                        <li>
                            <Link
                                href={getPageUrl(1)}
                                className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                                1
                            </Link>
                        </li>
                        {pages[0] > 2 && (
                            <li className="px-2">...</li>
                        )}
                    </>
                )}

                {/* ページ番号 */}
                {pages.map((page) => (
                    <li key={page}>
                        <Link
                            href={getPageUrl(page)}
                            className={`px-3 py-2 rounded-md ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}

                {/* 最後のページへのリンク (必要な場合) */}
                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <li className="px-2">...</li>
                        )}
                        <li>
                            <Link
                                href={getPageUrl(totalPages)}
                                className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                                {totalPages}
                            </Link>
                        </li>
                    </>
                )}

                {/* 次のページへのリンク */}
                {currentPage < totalPages && (
                    <li>
                        <Link
                            href={getPageUrl(currentPage + 1)}
                            className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            aria-label="次のページへ"
                        >
                            &gt;
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
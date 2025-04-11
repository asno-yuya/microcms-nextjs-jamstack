import React from 'react';
import { Blog } from '@/types/blog';
import BlogCard from '../BlogCards/BlogCards';
import Pagination from '../../ui/Pagination';

type BlogListProps = {
    blogs: Blog[];
    totalCount: number;
    currentPage: number;
    perPage: number;
    basePath: string;
    isCompact?: boolean;
};

export default function BlogList({
    blogs,
    totalCount,
    currentPage,
    perPage,
    basePath,
    isCompact = false,
}: BlogListProps) {
    const totalPages = Math.ceil(totalCount / perPage);

    if (blogs.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-gray-500">記事が見つかりませんでした。</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} isCompact={isCompact} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        basePath={basePath}
                    />
                </div>
            )}
        </div>
    );
}
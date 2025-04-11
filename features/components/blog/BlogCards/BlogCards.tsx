import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/types/blog';
import { formatDate, extractFirstParagraph, getBlogUrl, getCategoryUrl } from '@/app/libs/utils';

type BlogCardProps = {
    blog: Blog;
    isCompact?: boolean;
};

export default function BlogCard({ blog, isCompact = false }: BlogCardProps) {
    const excerpt = blog.excerpt || extractFirstParagraph(blog.content);
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
            <Link href={getBlogUrl(blog.id)}>
                <div className="relative">
                    {blog.eyecatch ? (
                        <Image
                            src={blog.eyecatch.url}
                            alt={blog.title}
                            width={blog.eyecatch.width}
                            height={blog.eyecatch.height}
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{formatDate(blog.publishedAt)}</p>
                    <h3 className="text-lg text-black font-bold mb-2 line-clamp-2">{blog.title}</h3>

                    {!isCompact && (
                        <p className="text-gray-600 mb-3 line-clamp-3">{excerpt}</p>
                    )}
                    {blog.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {blog.categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={getCategoryUrl(category.id)}
                                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}
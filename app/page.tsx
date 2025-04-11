import Image from 'next/image';
import Link from 'next/link';
import { getBlogs, getCategories } from './libs/blog';
import BlogCard from '@/features/components/blog/BlogCards/BlogCards';
import CategoryBadge from '@/features/components/blog/CategoryBadge/CategoryBadge';

export default async function Home() {
  // 最新の記事を6件取得
  const latestBlogsData = await getBlogs({ limit: 6 });
  // 人気のカテゴリーを取得
  const categoriesData = await getCategories({ limit: 10 });

  return (
    <div className="space-y-12">
      {/* ヒーローセクション */}
      <section className="relative bg-white text-black rounded-2xl overflow-hidden">
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ブログサイトです。
            </h1>
            <p className="text-xl mb-8">
              テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。テキスト。
            </p>
            <Link
              href="/blog"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold"
            >
              記事を読む
            </Link>
          </div>
        </div>
      </section>

      {/* 最新の記事 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">最新の記事</h2>

        {/* 記事カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogsData.contents.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* カテゴリー */}
      <section>
        <h2 className="text-2xl font-bold mb-6">カテゴリー</h2>

        <div className="flex flex-wrap gap-3">
          {categoriesData.contents.map((category) => (
            <CategoryBadge
              key={category.id}
              category={category}
              className="text-base px-4 py-2"
            />
          ))}

          <Link
            href="/blog/categories"
            className="inline-block px-4 py-2 text-base rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            すべてのカテゴリー
          </Link>
        </div>
      </section>
    </div>
  );
}
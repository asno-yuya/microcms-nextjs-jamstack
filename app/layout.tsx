import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/features/components/layouts/Header';
import Footer from '@/features/components/layouts/Footer';
import { getCategories } from './libs/blog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Blog',
  description: '最新のトレンドや役立つ情報を発信するブログサイト',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // トップカテゴリーを取得（表示数を制限）
  const categoriesData = await getCategories({ limit: 6 });

  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header categories={categoriesData.contents} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">ページが見つかりませんでした</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    お探しのページは移動したか、削除された可能性があります。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        トップページへ戻る
                    </Link>
                    <Link
                        href="/blog"
                        className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        ブログ一覧を見る
                    </Link>
                </div>
            </div>
        </div>
    );
}
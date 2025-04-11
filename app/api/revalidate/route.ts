import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// 認証用のシークレットキー
const secret = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
    // リクエストの検証
    const requestBody = await request.json();
    const requestSecret = request.headers.get('x-microcms-secret');

    // シークレットキーの検証
    if (!secret || !requestSecret || requestSecret !== secret) {
        return NextResponse.json(
            { message: 'Invalid secret' },
            { status: 401 }
        );
    }

    try {
        // webhookがどのコンテンツに対するものか判断
        const { id, status, draftKey, publishedAt, type } = requestBody;

        if (!type) {
            return NextResponse.json(
                { message: 'No type provided' },
                { status: 400 }
            );
        }

        // トップページ
        revalidatePath('/');

        if (type === 'blog') {
            // ブログ関連ページ
            if (status === 'deleted') {
                // 削除された場合
                revalidatePath('/blog');
                revalidatePath('/blog/categories');
            } else {
                // 作成・更新の場合
                revalidatePath('/blog');
                revalidatePath(`/blog/${requestBody.id}`);
                revalidatePath('/blog/categories');

                // カテゴリー関連
                if (requestBody.categories && requestBody.categories.length > 0) {
                    requestBody.categories.forEach((category: { id: string }) => {
                        revalidatePath(`/blog/categories/${category.id}`);
                    });
                }
            }
        } else if (type === 'category') {
            // カテゴリー関連ページ
            revalidatePath('/blog/categories');
            if (status !== 'deleted') {
                revalidatePath(`/blog/categories/${requestBody.id}`);
            }
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('Revalidation error:', err);
        return NextResponse.json(
            { message: 'Error revalidating' },
            { status: 500 }
        );
    }
}
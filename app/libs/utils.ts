import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

// 日付をフォーマットする関数
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'yyyy年MM月dd日', { locale: ja });
};

// HTMLから最初の段落を抽出する関数（抜粋用）
export const extractFirstParagraph = (html: string): string => {
    const match = html.match(/<p>(.*?)<\/p>/);
    return match ? match[1].replace(/<[^>]*>/g, '') : '';
};

// HTMLから目次を生成する関数
export const extractTableOfContents = (html: string) => {
    const headings: { id: string; text: string; level: number }[] = [];
    const regex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
        const level = parseInt(match[1], 10);
        const id = match[2];
        const text = match[3].replace(/<[^>]*>/g, '');

        headings.push({ id, text, level });
    }

    return headings;
};

// URLパラメータを構築する関数
export const buildQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, String(value));
        }
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
};

// ブログ記事のIDからページURLを生成する関数
export const getBlogUrl = (id: string): string => {
    return `/blog/${id}`;
};

// カテゴリーのIDからページURLを生成する関数
export const getCategoryUrl = (id: string): string => {
    return `/blog/categories/${id}`;
};
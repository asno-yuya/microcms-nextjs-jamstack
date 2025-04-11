// microCMSのレスポンス型
export type MicroCMSListResponse<T> = {
    contents: T[];
    totalCount: number;
    offset: number;
    limit: number;
};

// カテゴリーの型
export type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
};

// ブログ記事の型
export type Blog = {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    eyecatch?: {
        url: string;
        height: number;
        width: number;
    };
    categories: Category[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
};

// 検索パラメータの型
export type SearchParams = {
    offset?: number;
    limit?: number;
    q?: string;
    filters?: string;
    orders?: string;
    fields?: string;
    // depth?: depthNumber;  // depthNumber 型に変更
    richEditorFormat?: 'html' | 'object';
};
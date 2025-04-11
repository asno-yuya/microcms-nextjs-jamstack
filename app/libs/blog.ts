import { client } from './client';
import { Blog, Category, MicroCMSListResponse, SearchParams } from '../../types/blog';

// ブログ記事一覧を取得
export const getBlogs = async (params?: SearchParams): Promise<MicroCMSListResponse<Blog>> => {
    const defaultParams = {
        limit: 10,
        orders: '-publishedAt',
    };
    const mergedParams = { ...defaultParams, ...params };

    return await client.get<MicroCMSListResponse<Blog>>({
        endpoint: 'blog',
        queries: mergedParams,
    });
};

// ブログ記事の詳細をIDで取得
export const getBlogById = async (id: string): Promise<Blog> => {
    try {
        const data = await client.get<Blog>({
            endpoint: 'blog',
            contentId: id,
        });

        return data;
    } catch (error) {
        console.error(`Failed to get blog with id: ${id}`, error);
        throw error;
    }
};

// カテゴリー一覧を取得
export const getCategories = async (params?: SearchParams): Promise<MicroCMSListResponse<Category>> => {
    const defaultParams = {
        limit: 100,
        orders: 'name',
    };
    const mergedParams = { ...defaultParams, ...params };

    return await client.get<MicroCMSListResponse<Category>>({
        endpoint: 'categories',
        queries: mergedParams,
    });
};

// カテゴリーの詳細をIDで取得
export const getCategoryById = async (id: string): Promise<Category> => {
    try {
        const data = await client.get<Category>({
            endpoint: 'categories',
            contentId: id,
        });

        return data;
    } catch (error) {
        console.error(`Failed to get category with id: ${id}`, error);
        throw error;
    }
};

// カテゴリーに属する記事一覧を取得
export const getBlogsByCategory = async (categoryId: string, params?: SearchParams): Promise<MicroCMSListResponse<Blog>> => {
    const defaultParams = {
        limit: 10,
        orders: '-publishedAt',
        filters: `categories[equals]${categoryId}`,
    };
    const mergedParams = { ...defaultParams, ...params };

    return await client.get<MicroCMSListResponse<Blog>>({
        endpoint: 'blog',
        queries: mergedParams,
    });
};
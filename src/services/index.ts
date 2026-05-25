import { apiFetch } from '@/lib/api';
import type { ApiResponse, Product, BoardOfDirector, BoardOfCommissioner, News } from '@/types';

export const productService = {
  getFeatured: () => apiFetch<ApiResponse<Product[]>>('/api/products/featured'),
};

export const boardService = {
  getDirectors: () => apiFetch<ApiResponse<BoardOfDirector[]>>('/api/board-of-directors'),
  getCommissioners: () => apiFetch<ApiResponse<BoardOfCommissioner[]>>('/api/board-of-commissioners'),
};

export const newsService = {
  getAll: (limit = 20, offset = 0) =>
    apiFetch<ApiResponse<News[]>>(`/api/news?limit=${limit}&offset=${offset}`),
  getById: (id: string) =>
    apiFetch<ApiResponse<News>>(`/api/news/${id}`),
};
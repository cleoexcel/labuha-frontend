import { apiFetch } from '@/lib/api';
import type { ApiResponse, Product, BoardOfDirector, BoardOfCommissioner } from '@/types';

export const productService = {
  getFeatured: () => apiFetch<ApiResponse<Product[]>>('/api/products/featured'),
};

export const boardService = {
  getDirectors: () => apiFetch<ApiResponse<BoardOfDirector[]>>('/api/board-of-directors'),
  getCommissioners: () => apiFetch<ApiResponse<BoardOfCommissioner[]>>('/api/board-of-commissioners'),
};
import { apiFetch } from '@/lib/api';
import type { ApiResponse, Product } from '@/types';

export const productService = {
  getFeatured: () => apiFetch<ApiResponse<Product[]>>('/api/products/featured'),
};
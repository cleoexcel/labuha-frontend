import { apiFetch } from '@/lib/api';
import type { ApiResponse, Product, BoardOfDirector, BoardOfCommissioner, News, JobVacancy, Certification } from '@/types';

export const productService = {
  getFeatured: () => apiFetch<ApiResponse<Product[]>>('/api/products/featured'),
  getAll: () => apiFetch<ApiResponse<Product[]>>('/api/products'),
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

export const jobService = {
  getAll: () => apiFetch<ApiResponse<JobVacancy[]>>('/api/jobs'),
};

export const certificationService = {
  getAll: () => apiFetch<ApiResponse<Certification[]>>('/api/certifications'),
};
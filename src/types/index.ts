export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  is_featured: boolean;
  order_index: number;
}

export interface News {
  id: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  photo_url: string;
  category: string;
  published_at: string;
}
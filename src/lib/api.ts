const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 }, // cache 60 detik
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
import { API_BASE_URL } from '../helpers/config';

const productApiUrl = `${API_BASE_URL}/products`;

export async function getAllProducts(page = 1, limit = 10, filter: { categoryId?: string } = {}) {
  let url = `${productApiUrl}?page=${page}&limit=${limit}`;
  if (filter.categoryId) {
    url += `&categoryId=${encodeURIComponent(filter.categoryId)}`;
  }
  console.log('url :',url)
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`${productApiUrl}/${id}`);
  const data = await response.json();
  return data;
} 
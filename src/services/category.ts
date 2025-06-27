import { API_BASE_URL } from '../helpers/config';


const categoryApiUrl=`${API_BASE_URL}/categories`

export async function getCategories() {
  const response = await fetch(`${categoryApiUrl}`);
  const data = await response.json();
  return data;
} 
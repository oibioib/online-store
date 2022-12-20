import axios from 'axios';
import { ApiEndpoints, ApiSettings, Product } from '../types/Types';

export async function getProducts(limit: number = ApiSettings.ProductsLimit): Promise<Product[] | undefined> {
  try {
    const getUrl = `${ApiSettings.Url}${ApiEndpoints.Products}?limit=${limit}`;
    const result = await axios.get(getUrl);
    return result.data.products;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error', error.message);
    }
  }
}

export async function getProduct(id: Product['id']): Promise<Product | undefined> {
  try {
    const result = await axios.get(`${ApiSettings.Url}${ApiEndpoints.Products}/${id}`);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error', error.message);
    }
  }
}

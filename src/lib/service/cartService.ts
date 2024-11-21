import api from '../axiosInstance';
import type { ISaleProduct } from './saleProductService';

export interface Cart {
  cart_id: number;
  customer_id: number;
  sale_product_id_json: number[];
}

export interface CartResponse {
  customer_id: number;
  cart_id: number;
  sale_products: ISaleProduct[]
}

export interface CartRequest {
  cart_id: number;
  customer_id: number;
  sale_product_id_json: number[];
}

const CART_URL = '/cart';

export const getCarts = async (
  page: number,
  pageSize: number
): Promise<CartResponse[]> => {
  const response = await api.get<CartResponse[]>(CART_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

export const getCart = async (cartId: string): Promise<CartResponse> => {
  const response = await api.get<CartResponse>(`${CART_URL}/${cartId}`);
  return response.data;
};

export const deleteCart = async (cartId: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`${CART_URL}/${cartId}`);
  return response.data;
};
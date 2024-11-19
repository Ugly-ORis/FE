import axios from 'axios';
import api from '../axiosInstance';

export interface Order {
  id: number;
  order_id: number;
  dummy_vector: number[];
  order_datetime: string;
  customer_id: number;
  cart_id_json: number[];
  total_price: number;
  status: string;
}

export interface OrderResponse extends Order {}

// 주문 URL
const ORDER_URL = '/order';

// 모든 주문 목록 가져오기 (페이징 지원)
export const getOrders = async (
  page: number,
  pageSize: number
): Promise<OrderResponse[]> => {
  const response = await api.get<OrderResponse[]>(ORDER_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

// 새로운 주문 생성
export const createOrder = async (data: Order): Promise<number> => {
    try {
        const response = await api.post<OrderResponse>(ORDER_URL, data);
        if (response.data && response.data.order_id !== undefined) {
            return response.data.order_id; 
        } else {
            throw new Error("order_id가 응답에 포함되어 있지 않습니다."); 
        }
    } catch (error) {
        console.error('주문 생성 중 오류:', error);
        throw error; 
    }
};


// 주문 삭제
export const deleteOrder = async (orderId: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`${ORDER_URL}/${orderId}`);
  return response.data;
};

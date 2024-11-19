import api from '../axiosInstance';

export interface Topping {
  topping_id: number;
  name: string;
  price: number;
}

export interface ToppingCreate {
  name: string;
  price: number;
}

export interface ToppingResponse extends Topping {}

const TOPPING_URL = '/toppings';

// 토핑 목록 가져오기 (페이징 지원)
export const getToppings = async (
  page: number,
  pageSize: number
): Promise<ToppingResponse[]> => {
  const response = await api.get<ToppingResponse[]>(TOPPING_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

// 새로운 토핑 생성
export const createTopping = async (data: ToppingCreate): Promise<ToppingResponse> => {
  const response = await api.post<ToppingResponse>(TOPPING_URL, data);
  return response.data;
};

// 특정 토핑 가져오기
export const getTopping = async (toppingId: number): Promise<ToppingResponse> => {
  const response = await api.get<ToppingResponse>(`${TOPPING_URL}/${toppingId}`);
  return response.data;
};

// 토핑 삭제
export const deleteTopping = async (toppingId: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`${TOPPING_URL}/${toppingId}`);
  return response.data;
};

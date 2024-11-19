import api from '../axiosInstance';

export interface Cart {
  id: number;
  cart_id: number; // 판매 상품 ID
  dummy_vector: number[];
  customer_id: number; //소비자 ID
  ice_cream_name: string; // 아이스크림 이름
  topping_name: string; // 토핑 이름
  product_price: number; // 판매 가격
}

export interface CartResponse extends Cart {}

const CART_URL = '/cart';

// 판매 상품 목록 가져오기 (페이징 지원)
export const getCarts = async (
  page: number,
  pageSize: number
): Promise<CartResponse[]> => {
  const response = await api.get<CartResponse[]>(CART_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

// 특정 판매 상품 가져오기
export const getCart = async (productId: number): Promise<CartResponse> => {
  const response = await api.get<CartResponse>(`${CART_URL}/${productId}`);
  return response.data;
};

// 판매 상품 삭제
export const deleteCart = async (productId: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`${CART_URL}/${productId}`);
  return response.data;
};

// 특정 카트 ID들로 판매 상품 목록 가져오기
export const getCartsByIds = async (cartIds: number[]): Promise<CartResponse[]> => {
  // 쿼리 문자열 생성
  const queryString = cartIds.map(id => `cart_id=${id}`).join('&');
  const response = await api.get<CartResponse[]>(`${CART_URL}/?${queryString}`); // URL에 쿼리 문자열을 추가
  return response.data;
};

// 카트 ID로 주문 상태를 업데이트하기
export const updateCartStatus = async (cartIds: number[]): Promise<void> => {
  await api.post(`${CART_URL}/update-status`, { cartIds }); // 카트 ID를 요청 본문으로 전달
};
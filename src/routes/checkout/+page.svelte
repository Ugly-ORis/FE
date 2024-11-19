<script lang="ts">
    import type { CartResponse } from '$lib/service/cartService'; 
    import type { OrderResponse } from '$lib/service/orderService'; 

    import { getCartsByIds } from '$lib/service/cartService'; 
    import { createOrder } from '$lib/service/orderService'; // orderService에서 createOrder를 가져옴
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let cartIds: number[] = []; // 카트 ID 배열
    let cartDetails: CartResponse[] = []; // 카트 정보 저장
    let errorMessage: string = ''; // 오류 메시지 저장
    let paymentMethod = "";
    let showConfirmDialog = false; // 결제 확인 다이얼로그 표시 여부
    let totalAmount: number = 0; // 총금액 저장
    let customer: number; // 고객 ID
    let order: OrderResponse = {
        id: 0, // 기본값
        order_id: 0, // 기본값
        dummy_vector: [], // 빈 배열로 초기화
        order_datetime: '', // 빈 문자열로 초기화
        customer_id: 0, // 기본값
        cart_id_json: [], // 빈 배열로 초기화
        total_price: 0, // 기본값
        status: 'Pending', // 기본 상태
    };

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const cartIdStrings = urlParams.getAll('cart_id'); // cart_id 쿼리 매개변수 모두 가져오기
        cartIds = cartIdStrings.map(id => {
            const cartId = Number(id);
            return isNaN(cartId) ? null : cartId; // 숫자가 아닌 경우 null 반환
        }).filter(id => id !== null); // null 제거
        if (cartIds.length > 0) {
            fetchCartDetails(); // 카트 정보를 가져옴
        }
    });

    async function fetchCartDetails() {
        if (cartIds.length === 0) {
            errorMessage = "유효한 카트 번호를 입력하세요.";
            return;
        }
        try {
            cartDetails = await getCartsByIds(cartIds); // 카트 정보 가져오기
            totalAmount = cartDetails.reduce((sum, cart) => sum + cart.product_price, 0); // 총금액 계산
            customer = cartDetails[0].customer_id;
            errorMessage = '';
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
            errorMessage = "카트를 찾을 수 없습니다.";
        }
    }

    function selectPaymentMethod(method: string) {
        paymentMethod = method;
    }

    async function confirmPayment() {
        // 데이터 준비
        order.cart_id_json = cartIds; // cart_id_json 설정
        order.customer_id = customer; // customer_id 설정
        order.order_datetime = new Date().toISOString(); // 주문 날짜 및 시간 설정
        order.total_price = totalAmount; // 총 가격 설정

        try {
            const response = await createOrder(order); // orderService를 통해 주문 생성
            console.log('주문 생성 성공:', response);
            goto(`/end-page?order_id=${response}`); // 주문 ID를 포함하여 페이지 이동
        } catch (error) {
            console.error('주문 생성 중 오류:', error);
            alert('주문 처리 중 오류가 발생했습니다.');
        }
    }

    function handlePayment() {
        if (paymentMethod) {
            showConfirmDialog = true; // 결제 확인 다이얼로그 띄우기
        } else {
            alert("결제 수단을 선택하세요.");
        }
    }

    function cancelPayment() {
        showConfirmDialog = false; // 다이얼로그 닫기
    }
</script>

    <style>
        .checkout-container {
            display: flex;
            flex-direction: row; /* 행 방향으로 변경 */
            gap: 2rem; /* 간격 추가 */
            width: 100%; /* 전체 너비 사용 */
            margin: 0 auto;
            padding: 1rem;
            border-radius: 10px;
            background-color: #f8f8f8;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .order-summary, .payment-options {
            padding: 1.5rem;
            border-radius: 10px;
            background-color: white;
            overflow: hidden; /* 스크롤 바 제거 */
            width: 500px; /* 주문 내역 최대 너비 */
            flex: 1; /* 각 영역이 남은 공간을 나누어 갖기 */
            display: flex;
            flex-direction: column; /* 세로 방향으로 변경 */
        }

        h2 {
            margin-bottom: 1rem;
            color: #333;
        }

        .total {
            margin-top: auto; /* 아래로 밀어내기 */
            font-size: 1.2rem;
            color: #333;
        }
        .total-box{
            position:relative;
            left: 350px;
            top:180px;
        }
        .cart-item {
            display: flex;
            justify-content: space-between; /* 아이템 이름과 가격을 양쪽으로 배치 */
            padding: 0.5rem 0; /* 상하 여백 추가 */
            border-bottom: 1px solid #e0e0e0; /* 구분선 추가 */
        }

        .payment-methods {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            width: 100%;
            justify-items: center;
            margin-top: auto; /* 아래로 밀어내기 */
        }

        .payment-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem; 
            width: 100%;
            max-width: 180px; 
            height: 150px; 
            border: 2px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: 0.3s;
        }

        .payment-card img {
            width: 50px;
            height: 50px;
            margin-bottom: 0.6rem;
        }

        .payment-card.selected {
            border-color: #4CAF50;
            background-color: #e0f7e9;
        }

        button {
            width: 100%;
            padding: 1rem;
            margin-top: 1.25rem;
            background-color: #E6A399;  
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        ul {
            font-weight: bold;
        }

        button:hover {
            background-color: #45a049;
        }

        .item {
            color: rgb(179, 2, 90);
        }

        .dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        }

        .dialog button {
            margin: 0.5rem;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 900;
        }
    </style>

    <div class="checkout-container">
        <div class="order-summary">
            {#if cartDetails.length > 0}
                <h2>주문내역</h2>
                <ul>
                    <li class="cart-item">
                        <span>아이스크림 - 토핑</span>
                        <span>가격</span>
                    </li>
                </ul>
                <ul>
                    {#each cartDetails as cart}
                        <li class="cart-item">
                            <span class="item">{cart.ice_cream_name} - {cart.topping_name}</span>
                            <span>{cart.product_price} 원</span>
                        </li>
                    {/each}
                </ul>
                <div class="total-box">
                <p class="total"><strong>총 가격: {totalAmount} 원</strong></p>
                </div>
            {:else if errorMessage}
                <p style="color: red;">{errorMessage}</p>
            {/if}
        </div>

        <div class="payment-options">
            <h2>결제 수단</h2>
            <div class="payment-methods">
                <div class="payment-card" on:click={() => selectPaymentMethod("Credit Card")}
                    class:selected={paymentMethod === "Credit Card"}>
                    <img src="/credit-card-icon.png" alt="Credit Card" />
                    <p>신용카드</p>
                </div>
                <div class="payment-card" on:click={() => selectPaymentMethod("Payco")}
                    class:selected={paymentMethod === "Payco"}>
                    <img src="/payco-icon.png" alt="Payco" />
                    <p>Payco</p>
                </div>
                <div class="payment-card" on:click={() => selectPaymentMethod("Kakao Pay")}
                    class:selected={paymentMethod === "Kakao Pay"}>
                    <img src="/kakao-pay-icon.png" alt="Kakao Pay" />
                    <p>카카오페이</p>
                </div>
                <div class="payment-card" on:click={() => selectPaymentMethod("Naver Pay")}
                    class:selected={paymentMethod === "Naver Pay"}>
                    <img src="/naver-pay-icon.png" alt="Naver Pay" />
                    <p>네이버페이</p>
                </div>
            </div>
            <button on:click={handlePayment}>결제</button>
        </div>

    {#if showConfirmDialog}
    <div class="overlay" on:click={cancelPayment}></div>
        <div class="dialog">
        <h3>결제 확인</h3>
        <p>선택한 결제 수단: {paymentMethod}</p>
        <p>총 금액: {totalAmount} 원</p>
        <button on:click={confirmPayment}>결제하기</button>
        <button on:click={cancelPayment}>취소</button>
    </div>
    {/if}
</div>
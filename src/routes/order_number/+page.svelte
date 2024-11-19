<script lang="ts">
  import { onMount } from 'svelte';
  import type { Order } from '$lib/service/orderService'; 
  import { getOrders } from '$lib/service/orderService';

  export let items: Order[]; // load에서 전달된 items

  let orders: Order[] = items; 
  let servingOrders: Order[] = [];
  let preparingOrders: Order[] = [];

  async function fetchOrders() {
    try {
      const data = await getOrders(1, 50); 
      orders = data;
      console.log(orders)

      servingOrders = orders.filter(order => order.status === 'Serving');
      preparingOrders = orders.filter(order => order.status === 'Preparing');
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  onMount(() => {
    const interval = setInterval(fetchOrders, 1000); 
    return () => clearInterval(interval); 
  });
</script>

<style>
  :global(body) {
    background-color: #000; /* 배경색을 검정으로 설정 */
    color: #fff; /* 기본 텍스트 색상 */
    font-family: 'Rounded Mplus 1c', sans-serif;
    margin: 0; /* 기본 마진 제거 */
    height: 100vh; /* 전체 화면 높이 설정 */
    display: flex;
    flex-direction: column;
  }

  .order-container {
    display: flex;
    justify-content: space-between; /* 양쪽으로 배치 */
    align-items: flex-start; /* 위쪽 정렬 */
    flex: 1; /* 남은 공간을 차지하도록 설정 */
    padding: 0 20px; /* 좌우 패딩 추가 */
  }

  .list-p {
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    align-items: center; /* 중앙 정렬 */
    width: 100%;
    padding: 20px; /* 상하 좌우 패딩 추가 */
    margin-left:120px;

  }

  .list-s {
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    align-items: center; /* 중앙 정렬 */
    width: 100%; 
    padding: 20px; /* 상하 좌우 패딩 추가 */
    margin-right:120px;
  }

  .serving {
    color: #ffd700; /* 노란색 */
    font-size: 3.5rem; /* 제목 크기 */
    margin-bottom: 10px; /* 제목과 리스트 간격 */
    text-align: center; /* 중앙 정렬 */
  }
  .serving-2nd {
    color: #ffd700; /* 노란색 */
    font-size: 3.5rem; /* 제목 크기 */
    margin-bottom: 10px; /* 제목과 리스트 간격 */
    margin-top:0px;
    text-align: center; /* 중앙 정렬 */
  }

  .preparing {
    color: #aaa; /* 회색 */
    font-size: 3.5rem; /* 제목 크기 */
    margin-bottom: 10px; /* 제목과 리스트 간격 */
    text-align: center; /* 중앙 정렬 */
  }
  .preparing-2nd {
    color: #aaa; /* 회색 */
    font-size: 3.5rem; /* 제목 크기 */
    margin-bottom: 10px; /* 제목과 리스트 간격 */
    margin-top:0px;
    text-align: center; /* 중앙 정렬 */
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0; /* 기본 마진 제거 */
    text-align: center; /* 리스트 항목 중앙 정렬 */
  }

  li {
    font-size: 3rem;
    margin: 5px 0;
  }

  .s-li{
    color: #ffd700; /* 노란색 */
  }
  .division {
    width: 5px; /* 세로 선의 두께 */
    background-color: white; /* 세로 선의 색상 */
    height: 100%; /* 세로 선의 높이 */
    margin: 0 20px; /* 좌우 여백 */
  }

  .footer-text {
    font-size: 3rem;
    text-align: center;
  }

  .footer-container {
    padding: 100px; /* 푸터 여백 */
  }
</style>

<div class="order-container">
  <div class="list-s">
    <h1 class="serving">제공 </h1>
    <h1 class="serving-2nd">Serving</h1>
    <ul>
      {#each servingOrders as servingorder}
        <li class ="s-li">{servingorder.order_id}</li>
      {/each}
    </ul>
  </div>
  
  <div class="division"></div> <!-- 중앙에 세로 선 -->

  <div class="list-p">
    <h1 class="preparing">준비중</h1>
    <h1 class="preparing-2nd">Preparing</h1>
    <ul>
      {#each preparingOrders as preparingorder}
        <li>{preparingorder.order_id}</li>
      {/each}
    </ul>
  </div>
</div>

<div class="footer-container">
  <div class="footer-text">
    주문 번호를 확인하세요!
  </div>
</div>

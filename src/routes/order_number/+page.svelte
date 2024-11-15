<script lang="ts">
  import { onMount } from 'svelte';
  import { getOrders } from '$lib/service/orderService';

  type Order = {
    id: number;
    order_id: number;
    status: 'Serving' | 'Preparing';
  };

  let orders: Order[] = [];
  let servingOrders: Order[] = [];
  let preparingOrders: Order[] = [];

  async function fetchOrders() {
    try {
      const data = await getOrders(1, 50); // 페이지 1, 페이지 크기 50으로 주문 가져오기
      orders = data;

      servingOrders = orders.filter(order => order.status === 'Serving');
      preparingOrders = orders.filter(order => order.status === 'Preparing');
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  onMount(() => {
    fetchOrders();
  });
</script>

<style>
  .order-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 40px;
  }

  .list {
    width: 45%;
    padding: 1rem;
  }

  .serving {
    color: #ffd700; /* 노란색 */    
    margin-left: 30px;
  }

  .preparing {
    color: #aaa; /* 회색 */
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 2rem;
    margin: 5px 0;
    display: flex;
    justify-content: center;
  }

  .division {
    width: 3px;
    height: 1400px;
    background-color: white;
  }
</style>

<div class="order-container">
  <div class="list">
    <h1 class="serving">제공 Serving</h1>
    <ul>
      {#each servingOrders as order}
        <li>{order.order_id}</li>
      {/each}
    </ul>
  </div>
  <div class="division"></div>
  <div class="list">
    <h1 class="preparing">준비중</h1>
    <ul>
      {#each preparingOrders as order}
        <li>{order.order_id}</li>
      {/each}
    </ul>
  </div>
</div>

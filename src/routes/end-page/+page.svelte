<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // URL 파라미터를 가져오기 위해 추가

  let buttonDiv: HTMLDivElement;
  let order_id: number | null = null; // order_id를 저장할 변수

  // 컴포넌트가 로드될 때 URL에서 order_id 가져오기
  $: {
    const urlParams = new URLSearchParams(window.location.search);
    order_id = urlParams.get('order_id') ? parseInt(urlParams.get('order_id')!) : null;
  }

  onMount(() => {
    buttonDiv.focus(); // 컴포넌트가 로드될 때 div에 포커스 설정

    // 10초 후에 자동으로 '/' 경로로 이동
    setTimeout(() => {
      goto('/', { replaceState: true, noScroll: true });
    }, 15000);
  });

  function handleClick() {
    goto('/', { replaceState: true, noScroll: true });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
      event.preventDefault();
    }
  }

  type Order = {
    id: number;
    order_id: number; // 주문번호를 포함한 타입 정의
  };

  let orders: Order[] = [];

  async function fetchOrders() {
    try {
      const response = await fetch('/api/orders'); // 서버에서 데이터 가져오기
      const data: Order[] = await response.json();
      orders = data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  onMount(() => {
    fetchOrders();
  });
</script>

<div
  bind:this={buttonDiv}
  role="button"
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeydown}
  style="width: 70vw; height: 55vh; display: flex; flex-direction: column; align-items: center; justify-content: center; outline: none; cursor: default;"
>
  <h1 class="h1-text">주문완료!</h1>
  {#if order_id !== null}
    <h1 class="h1-text">주문번호는 {order_id}입니다</h1>
  {/if}
</div>

<style>
.h1-text {
  font-size: 5rem;
  color: #333;
  margin: 0; 
}

.h1-text + .h1-text {
  margin-top: 10px; 
}
</style>

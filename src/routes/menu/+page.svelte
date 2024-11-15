<script lang="ts">
    import SelectableItem from '$lib/components/SelectableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { ShoppingBagIcon } from 'heroicons-svelte/24/solid';
    import { XCircleIcon } from 'heroicons-svelte/24/outline';
    import type { IceCream } from '$lib/service/iceCreamService';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let options: string[] = ["Nuts", "Sprinkles", "Whipped Cream", "Chocolate Syrup", "Caramel"];
    let selectedItem: IceCream | null = null;
    let selectedOptions: string[] = [];
    let showModal: boolean = false;
    let cart: { title: string; details: string }[] = [];
    let showCart: boolean = false;

    function handleSelect(event: CustomEvent<{ item: IceCream }>) {
        selectedItem = event.detail.item;
        selectedOptions = [];
        showModal = true;
    }

    function handleAddToCart(event: CustomEvent<{ selectedOptions: string[] }>) {
        if (selectedItem) {
            cart = [
                ...cart,
                { title: selectedItem.name, details: event.detail.selectedOptions.join(", ") }
            ];
            showModal = false;
        }
    }

    function handleRemoveFromCart(index: number) {
        cart = cart.filter((_, i) => i !== index);
    }

    function handleCheckout(): void {
        console.log("Checking out with items:", cart);
    }

    function closeModal(): void {
        showModal = false;
    }
</script>

<div class="item-grid">
    {#each (data.items as any) as item}
        <SelectableItem 
            item={{
                id: item.ice_cream_id,
                title: item.name,
                image: `data:image/png;base64,${item.image}`,
                price: item.price,
                flavor: item.flavor
            }} 
            on:select={handleSelect} 
        />
    {/each}
</div>

<!-- 장바구니 탭 -->
<div class="cart-container" on:mouseenter={() => showCart = true} on:mouseleave={() => showCart = false}>
    <button class="cart-tab">
        <div class="icon-container">
            <ShoppingBagIcon class="cart-icon" />
        </div>
        <span class="cart-text">장바구니 보기</span>
    </button>

    {#if showCart}
    <div class="cart-content">
        {#each cart as item, index}
            <div class="cart-item">
                <button class="remove-btn" on:click={() => handleRemoveFromCart(index)}>
                    <XCircleIcon class="remove-icon" />
                </button>
                <div class="cart-details">
                    <div class="ice-cream-card">
                        <h3>맛: {item.title}</h3>
                    </div>
                    <div class="separator">|</div>
                    <div class="topping-card">
                        <p>토핑: {item.details || "없음"}</p>
                    </div>
                </div>
            </div>
        {/each}
        <button class="checkout-btn" on:click={handleCheckout}>결제하기</button>
    </div>
    {/if}
</div>

{#if showModal}
    <Modal title={selectedItem?.name || ''} options={options} selectedOptions={selectedOptions} on:confirm={handleAddToCart} on:close={closeModal} />
{/if}

<style>
    .item-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    .cart-container {
        position: fixed;
        bottom: 4rem;
        right: 16.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .cart-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        background-color: #FFF5F2;
        border: 1px solid #FFF5F2;
        border-radius: 10px;
        cursor: pointer;
        z-index: 10;
    }

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
    }

    .cart-text {
        margin-left: 0.5rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: #662C2E;
        white-space: nowrap;
    }

    .cart-content {
        position: absolute;
        bottom: 61.5px;
        right: 0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        background: #FFF5F2;
        transform-origin: bottom right;
        transition: all 0.3s ease;
        flex-wrap: wrap;
        width: 420px;
    }

    .cart-item {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        width: 100%;
    }

    .cart-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .ice-cream-card, .topping-card {
        flex: 1;
        padding: 0.5rem;
        background-color: #FFF5F2;
        border-radius: 8px;
        text-align: center;
    }

    .separator {
        font-weight: bold;
        color: #666;
    }

    .checkout-btn {
        width: 100%;
        padding: 0.6rem;
        background-color: #E6A399;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }

    .remove-btn {
        position: absolute;
        width: 32px;
        top: 2px;
        right: 2px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
</style>

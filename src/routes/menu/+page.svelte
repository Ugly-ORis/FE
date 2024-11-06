<script lang="ts">
    import SelectableItem from '$lib/components/SelectableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { ShoppingBagIcon } from 'heroicons-svelte/24/solid';

    interface Item {
        id: number;
        title: string;
        image: string;
    }

    interface ListItem {
        title: string;
        details: string;
    }

    let items: Item[] = [
        { id: 1, title: "Chocolate", image: "/ice-cream-ex-1.png" },
        { id: 2, title: "Strawberry", image: "/ice-cream-ex-2.png" },
        { id: 3, title: "Vanilla", image: "/ice-cream-ex-3.png" }
    ];

    let options: string[] = ["Nuts", "Sprinkles", "Whipped Cream", "Chocolate Syrup", "Caramel"];
    let selectedItem: Item | null = null;
    let selectedOptions: string[] = [];
    let showModal: boolean = false;
    let cart: ListItem[] = [];
    let showCart: boolean = false;

    function handleSelect(event: CustomEvent<{ item: Item }>) {
        selectedItem = event.detail.item;
        selectedOptions = [];
        showModal = true;
    }

    function handleAddToCart(event: CustomEvent<{ selectedOptions: string[] }>) {
        if (selectedItem) {
            cart = [
                ...cart,
                { title: selectedItem.title, details: event.detail.selectedOptions.join(", ") }
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

<h1>Select Your Item</h1>
<div class="item-grid">
    {#each items as item}
        <SelectableItem {item} on:select={handleSelect} />
    {/each}
</div>

<!-- 장바구니 탭 -->
<button class="cart-tab" on:mouseenter={() => showCart = true} on:mouseleave={() => showCart = false}>
        <ShoppingBagIcon style="width: 80px; height: 80px; color: black;" />

    {#if showCart}
    <div class="cart-content">
        {#each cart as item, index}
            <div class="cart-item">
                <h3>{item.title}</h3>
                <p>옵션: {item.details || "None"}</p>
                <button class="remove-btn" on:click={() => handleRemoveFromCart(index)}>삭제</button>
            </div>
        {/each}
        <button class="checkout-btn" on:click={handleCheckout}>결제하기</button>
    </div>
    {/if}
</button>

{#if showModal}
    <Modal title={selectedItem?.title || ''} options={options} selectedOptions={selectedOptions} on:confirm={handleAddToCart} on:close={closeModal} />
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

    .cart-tab {
        position: fixed;
        top: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: transparent;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .cart-button {
        background-color: #f1dcd9;
        color: #333;
        padding: 0.8rem 1rem;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        font-weight: bold;
        white-space: nowrap;
        display: flex;
        align-items: center;
        border-radius: 8px;
    }

    .cart-content {
        padding: 1rem;
        width: 250px;
        display: flex;
        flex-direction: column;
        background: white;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }


    .cart-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .remove-btn {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 0.4rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }

    .checkout-btn {
        width: 100%;
        padding: 0.6rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }
</style>

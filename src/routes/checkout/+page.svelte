<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    let cartItems = [
        { name: "Chocolate Ice Cream", price: 5.00 },
        { name: "Caramel Topping", price: 1.50 }
    ];
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);

    let paymentMethod = "";

    function selectPaymentMethod(method: string) {
        paymentMethod = method;
    }

    function handlePayment() {
        if (paymentMethod) {
            alert(`Payment of $${total.toFixed(2)} completed via ${paymentMethod}. Thank you!`);
        } else {
            alert("Please select a payment method.");
        }
    }
</script>

<div class="checkout-container">
    <div class="order-summary">
        <h2>Order Summary</h2>
        <ul>
            {#each cartItems as item}
                <li>{item.name} - ${item.price.toFixed(2)}</li>
            {/each}
        </ul>
        <p class="total"><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>

    <div class="payment-options">
        <h2>Choose Payment Method</h2>
        <div class="payment-methods">
            <div class="payment-card" on:click={() => selectPaymentMethod("Credit Card")}
                 class:selected={paymentMethod === "Credit Card"}>
                <img src="/credit-card-icon.png" alt="Credit Card" />
                <p>Credit Card</p>
            </div>
            <div class="payment-card" on:click={() => selectPaymentMethod("Payco")}
                 class:selected={paymentMethod === "Payco"}>
                <img src="/payco-icon.png" alt="Payco" />
                <p>Payco</p>
            </div>
            <div class="payment-card" on:click={() => selectPaymentMethod("Kakao Pay")}
                 class:selected={paymentMethod === "Kakao Pay"}>
                <img src="/kakao-pay-icon.png" alt="Kakao Pay" />
                <p>Kakao Pay</p>
            </div>
            <div class="payment-card" on:click={() => selectPaymentMethod("Naver Pay")}
                 class:selected={paymentMethod === "Naver Pay"}>
                <img src="/naver-pay-icon.png" alt="Naver Pay" />
                <p>Naver Pay</p>
            </div>
        </div>
        <button on:click={handlePayment}>Complete Payment</button>
    </div>
</div>

<style>
    .checkout-container {
        display: flex;
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
        border-radius: 10px;
        background-color: #f8f8f8;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .order-summary, .payment-options {
        flex: 1;
        padding: 1.5rem;
        border-radius: 10px;
        background-color: white;
        overflow: auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }

    h2 {
        margin-bottom: 1rem;
        color: #333;
    }

    .total {
        margin-top: 1rem;
        font-size: 1.2rem;
        color: #333;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0.5rem 0;
        color: #666;
    }

    .payment-methods {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.75rem;
        width: 100%;
        justify-items: center;
    }

    .payment-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.8rem;
        width: 100%;
        max-width: 180px; 
        height: 135px;
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

    .payment-card p {
        margin: 0;
        font-weight: bold;
        color: #333;
        font-size: 1rem;
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

    button:hover {
        background-color: #45a049;
    }
</style>

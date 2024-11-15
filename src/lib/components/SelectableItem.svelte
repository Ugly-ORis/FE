<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let item: { id: number; title: string; image: string; price: number; flavor: string };
    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('select', { item });
    }
</script>

<div class="card" on:click={handleClick}>
    <img src={item.image} alt={item.title} class="card-image" />
    <h2 class="card-title">{item.title}</h2>
    <p class="card-flavor">{item.flavor}</p>
    <p class="card-price">Price: ${item.price}</p>
</div>
<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 230px;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        cursor: pointer;
        padding: 1rem;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .card-image {
        width: 150px;
        height: 140px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 0.5rem;
    }

    .card-title {
        margin: 0;
        text-align: center;
        font-size: 1.2rem;
        color: #333;
    }
</style>

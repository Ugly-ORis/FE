<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let title: string = '';
    export let options: string[] = [];
    export let selectedOptions: string[] = [];

    const dispatch = createEventDispatcher();

    function toggleOption(option: string) {
        if (selectedOptions.includes(option)) {
            selectedOptions = selectedOptions.filter(opt => opt !== option);
        } else {
            selectedOptions = [...selectedOptions, option];
        }
    }

    function confirmSelection() {
        dispatch('confirm', { selectedOptions });
    }

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="modal-overlay">
    <div class="modal">
        <h2 class="modal-title">{title}</h2>
        <p>Select options:</p>
        <div class="options-list">
            {#each options as option}
                <label>
                    <input type="checkbox" checked={selectedOptions.includes(option)} on:change={() => toggleOption(option)} />
                    {option}
                </label>
            {/each}
        </div>
        <div class="modal-actions">
            <button class="confirm-btn" on:click={confirmSelection}>Confirm</button>
            <button class="close-btn" on:click={closeModal}>Cancel</button>
        </div>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    .modal-title {
        margin-bottom: 1rem;
    }

    .options-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0;
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
    }

    .confirm-btn, .close-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }

    .confirm-btn {
        background-color: #4CAF50;
        color: white;
    }

    .close-btn {
        background-color: #f44336;
        color: white;
    }
</style>

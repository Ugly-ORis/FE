<script>
</script>

<style>
    :global(body) {
        font-family: 'Rounded Mplus 1c', sans-serif;
        background-color: #E6A399;
        margin: 0;
        padding: 0;
        user-select: none;
        -webkit-user-drag: none;
    }

    header {
        display: flex;
        align-items: center;
        padding: 1rem;
    }
    .logo, .ice-cream {
        pointer-events: none; 
        user-select: none;
    }

    .logo {
        width: 200px; 
        height: auto;
        margin-left: 3rem;
    }

    footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
    }

    .ice-cream {
        width: 200px; 
        height: auto;
        opacity: 0.8;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>

<div class="container">
    <header>
        <img src="/logo.png" alt="Logo" class="logo" />
    </header>
    
    <main>
        <slot />
    </main>
    
    <footer>
        <img src="/ice-cream.png" alt="Ice Cream Logo" class="ice-cream" />
    </footer>
</div>

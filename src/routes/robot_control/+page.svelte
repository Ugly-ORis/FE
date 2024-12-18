<script lang="ts">
    import { onMount } from 'svelte';

    let videoFeedUrl = "http://localhost:8080/customers/video";
    let canvas: HTMLCanvasElement;

    onMount(() => {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    });

    const handleControl = (direction: string) => {
        console.log(`${direction} 버튼 클릭됨`);
    };

    const handleAction = (action: string) => {
        console.log(`${action} 버튼 클릭됨`);
    };
</script>

<div class="video-container">
    <img src={videoFeedUrl} alt="Video Feed" width="520" height="360" class="video-feed" />
</div>

<div class="button-container">
    <div class="control-buttons">
        <button on:click={() => handleControl("상")} class="control-btn">▲</button>
        <div>
            <button on:click={() => handleControl("좌")} class="control-btn">◀</button>
            <button class="control-btn"></button>
            <button on:click={() => handleControl("우")} class="control-btn">▶</button>
        </div>
        <button on:click={() => handleControl("하")} class="control-btn">▼</button>
    </div>

    <div class="action-buttons">
        <button on:click={() => handleAction("Action 1")} class="action-btn">네모 버튼 1</button>
        <button on:click={() => handleAction("Action 2")} class="action-btn">네모 버튼 2</button>
    </div>
</div>

<style>
    .video-container {
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
    }

    .video-feed {
        border: 3px solid #86e1e2;
        border-radius: 8px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 500px;
        margin: 0 auto;
    }

    .control-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .control-buttons div {
        display: flex;
        gap: 8px;
    }

    .control-btn {
        font-size: 20px;
        color: white;
        background-color: #70d3d1;
        border: none;
        border-radius: 12px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .control-btn:hover {
        background-color: #4dbbb9;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px; 
    }

    .action-btn {
        font-size: 18px;
        color: white;
        background-color: #F4A460;
        border: none;
        border-radius: 12px;
        padding: 15px 20px;
        width: 150px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .action-btn:hover {
        background-color: #D28E4E;
    }
</style>

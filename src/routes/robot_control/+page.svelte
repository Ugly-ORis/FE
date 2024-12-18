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
    <img src={videoFeedUrl} alt="Video Feed" class="video-feed" />
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
    /* 전체 레이아웃 중앙 정렬 */
    .video-container {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .video-feed {
        width: 90%; /* 화면에 맞게 조정 */
        max-width: 640px; /* 최대 크기 제한 */
        height: auto; /* 비율 유지 */
        border: 3px solid #86e1e2;
        border-radius: 8px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 90%; /* 화면 폭에 맞게 */
        margin: 0 auto;
        flex-wrap: wrap; /* 작은 화면에서 버튼 줄바꿈 */
        gap: 1rem; /* 버튼 간격 */
    }

    .control-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .control-buttons div {
        display: flex;
        gap: 0.5rem;
    }

    .control-btn {
        font-size: 1.2rem;
        color: white;
        background-color: #70d3d1;
        border: none;
        border-radius: 12px;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .control-btn:hover {
        background-color: #4dbbb9;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .action-btn {
        font-size: 1rem;
        color: white;
        background-color: #F4A460;
        border: none;
        border-radius: 12px;
        padding: 0.8rem 1.2rem;
        width: 8rem;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .action-btn:hover {
        background-color: #D28E4E;
    }

    /* 반응형 디자인 */
    @media (max-width: 768px) {
        .button-container {
            flex-direction: column; /* 버튼 세로 정렬 */
            align-items: center;
            gap: 2rem;
        }

        .control-buttons {
            flex-direction: row; /* 상하좌우 버튼 가로 정렬 */
            justify-content: center;
            gap: 1rem;
        }

        .control-buttons div {
            flex-direction: column; /* 작은 화면에서는 좌우 버튼 세로 정렬 */
            gap: 0.5rem;
        }

        .control-btn {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
        }

        .action-btn {
            width: 6rem;
            font-size: 0.9rem;
        }
    }
</style>

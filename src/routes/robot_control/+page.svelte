<script lang="ts">
    import { onMount } from 'svelte';

    // 상태 변수
    let commandQueue: string = "";
    let raspberryStatus: string = "연결되지 않음";

    // 명령 저장
    const saveCommand = (command: string) => {
        console.log(`명령 저장됨: ${command}`);
        commandQueue = command;
    };

    // Raspberry Pi가 명령 확인
    const getCommand = () => {
        const command = commandQueue;
        commandQueue = ""; // 명령 초기화
        return { command };
    };

    // Raspberry Pi가 상태 업데이트
    const updateStatus = (status: string, lastCommand: string) => {
        raspberryStatus = `상태: ${status}, 마지막 명령: ${lastCommand}`;
        console.log(`상태 업데이트: ${status}, ${lastCommand}`);
    };

    // Raspberry Pi가 주기적으로 Polling 요청을 받을 수 있도록 처리
    onMount(() => {
        (window as any).getCommand = getCommand;
        (window as any).updateStatus = updateStatus;
    });

    // 버튼 클릭 이벤트
    const handleControl = (direction: string) => {
        console.log(`버튼 클릭됨: ${direction}`);
        saveCommand(direction);
    };

    const handleAction = (action: string) => {
        console.log(`버튼 클릭됨: ${action}`);
        saveCommand(action);
    };
</script>

<!-- 화면 UI -->
<div class="status">
    Raspberry Pi 상태: {raspberryStatus}
</div>

<div class="button-container">
    <div class="control-buttons">
        <button on:click={() => handleControl("up")} class="control-btn">▲</button>
        <div>
            <button on:click={() => handleControl("left")} class="control-btn">◀</button>
            <button class="control-btn"></button>
            <button on:click={() => handleControl("right")} class="control-btn">▶</button>
        </div>
        <button on:click={() => handleControl("down")} class="control-btn">▼</button>
    </div>
    <div class="action-buttons">
        <button on:click={() => handleAction("action1")} class="action-btn">네모 버튼 1</button>
        <button on:click={() => handleAction("action2")} class="action-btn">네모 버튼 2</button>
    </div>
</div>
<style>
    /* 비디오 컨테이너 */
    .video-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        min-height: 340px;
    }

    .video-feed {
        width: 600px;
        height: auto;
        border: 3px solid #86e1e2;
        border-radius: 8px;
        max-width: 90%;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 800px; 
        margin: 0 auto;
        flex-wrap: nowrap;
        gap: 40px;
    }

    .control-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .control-buttons div {
        display: flex;
        gap: 10px;
    }

    .control-btn {
        font-size: 18px;
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

    @media (max-width: 768px) {
        .video-feed {
            width: 500px;
        }

        .control-btn {
            width: 50px;
            height: 50px;
            font-size: 16px;
        }

        .action-btn {
            width: 120px;
            font-size: 16px;
            padding: 10px 15px;
        }

        .button-container {
            max-width: 700px; 
            gap: 45px;
        }
    }

    @media (max-width: 480px) {
        .video-feed {
            width: 400px;
        }

        .control-btn {
            width: 45px;
            height: 45px;
            font-size: 14px;
        }

        .action-btn {
            width: 100px;
            font-size: 14px;
            padding: 8px 12px;
        }

        .button-container {
            gap: 40px;
        }
    }
</style>

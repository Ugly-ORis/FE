<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let videoFeedUrl = "http://localhost:8080/customers/video";
    let raspberryStatus: string = "연결되지 않음";
    let connected = false;
    let raspberrySocket: WebSocket;

    onMount(() => {
        // WebSocket 서버 시작 (Netlify WebSocket Server 역할)
        const server = new WebSocket('wss://symphonious-paletas-d1c475.netlify.app/robot_control');

        server.onopen = () => {
            console.log('Raspberry Pi가 연결됨');
            raspberryStatus = '연결됨';
            connected = true;
        };

        server.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('수신된 메시지:', data);

            if (data.status === 'success') {
                raspberryStatus = `명령 수행됨: ${data.direction || data.action}`;
            } else if (data.status === 'connected') {
                raspberryStatus = 'Raspberry Pi 연결됨';
            }
        };

        server.onerror = (error) => {
            console.error('WebSocket 오류:', error);
            raspberryStatus = "오류 발생";
        };

        server.onclose = () => {
            console.log('WebSocket 연결 종료');
            raspberryStatus = "연결 종료됨";
            connected = false;
        };

        raspberrySocket = server;
    });

    onDestroy(() => {
        if (raspberrySocket) {
            raspberrySocket.close();
        }
    });

    const handleControl = (direction: string) => {
        if (connected) {
            raspberrySocket.send(JSON.stringify({ event: 'control', direction }));
            console.log(`${direction} 명령 전송됨`);
        } else {
            console.error('Raspberry Pi와 연결되지 않았습니다.');
        }
    };

    const handleAction = (action: string) => {
        if (connected) {
            raspberrySocket.send(JSON.stringify({ event: 'action', action }));
            console.log(`${action} 명령 전송됨`);
        } else {
            console.error('Raspberry Pi와 연결되지 않았습니다.');
        }
    };
</script>

<div class="video-container">
    <img src={videoFeedUrl} alt="Video Feed" class="video-feed" />
</div>

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

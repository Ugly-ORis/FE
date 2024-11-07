<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    let socket: WebSocket;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    onMount(() => {
        socket = new WebSocket("ws://localhost:8080/customers/capture");
        socket.binaryType = "arraybuffer";

        // 서버에서 받은 메시지를 처리
        socket.onmessage = (event: MessageEvent) => {
            // 문자열 메시지를 받은 경우: 회원 확인 결과를 알림
            if (typeof event.data === "string") {
                const data = JSON.parse(event.data);
                if (data.message) {
                    // 메시지 내용에 따라 페이지 이동
                    if (data.message.includes("Welcome back")) {
                        goto('/menu');
                    } else if (data.message.includes("New user created")) {
                        goto('/join');
                    } else {
                        alert(data.message);
                    }
                }
            } 
            // 이미지 데이터를 받은 경우: 캔버스에 표시
            else {
                const blob = new Blob([event.data], { type: "image/jpeg" });
                const img = new Image();
                img.src = URL.createObjectURL(blob);

                img.onload = () => {
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }
                    URL.revokeObjectURL(img.src);
                };
            }
        };

        // 웹소켓이 닫힐 때
        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        if (canvas) {
            ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        }
    });

    onDestroy(() => {
        if (socket) {
            socket.close();
        }
    });

    // 사용자가 얼굴을 클릭했을 때 해당 좌표를 서버에 전송
    function selectFace(event: MouseEvent) {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        socket.send(JSON.stringify({ x, y }));
    }
</script>

<canvas bind:this={canvas} width="640" height="480" on:click={selectFace}></canvas>

<style>
    canvas {
        border: 1px solid #ccc;
        cursor: pointer;
    }
</style>

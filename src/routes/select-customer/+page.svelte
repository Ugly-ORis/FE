<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let socket: WebSocket;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    onMount(() => {
        socket = new WebSocket("ws://localhost:8080/customers/capture");
        socket.binaryType = "arraybuffer";

        socket.onmessage = (event: MessageEvent) => {
            if (typeof event.data === "string") {
                const data = JSON.parse(event.data);
                if (data.message) {
                    alert(data.message); // 로그인 환영 메시지 또는 등록 요청 메시지
                }
            } else {
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
    }
</style>

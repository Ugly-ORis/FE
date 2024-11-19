<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { sendImageAndGetResult } from '$lib/service/customerService';

    let videoFeedUrl = "http://localhost:8080/customers/video_feed";
    let canvas: HTMLCanvasElement;

    onMount(() => {
        // 캔버스 초기화
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    });

    async function selectFace(event: MouseEvent) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 이미지 캡처
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = videoFeedUrl;
        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 클릭한 위치의 이미지 데이터 가져오기
            const imageData = context.getImageData(x, y, 1, 1).data;
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob(resolve, 'image/jpeg');
            });

            // 서버로 이미지 전송
            const result = await sendImageAndGetResult(blob);
            alert(result.message);
        };
    }
</script>

<div style="text-align:center">
    <img src={videoFeedUrl} alt="Video Feed" on:click={selectFace} width="640" height="480" style="border: 1px solid #ccc; cursor: pointer;" />
</div>

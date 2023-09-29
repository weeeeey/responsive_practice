let canvas: HTMLCanvasElement = document.querySelector('#canvas')!;
let ctx = canvas.getContext('2d')!;
let isDraw: boolean = false;
// isDraw를 명시하지 않으면 mousemove 에서 영역 내로 들어가면 바로 그림을 그려버림

const startDraw = (e: MouseEvent) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.fillStyle = 'black';
    isDraw = true;
};

const drawing = (e: MouseEvent) => {
    if (isDraw) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
};

const endDrawing = (e: MouseEvent) => {
    ctx.closePath();
    isDraw = false;
};

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', endDrawing);

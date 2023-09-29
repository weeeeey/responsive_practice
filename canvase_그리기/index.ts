let canvas: HTMLCanvasElement = document.querySelector('#canvas')!;
let ctx = canvas.getContext('2d')!;

drawClock();

function drawClock() {
    drawFace(ctx, 200);
    drawNumbers(ctx, 200);
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let num = 1; num < 13; num++) {
        let ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(50, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(50, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawFace(ctx, radius) {
    const grad = ctx.createRadialGradient(
        250,
        250,
        radius * 0.95,
        250,
        250,
        radius * 1.05
    );
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.beginPath();
    ctx.arc(250, 250, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

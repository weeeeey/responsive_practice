var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var isDraw = false;
var startDraw = function (e) {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.fillStyle = 'black';
    isDraw = true;
};
var drawing = function (e) {
    if (isDraw) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
};
var endDrawing = function (e) {
    ctx.closePath();
    isDraw = false;
};
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', endDrawing);

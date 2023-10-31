export default function BarGraph({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'BarGraphContent';
    this.$target.innerHTML = `<h2>1. 그래프</h2>`;

    $app.appendChild(this.$target);

    this.$canvas = document.createElement('canvas');
    this.$canvas.width = 600;
    this.$canvas.height = 600;
    this.$canvas.style.border = '1px solid';

    this.$target.appendChild(this.$canvas);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const ctx = this.$canvas.getContext('2d');
        const data = JSON.stringify(this.state);

        function drawLine(ctx, startX, startY, endX, endY, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.restore();
        }
        function drawBar(
            ctx,
            upperLeftCornerX,
            upperLeftCornerY,
            width,
            height,
            color
        ) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
            ctx.restore();
        }
    };

    this.render();
}

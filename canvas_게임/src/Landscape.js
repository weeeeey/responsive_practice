export default function Landscape(context, width, height) {
    this.offset = 0;
    this.width = width;
    this.advance = function (dx) {
        this.offset += dx;
    };
    this.horizon = height * 0.7;
    // This creates the sky gradient (from a darker blue to white at the bottom)
    this.sky = context.createLinearGradient(0, 0, 0, this.horizon);
    this.sky.addColorStop(0.0, 'rgb(55,121,179)');
    this.sky.addColorStop(0.7, 'rgb(121,194,245)');
    this.sky.addColorStop(1.0, 'rgb(164,200,214)');
    // this creates the grass gradient (from a darker green to a lighter green)
    this.earth = context.createLinearGradient(0, this.horizon, 0, height);
    this.earth.addColorStop(0.0, 'rgb(81,140,20)');
    this.earth.addColorStop(1.0, 'rgb(123,177,57)');
    this.paintBackground = function (context, width, height) {
        // first, paint the sky and grass rectangles
        context.fillStyle = this.sky;
        context.fillRect(0, 0, width, this.horizon);
        context.fillStyle = this.earth;
        context.fillRect(0, this.horizon, width, height - this.horizon);
        // then, draw the cloudy banner
        // we make it cloudy by having the draw text off the top of the
        // canvas, and just having the blurred shadow shown on the canvas
        context.save();
        context.translate(
            width - ((this.offset + this.width * 3.2) % (this.width * 4.0)) + 0,
            0
        );
        context.shadowColor = 'white';
        context.shadowOffsetY = 30 + this.horizon / 3; // offset down on canvas
        context.shadowBlur = '5';
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = '20px sans-serif';
        context.fillText('WHATWG ROCKS', 10, -30); // text up above canvas
        context.restore();
        // then, draw the background tree
        context.save();
        context.translate(
            width -
                ((this.offset + this.width * 0.2) % (this.width * 1.5)) +
                30,
            0
        );
        context.beginPath();
        context.fillStyle = 'rgb(143,89,2)';
        context.lineStyle = 'rgb(10,10,10)';
        context.lineWidth = 2;
        context.rect(0, this.horizon + 5, 10, -50); // trunk
        context.fill();
        context.stroke();
        context.beginPath();
        context.fillStyle = 'rgb(78,154,6)';
        context.arc(5, this.horizon - 60, 30, 0, Math.PI * 2); // leaves
        context.fill();
        context.stroke();
        context.restore();
    };
    this.paintForeground = function (context, width, height) {
        // draw the box that goes in front
        context.save();
        context.translate(
            width - ((this.offset + this.width * 0.7) % (this.width * 1.1)) + 0,
            0
        );
        context.beginPath();
        context.rect(0, this.horizon - 5, 25, 25);
        context.fillStyle = 'rgb(220,154,94)';
        context.lineStyle = 'rgb(10,10,10)';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.restore();
    };
}

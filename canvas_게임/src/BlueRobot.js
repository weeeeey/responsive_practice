export default function BlueRobot() {
    this.sprites = new Image();
    this.sprites.src = 'blue-robot.png'; // this sprite sheet has 8 cells
    this.targetMode = 'idle';
    this.walk = function () {
        this.targetMode = 'walk';
    };
    this.stop = function () {
        this.targetMode = 'idle';
    };
    this.frameIndex = {
        idle: [0], // first cell is the idle frame
        walk: [1, 2, 3, 4, 5, 6], // the walking animation is cells 1-6
        stop: [7], // last cell is the stopping animation
    };
    this.mode = 'idle';
    this.frame = 0; // index into frameIndex
    (this.tick = function () {
        // this advances the frame and the robot
        // the return value is how many pixels the robot has moved
        this.frame += 1;
        if (this.frame >= this.frameIndex[this.mode].length) {
            // we've reached the end of this animation cycle
            this.frame = 0;
            if (this.mode != this.targetMode) {
                // switch to next cycle
                if (this.mode == 'walk') {
                    // we need to stop walking before we decide what to do next
                    this.mode = 'stop';
                } else if (this.mode == 'stop') {
                    if (this.targetMode == 'walk') this.mode = 'walk';
                    else this.mode = 'idle';
                } else if (this.mode == 'idle') {
                    if (this.targetMode == 'walk') this.mode = 'walk';
                }
            }
        }
        if (this.mode == 'walk') return 8;
        return 0;
    }),
        (this.paint = function (context, x, y) {
            if (!this.sprites.complete) return;
            // draw the right frame out of the sprite sheet onto the canvas
            // we assume each frame is as high as the sprite sheet
            // the x,y coordinates give the position of the bottom center of the sprite
            context.drawImage(
                this.sprites,
                this.frameIndex[this.mode][this.frame] * this.sprites.height,
                0,
                this.sprites.height,
                this.sprites.height,
                x - this.sprites.height / 2,
                y - this.sprites.height,
                this.sprites.height,
                this.sprites.height
            );
        });
}

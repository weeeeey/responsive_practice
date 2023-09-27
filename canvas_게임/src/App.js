import Landscape from './Landscape.js';
import BlueRobot from './BlueRobot.js';

export default function App($app) {
    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');

    var landscape = new Landscape(context, canvas.width, canvas.height);
    var blueRobot = new BlueRobot();

    const $walk = document.querySelector('#walk');
    const $stop = document.querySelector('#stop');
    $walk.addEventListener('click', (e) => {
        e.preventDefault();
        blueRobot.walk();
    });
    $stop.addEventListener('click', (e) => {
        e.preventDefault();
        blueRobot.stop();
    });
    // paint when the browser wants us to, using requestAnimationFrame()
    function paint() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        landscape.paintBackground(context, canvas.width, canvas.height);
        blueRobot.paint(context, canvas.width / 2, landscape.horizon * 1.1);
        landscape.paintForeground(context, canvas.width, canvas.height);
        requestAnimationFrame(paint);
    }
    paint();
    // but tick every 100ms, so that we don't slow down when we don't paint
    setInterval(function () {
        var dx = blueRobot.tick();
        landscape.advance(dx);
    }, 100);
}

{
    /* <input type="button" value="Walk" onclick="blueRobot.walk()" />
<input type="button" value="Stop" onclick="blueRobot.stop()" /> */
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const canvas = document.querySelector('canvas.webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const scene = new THREE.Scene();
const fontLoader = new FontLoader();
fontLoader.load('./fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Hello Three.js', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
        // bevel: 각도자, 비스듬한 면, thickness: 두께
    });

    // bound box 를 이용해서 텍스트의 중간으로 중심 잡는 법.
    textGeometry.computeBoundingBox(); //computeBoundingBox를 실행해야 boundingBox의 값 생성 됨.
    textGeometry.translate(
        -textGeometry.boundingBox.max.x * 0.5,
        -textGeometry.boundingBox.max.y * 0.5,
        -textGeometry.boundingBox.max.z * 0.5
    );

    // textGeometry.translate(
    //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
    //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
    //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
    // )

    const textMatrial = new THREE.MeshBasicMaterial();
    const text = new THREE.Mesh(textGeometry, textMatrial);
    scene.add(text);
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
    );
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // const clock = new THREE.Clock();
    const tick = () => {
        // const elapsedTime = clock.getElapsedTime();
        controls.update();
        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        //Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);

        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    });

    canvas.addEventListener('dblclick', () => {
        const fullscreenElement =
            document.fullscreenElement || document.webkitFullscreenElement;

        if (!fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });
});

// Camera

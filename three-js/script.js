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

const textureLoader = new THREE.TextureLoader();
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

    textGeometry.center();

    // Matcap = Material Capture 이미지로 조명을 대신하는 방식 - 가짜 라이팅 방식

    const matcapTexture = textureLoader.load('./static/textures/matcaps/1.png');

    const textMatrial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

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

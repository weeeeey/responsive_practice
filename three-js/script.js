import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Start of the code
THREE.ColorManagement.enabled = false;

const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () =>
// {
//     console.log('loading started')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('loading finished')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('loading progressing')
// }
// loadingManager.onError = () =>
// {
//     console.log('loading error')
// }
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('./images/door/color.jpg');
const alphaTexture = textureLoader.load('./images/door/alpha.jpg');
const heightTexture = textureLoader.load('./images/door/height.jpg');
const normalTexture = textureLoader.load('./images/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load(
    './images/door/ambientOcclusion.jpg'
);

const metalnessTexture = textureLoader.load('./images/door/metalness.jpg');
const roughnessTexture = textureLoader.load('./images/door/roughness.jpg');

const material = new THREE.MeshBasicMaterial({ map: colorTexture });

const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = ambientOcclusionTexture;

const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);
// Create the attribute and name it 'position'

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.set(0, 0, 5);
mesh.rotation.y = Math.PI * 0.7;
// camera.lookAt(mesh.position);
scene.add(camera);

// // Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const tick = () => {
    // Update controls
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

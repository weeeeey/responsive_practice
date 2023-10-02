import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

import * as dat from 'lil-gui'; //debug UI

const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
// Create the attribute and name it 'position'

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3;
scene.add(camera);

// Controls
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

// A way to know if it's already in fullscreen
// A method to go to the fullscreen mode
// A method to leave the fullscreen mode
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

// Add debug
const gui = new dat.GUI();
// gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('height');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');

// gui colors
// spin
const parameters = {
    color: material.color.getHexString(),
    spin: () => {
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2,
        });
    },
};
// 첫 선언을 이렇게 해도 괜찮 const material = new THREE.MeshBasicMaterial({color:parameters.color})

gui.addColor(parameters, 'color').onChange((value) => {
    // material.setValues({ color: value });
    material.color.set(parameters.color);
});

gui.add(parameters, 'spin');

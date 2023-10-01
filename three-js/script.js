import * as THREE from 'three';

import gsap from 'gsap';

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height);

camera.position.set(0, -1, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(800, 600);

const tick = () => {
    gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

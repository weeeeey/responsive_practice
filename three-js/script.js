import * as THREE from 'three';

import gsap from 'gsap';

const sizes = {
    width: 800,
    height: 600,
};

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.set(0, 0, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);

const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
    tick();
});

const tick = () => {
    // gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    camera.position.y = cursor.y * 3;
    camera.lookAt(mesh.position);

    renderer.render(scene, camera);
    // window.requestAnimationFrame(tick);
};
tick();

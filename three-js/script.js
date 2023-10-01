import * as THREE from 'three';
const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(800, 600);

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
group.add(cube3);

group.children.forEach((child, idx) => {
    child.position.set(idx, 0, 0);
});

camera.position.set(0, 0, 5);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    group.rotation.y = Math.PI * elapsedTime;
    group.position.x = Math.cos(elapsedTime);
    group.position.y = Math.sin(elapsedTime);

    camera.lookAt(group.position);

    window.requestAnimationFrame(tick);
    renderer.render(scene, camera);
};

tick();

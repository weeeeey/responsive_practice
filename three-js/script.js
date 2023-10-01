import * as THREE from 'three';
const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)' });

// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

const sizes = {
    width: 800,
    height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
// mesh.position.x = 1; //camera의 포지션 위치와 mesh 포지션 위치 바꾸는 것에 대한 차이점
// mesh.position.y = 1.6;
// mesh.position.z = -1;
// // mesh.position.set(1, 1.6, -1);

// mesh.scale.x = 1;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;
// // mesh.scale.set(3, 0.25, 0.5);

// mesh.rotation.x = Math.PI * 0.25; //If you spin on the y axis, you can picture it like a carousel.
// mesh.rotation.y = Math.PI * 0.25; // If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
// mesh.rotation.z = Math.PI * 1; //And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// // The position property is not any object. It's an instance of the Vector3 class. While this class has an x, a y, and a z property, it also has many useful methods.
// // You can get the length of a vector:
// console.log(mesh.position.length());

// // You can get the distance from another Vector3 (make sure to use this code after creating the camera):
// console.log(mesh.position.distanceTo(camera.position));

// // You can normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction):
// console.log(mesh.position.normalize());

// // camera.lookAt(new THREE.Vector3(0, - 1, 0))
// camera.lookAt(mesh.position);

// // To change the values, instead of changing x, y and z separately, you can also use the set(...) method:
renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);

// // Transform objects
// // position, scale, rotation, quaternion( to also rotate objects; more about that later)

/**
 * Objects
 */
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

const tick = () => {
    group.children[0].rotation.x += 0.1;
    window.requestAnimationFrame(tick);
    renderer.render(scene, camera);
};

tick();

// *****Scene
const scene = new THREE.Scene();

// Mesh 라는 객체 타입을 만들어야 함.
// Mesh = geometry(the shape) + material(how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// ******Camera
// camera 는 Perspective camera를 사용할 것이고,
// 속성으로는  the field of view (값이 클 수록 꺠짐),
// the aspect ratio 가 있음. (보통 canvas.width/canvas.height)

// camera도 scene에 넣는 거 잊지 마셈 (안 넣어도 작동은 하는데 버그 유발 함)
const sizes = {
    width: 800,
    height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// ***** Renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height); // <canvas> resize
renderer.render(scene, camera);

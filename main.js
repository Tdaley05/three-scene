import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { SceneOptimizer } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

const spaceTexture = new THREE.TextureLoader().load("images/sky.jpg");
scene.background = spaceTexture;

const testTexture = new THREE.TextureLoader().load("images/texture.jpg");
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const testMaterial = new THREE.MeshBasicMaterial({ map: testTexture });
const testMesh = new THREE.Mesh(sphereGeometry, testMaterial);
testMesh.position.set(25, 10, 0);
scene.add(testMesh);
animate();

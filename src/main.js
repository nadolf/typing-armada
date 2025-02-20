import './style.css';
import * as THREE from 'three';
import { spawnPlayer } from './player.js';
import { spawnEnemy, updateEnemies } from './enemy.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 500);
camera.lookAt(0, 0, 0);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Setup
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
    'assets/ocean.jpg',
    function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        scene.background = texture;

        let time = 0;
        function animateWater() {
            time += 0.02;
            texture.offset.x = Math.sin(time) * 0.01;
        }

        function animate() {
            animateWater();
            updateEnemies(scene, player);
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);
    },
    undefined,
    function(err) {
        console.error('Error loading background texture:', err);
    }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Spawn Player
let player;
spawnPlayer(scene).then((playerModel) => {
    player = playerModel;
});

// Spawn Enemies Every 2 Seconds
setInterval(() => {
    spawnEnemy(scene);
}, 2000);

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

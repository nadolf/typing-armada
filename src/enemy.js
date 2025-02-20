import { loadModel } from './loadModels.js';

const enemies = [];
const enemySpeed = 1;

export function spawnEnemy(scene) {
    const xPos = (Math.random() - 0.5) * 800;
    const yPos = 800;

    loadModel('/assets/pirate_ship.glb', { 
        scale: { x: 0.02, y: 0.02, z: 0.02 }, 
        position: { x: xPos, y: yPos, z: 0 } 
    })
    .then((enemy) => {
        enemy.rotation.x = Math.PI / 2;
        enemy.userData = {
            speed: enemySpeed,
            targetX: (Math.random() - 0.5) * 300
        };
        enemies.push(enemy);
        scene.add(enemy);
    })
    .catch(error => console.error('Failed to load enemy ship:', error));
}

export function updateEnemies(scene, player) {
    enemies.forEach(enemy => {
        enemy.position.y -= enemy.userData.speed;

        if (enemy.position.x < enemy.userData.targetX) {
            enemy.position.x += 0.5;
        } else {
            enemy.position.x -= 0.5;
        }

        // Remove enemies that pass the player
        if (enemy.position.y < player.position.y - 50) {
            scene.remove(enemy);
            enemies.splice(enemies.indexOf(enemy), 1);
        }
    });
}

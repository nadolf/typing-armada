import { loadModel } from './loadModels.js';

export function spawnPlayer(scene) {
    return loadModel('/assets/ship.glb', { 
        scale: { x: 0.3, y: 0.3, z: 0.3 }, 
        position: { x: 0, y: -150, z: 0 } 

    }).then((player) => {
        player.rotation.x = Math.PI / 2;
        scene.add(player);
        return player;
    });
}

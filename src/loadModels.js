import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadModel(path, { scale = { x: 1, y: 1, z: 1 }, position = { x: 0, y: 0, z: 0 } }) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(scale.x, scale.y, scale.z);
                model.position.set(position.x, position.y, position.z);
                resolve(model);
            },
            undefined,
            (error) => reject(error)
        );
    });
}


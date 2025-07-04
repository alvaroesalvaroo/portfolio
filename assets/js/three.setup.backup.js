import * as THREE from 'three';


console.log("Init three.js");
// Texture
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("./assets/img/normaltexture.jpeg");
const modelPath = "./assets/scene.gltf";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);

const greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const cube = null;
cube = new THREE.Mesh( geometry, greenMaterial );
if (cube)
{
  scene.add( cube );  
  cube.position.x = -2; // In (-2,0,0)
}

// Loader from file
// const loader = new THREE.GLTFLoader();

// loader.load(
//     modelPath,
//     function (gltf) {
//         scene.add(gltf.scene);
//         // Si tiene animaciones, puedes acceder a ellas:
//         if (gltf.animations && gltf.animations.length) {
//             const mixer = new THREE.AnimationMixer(gltf.scene);
//             gltf.animations.forEach( ( clip ) => {
//                 mixer.clipAction( clip ).play();
//             } );
//             // Necesitarás actualizar el mixer en tu bucle de animación
//             // mixer.update( clock.getDelta() ); 
//         }
//         console.log('Modelo GLTF cargado con éxito:', gltf);
//     },

//     function (xhr) {
//         console.log((xhr.loaded / xhr.total * 100) + '% cargado');
//     },

//     function (error) {
//         console.error('Error al cargar el modelo GLTF:', error);
//     }

// )

// Materials
const material = new THREE.MeshStandardMaterial();
material.map = normalTexture;

// Mesh
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
width: window.innerWidth,
height: window.innerHeight,
};


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
75,
sizes.width / sizes.height,
0.1,
100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
// Update sizes
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

// Update camera
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix();

// Update renderer
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
const elapsedTime = clock.getElapsedTime();

// Update objects
shape.rotation.y = 0.2 * elapsedTime;
shape.rotation.x = 0.2 * elapsedTime;

// Update Orbital Controls
// controls.update()

// Render
renderer.render(scene, camera);

// Call tick again on the next frame
window.requestAnimationFrame(tick);
};

tick();
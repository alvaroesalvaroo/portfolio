import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube = null;
// cube = new THREE.Mesh( geometry, greenMaterial );
if (cube)
{
  scene.add( cube );  
  cube.position.x = -2; // In (-2,0,0)
}

camera.position.z = 5;

// Create renderer in html canvas webgl element
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// Load model
const loader = new GLTFLoader();
let earthModel = null;

loader.load( './assets/3Dmodels/EscenaEstatica.glb', function ( gltf ) {
  earthModel = gltf.scene;
  onModelLoaded(gltf.scene);
  
  // Debug functions
  /*
  const cube2 = new THREE.Mesh( geometry, redMaterial );
  scene.add(cube2);
  debugModelInfo(cube2);
  */
  createLights();

}, undefined, function ( error ) {

  console.error( error );

} );
function debugModelInfo(model)
{
  console.log("Success loading " + model.name+ " with mesh children");
  model.traverse( ( child ) => {
        if ( child.isMesh ) {
            console.log(child.name);
        }
      });
}

function onModelLoaded(model)
{
  scene.add( model );
  debugModelInfo(model);
}


function createLights()
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Luz general, suave
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(-2, 0, -5); 
  
  // if (earthModel)
  // {
  //   directionalLight.target.position.set(earthModel.position.x, earthModel.position.y, earthModel.position.z);
  // }
  scene.add(directionalLight);
  scene.add(directionalLight.target);
}





// --- CAMERA MOVEMENT WITH WASD ---
// For better results might be needed:
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const velocity = 0.4;
let direction = new THREE.Vector3();


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
});

function updateCamera()
{
    direction.z = Number( moveForward ) - Number( moveBackward );
    // direction z is reverted for some reason
    direction.z*=-1;

    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // Ensure diagonal movement is not fastest


    // Aplica el movimiento a los controles de la cámara

    if (moveForward || moveBackward || moveLeft || moveRight)
    {
      camera.position.addScaledVector(direction , velocity);
    }
    
}

// MAIN LOOP

renderer.setAnimationLoop( animate );


function animate() {
  // Rotar un cubo
  if (cube)
  {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  if (earthModel)
  {
    earthModel.rotation.set(earthModel.rotation.x, earthModel.rotation.y -=0.005, earthModel.rotation.z);
  }
  
  
  // Camera and render
  updateCamera();
  renderer.render( scene, camera );
  
}

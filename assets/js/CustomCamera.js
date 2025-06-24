import * as THREE from 'three';

export default class CustomCamera {
  constructor(sizes, fov = 75) {
    this.sizes = sizes;
    this.velocity = 0.4;
    // this.direction = new THREE.Vector3();
    
    this.camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,   // aspect
      0.1,                          // near point
      1000                          // far away point
    );

    this._autoSetPosition();

    this._initKeyboardListeners();
  }

  _autoSetPosition()
  {
    this.camera.position.set(3, 1, 5);
    if (this.sizes.width < 800)
    {
        this.camera.position.set(1.5, 1, 5);
    }
  }

  _initKeyboardListeners() {
    this.move = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
    };

    document.addEventListener('keydown', (e) => this._onKeyChange(e, true));
    document.addEventListener('keyup', (e) => this._onKeyChange(e, false));
  }

  _onKeyChange(event, state) {
    switch (event.code) {
      case 'KeyW': this.move.forward = state; break;
      case 'KeyS': this.move.backward = state; break;
      case 'KeyA': this.move.left = state; break;
      case 'KeyD': this.move.right = state; break;
      case 'KeyE': this.move.up = state; break;
      case 'KeyQ': this.move.down = state; break;
    }
  }

  
    update()
    {
        // Apply movement if some key is pressed

        if (this.move.forward || this.move.backward || this.move.left || this.move.right || this.move.up || this.move.down)
        {
            let direction = new THREE.Vector3();
            direction.z = Number( this.move.backward ) - Number( this.move.forward );
            direction.x = Number( this.move.right ) - Number( this.move.left );
            direction.y = Number( this.move.up ) - Number ( this.move.down);
            direction.normalize(); // Ensure diagonal movement is not fastest

            camera.position.addScaledVector(this.direction , velocity);
        }
    }

    resize(newSizes) {
        this.sizes = newSizes;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this._autoSetPosition();
        this.camera.updateProjectionMatrix();
    }

    get instance() {
        return this.camera;
    }
}

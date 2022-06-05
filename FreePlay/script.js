import * as THREE from './lib/three.module.js'
import { GLTFLoader } from './lib/GLTFLoader.js'
import Player from './player.js';
import InputHandler from './input.js';

// import {drawStatusText} from './utils.js';


window.addEventListener('load', async () => {
  loader.remove();
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  
  const canvas = document.getElementById('canvas1');
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');
  
  const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 100);
  camera.position.set(0, 2, 2);

  const hemisphereLight = new THREE.HemisphereLight('skyblue', 'green', 0.3)

  const light = new THREE.PointLight(0xffffff, 0.5);
  light.position.set(0,25,5);
  light.castShadow = true;
  light.shadow.mapSize.set(4096, 4096)
  light.shadow.camera.near = 1
  light.shadow.camera.far = 50


  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;


  //загрузка танка
  let tank;

  const gltfLoader = new GLTFLoader();

  const tankLoad = new Promise(resolve => {
    gltfLoader.load('./assets/gltf/tank.glb',
    (gltf)=>{
      tank = gltf.scene.children[0];
      tank.scale.set(0.2,0.2,0.2);
      tank.castShadow = true;
      // scene.add(gltf.scene.children[0])
      resolve(tank)
    })
  })


  


  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshStandardMaterial({color: 'cyan'});



  const box = new THREE.Mesh(geometry, material);
  box.castShadow = true;


  const planeG = new THREE.PlaneGeometry(50,50);
  const planeM = new THREE.MeshStandardMaterial();
  const ground = new THREE.Mesh(planeG, planeM); 
  ground.rotation.x = -Math.PI * 0.5;
  ground.position.y = -1;
  ground.receiveShadow = true;

  scene.add(ground)


  

  // промис после загрузки модели танка
  const playerAndTankLoaded = tankLoad.then(tank => {
    return new Promise(resolve => {
      scene.add(camera, light, hemisphereLight, tank);
      camera.lookAt(tank.position);
      const player = new Player(sizes.width, sizes.height, tank);
      resolve({player,tank})
    })
  })


  // camera.lookAt(box.position)

  // scene.add(camera, light, hemisphereLight, box);


  const input = new InputHandler();
  const clock = new THREE.Clock();
  let time = 0;
  let timer = 0;
  const FPS_60 = 0.01666;

  playerAndTankLoaded.then(playerAndTankObject => {
    function animate() {
    
    const tank = playerAndTankObject.tank
    const player = playerAndTankObject.player


    const elapsedTime = clock.getElapsedTime();
    const dt = elapsedTime - time;
    time = elapsedTime;
    
    tank.position.y = Math.abs(Math.sin(elapsedTime))*0.1
    player.update(input.lastKey);

    //слежение камеры игроком
    camera.lookAt(tank.position)
    
    //сохранение камеры за спиной игрока
    camera.position.x = (tank.position.x + Math.cos(tank.rotation.y) * -3)+0.5;
    camera.position.z = (tank.position.z + Math.sin(-tank.rotation.y) * -3);
    camera.position.y = 1.5








    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    //_____ рендер на 60 fps
    if (timer > FPS_60) {
      renderer.render(scene, camera);
      timer = 0;
    } else {
      timer += dt;
    }
    //_____ конец рендра на 60 fps
    requestAnimationFrame(animate);
  }
  animate()
  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  // const ctx = canvas.getContext('2d');
  
  // function resizeWindow() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resizeWindow();
  // window.addEventListener('resize', resizeWindow)

  // const player = new Player(canvas.width, canvas.height);
  // const input = new InputHandler();

  // function animate() {
  //   ctx.clearRect(0,0, canvas.width, canvas.height);
  //   player.update(input.lastKey);
  //   player.draw(ctx);
  //   drawStatusText(ctx, input, player);
  //   requestAnimationFrame(animate);
  // }
  // animate()
})
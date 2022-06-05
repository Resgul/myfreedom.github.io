import {Standing, MoveForward, MoveBackward, RotateRight, RotateLeft, Braking, BrakingBack, Starting, StartingBackward} from './state.js'
import Fog from './fog.js';

export default class Player {
  constructor(gameWidth, gameHeight, box) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new Standing(this), new MoveForward(this), new MoveBackward(this), new RotateRight(this), new RotateLeft(this), new Braking(this), new BrakingBack(this), new Starting(this), new StartingBackward(this)];
    this.currientState = this.states[0];
    this.image = tank;
    this.width = 60;
    this.height = 76;
    this.x = this.gameWidth * 0.5 - this.width * 0.5;
    this.y = this.gameHeight * 0.5 - this.height * 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.speedBack = 0;
    this.maxSpeed = 0.05;
    this.angleDeg = -90;
    this.angleStep = 0;
    this.weight = 0.0005;
    this.info = [];
    this.timer = 0;
    this.mesh = box;
    // this.fogParticles = [];
    // this.fog = new Fog(this);
  }

  update(input) { 
    this.timer++;   
    this.currientState.handleInput(input);
       
    //анимация
    // this.frameX++;
    // if (this.frameX > 1) this.frameX = 0;

    

    
    //вектор движения 3D
    this.angleDeg += this.angleStep;
    const angle = this.angleDeg * Math.PI / 180;
    // this.mesh.position.y = -0.5;
    this.mesh.position.x = (this.mesh.position.x + Math.cos(angle) * this.speed);
    this.mesh.position.z = (this.mesh.position.z + Math.sin(angle) * this.speed);
    
    //вращение самого мэша на тот же угол
    this.mesh.rotation.y = -angle;
    //бля сработало T_T

    //торможение и занос
    if (this.currientState === this.states[5] || this.currientState === this.states[3] || this.currientState === this.states[4]) {
      this.speed -= this.weight;
      if (this.speed <= 0) this.speed = 0;
    }
    if (this.currientState === this.states[6]) {
      this.speed += this.weight;
      if (this.speed >= 0) this.speed = 0;
    }

    // разгон вперед и назад
    if (this.currientState === this.states[7]) {
      this.speed += this.weight;
      if (this.speed >= this.maxSpeed) this.currientState = this.states[1];
    }
    if (this.currientState === this.states[8]) {
      this.speed -= this.weight;
      if (this.speed <= -this.maxSpeed * 0.5) this.currientState = this.states[2];
    }

    // // удержание в окне
    // if (this.x < 0) this.x = 0;
    // else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
    // if (this.y < 0) this.y = 0;
    // else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
  }

  setState(state) {
    this.currientState = this.states[state];
    this.currientState.enter();
  }
}
export const states = {
  STANDING: 0,
  MOVE_FORWARD: 1,
  MOVE_BACKWARD: 2,
  ROTATE_RIGHT: 3,
  ROTATE_LEFT: 4,
  BRAKING: 5,
  BRAKING_BACK: 6,
  STARTING: 7,
  STARTING_BACKWARD: 8,
}

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Standing extends State {
  constructor(player) {
    super('STANDING');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 0;
    this.player.speed = 0;
    this.player.angleStep = 0;
  }

  handleInput(input) {
    if (input === 'PRESS up') this.player.setState(states.STARTING);
    else if (input === 'PRESS down') this.player.setState(states.STARTING_BACKWARD);
    else if (input === 'PRESS right') this.player.setState(states.ROTATE_RIGHT);
    else if (input === 'PRESS left') this.player.setState(states.ROTATE_LEFT);
  }
}

export class MoveForward extends State {
  constructor(player) {
    super('MOVE FORWARD');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
    this.player.speed += this.player.maxSpeed;
  }

  handleInput(input) {
    if (input === 'RELEASE up') this.player.setState(states.BRAKING);
    else if (input === 'PRESS down') this.player.setState(states.MOVE_BACKWARD);
    else if (input === 'PRESS right') this.player.setState(states.ROTATE_RIGHT);
    else if (input === 'PRESS left') this.player.setState(states.ROTATE_LEFT);
  }
}

export class MoveBackward extends State {
  constructor(player) {
    super('MOVE BACKWARD');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
    this.player.speed += -this.player.maxSpeed * 0.5;
  }

  handleInput(input) {
    if (input === 'RELEASE down') this.player.setState(states.BRAKING_BACK);
  }
}

export class RotateRight extends State {
  constructor(player) {
    super('ROTATE RIGHT');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 3;
    this.player.angleStep = 0.3;
  }

  handleInput(input) {
    if (input === 'RELEASE right') this.player.setState(states.STANDING);
    if (input === 'PRESS up') this.player.setState(states.MOVE_FORWARD);
    if (input === 'PRESS down') this.player.setState(states.MOVE_BACKWARD);
  }
}

export class RotateLeft extends State {
  constructor(player) {
    super('ROTATE LEFT');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 2;
    this.player.angleStep = -0.3;
  }

  handleInput(input) {
    if (input === 'RELEASE left') this.player.setState(states.STANDING);
    if (input === 'PRESS up') this.player.setState(states.MOVE_FORWARD);
    if (input === 'PRESS down') this.player.setState(states.MOVE_BACKWARD);
  }
}

export class Braking extends State {
  constructor(player) {
    super('BRAKING');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 0;
  }

  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.ROTATE_RIGHT);
    else if (input === 'PRESS left') this.player.setState(states.ROTATE_LEFT);
    else if (this.player.speed === 0) this.player.setState(states.STANDING);
  }
}

export class BrakingBack extends State {
  constructor(player) {
    super('BRAKING BACK');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 0;
  }

  handleInput(input) {
    if (this.player.speed === 0) this.player.setState(states.STANDING);
  }
}

export class Starting extends State {
  constructor(player) {
    super('STARTING');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (input === 'RELEASE up') this.player.setState(states.BRAKING);
    else if (this.player.speed === this.player.maxSpeed) this.player.setState(states.MOVE_FORWARD);
  }
}

export class StartingBackward extends State {
  constructor(player) {
    super('STARTING BACKWARD');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (input === 'RELEASE down') this.player.setState(states.BRAKING_BACK);
    else if (this.player.speed === -this.player.maxSpeed * 0.5) this.player.setState(states.MOVE_BACKWARD);
  }
}
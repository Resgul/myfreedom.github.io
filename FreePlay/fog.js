export default class Fog {
  constructor(player) {
    this.player = player;
    this.x = player.x + 25 + Math.random() * 10;
    this.y = player.y + 50 + Math.random() * 5;
    this.radius = 3 + Math.random() * 10;
    this.color = 'gray';
    this.line = 5 + Math.random() * 2;
  }

  update() {
    this.line -= 0.02
    this.radius += 0.03
    this.x += 0.01;
    this.y += 0.1;
  }

  draw(context) {
    context.beginPath();
    context.lineWidth = this.line;
    context.strokeStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  particleHandler(particlesArray, context) {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw(context);
  
      if (particlesArray[i].line <= 0.3) {
        particlesArray.splice(i, 1);
        i--; //избегает мерцания после удаления
      }
    }
  }
}
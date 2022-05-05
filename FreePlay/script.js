import Player from './player.js';
import InputHandler from './input.js';
import {drawStatusText} from './utils.js';

window.addEventListener('load', () => {
  loader.remove();
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  
  function resizeWindow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeWindow();
  window.addEventListener('resize', resizeWindow)

  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();

  function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    player.update(input.lastKey);
    player.draw(ctx);
    drawStatusText(ctx, input, player);
    requestAnimationFrame(animate);
  }
  animate()
})
export function drawStatusText(context, input, player) {
  context.font = '20px Helvetica ';
  context.fillText('Last input: ' + input.lastKey, 20, 30);
  context.fillText('Active state: ' + player.currientState.state, 20, 60);
  context.font = '15px Helvetica ';
  context.fillText('Speed: ' + (Math.floor(player.speed*100)/100), player.x-40, player.y-30);
  context.fillText('Angle: ' + Math.floor(-player.angleDeg), player.x-40, player.y-50);
  context.font = 'bold 20px Helvetica ';
  context.fillText('Упрвление на стрелки', 20, 90);
}
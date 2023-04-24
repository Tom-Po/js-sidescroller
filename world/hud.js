import HealthBar from './healthbar';

const gameOver = document.getElementById('gameOver');
const gold = new Image();
gold.src = '/sprites/item/gold.png';

export default class HUD {
  constructor(game) {
    this.game = game;
    this.healthBar = new HealthBar(game);
  }

  update(input) {
    if (this.game.state === 'death') {
      gameOver.style.display = 'flex';
      const gameOverScore = document.getElementById('gameOverScore');
      gameOverScore.innerText = this.game.score;
    }
    if (input.keys.indexOf('Escape') > -1) {
      if (this.game.state === 'death') {
        gameOver.style.display = 'none';
        this.game.restart();
      } else if (this.game.state === 'playing') {
        this.game.state = 'paused';
      } else {
        this.game.state = 'playing';
      }
    }
    if (input.keys.indexOf('p') > -1) {
      this.game.debug = !this.game.debug;
    }
  }

  draw(context) {
    this.healthBar.update();
    this.healthBar.draw(context);

    context.drawImage(gold, 0, 32, 32, 32);
    context.font = '20px arial';
    context.fillStyle = 'white';
    context.fillText(this.game.player.gold, 32, 64);
  }
}

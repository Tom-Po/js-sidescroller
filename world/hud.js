import HealthBar from './healthbar';

const gameOver = document.getElementById('gameOver');

export default class HUD {
  constructor(game) {
    this.game = game;
    this.healthBar = new HealthBar(game);
  }

  update(input) {
    if (this.game.state === 'death') {
      gameOver.style.display = 'flex';
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
  }

  draw(context) {
    this.healthBar.update();
    this.healthBar.draw(context);
  }
}
import Bat from './Bat';
import Slime from './Slime';
import Sprite from './Sprite';

const potionImage = new Image();
potionImage.src = './sprites/item/blue-potion.png';

// Stable FPS 120 upto 1K - 10K = 30fps
const ENEMY_COUNT = 10;
const ENEMY_POP_RATE = 1000;

const score = document.getElementById('score');

function getRandomEnemy(game) {
  return Math.random() > 0.5 ? new Bat(game) : new Slime(game);
}

export default class EntityManager {
  constructor(game) {
    this.game = game;
    this.enemies = [];
    this.enemyPopRate = ENEMY_POP_RATE;

    this.worldItems = [
      new Sprite(potionImage, 2),
    ];

    this.init();
  }

  init() {
    for (let i = 0; i < ENEMY_COUNT; i++) {
      this.enemies.push(getRandomEnemy(this.game));
    }
  }

  update() {
    if (this.game.deltaTime % this.enemyPopRate === 0) {
      // Augmente le popRate au fur et à mesure
      this.enemyPopRate -= Math.floor(this.game.score / 100);
      this.enemies.push(getRandomEnemy(this.game));
    }
  }

  draw(context) {
    this.enemies.forEach((enemy, idx) => {
      enemy.update();
      if (!enemy.alive) {
        this.game.score++;
        score.innerHTML = this.game.score;
        this.enemies.splice(idx, 1);
        this.enemies.push(getRandomEnemy(this.game));
      }
      enemy.draw(context);
    });

    this.worldItems.forEach((item) => {
      item.draw(context);
    });
  }
}

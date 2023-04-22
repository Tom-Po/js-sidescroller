import Bat from './Bat';
import Projectile from './Projectile';
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
    this.player = game.player;

    this.enemies = [];
    this.enemyPopRate = ENEMY_POP_RATE;

    this.projectiles = [new Projectile(
      this,
      this.player.sprite.x + this.player.sprite.spriteWidth / 2,
      this.player.sprite.y,
    )];

    this.worldItems = [
      new Sprite(potionImage, 2),
    ];

    for (let i = 0; i < ENEMY_COUNT; i++) {
      this.enemies.push(getRandomEnemy(this.game));
    }
  }

  addProjectile() {
    if (this.projectiles.length > 20) {
      this.projectiles.splice(0, 10);
    }
    this.projectiles.push(new Projectile(
      this,
      this.player.sprite.x + this.player.sprite.spriteWidth / 2,
      this.player.sprite.y,
    ));
  }

  fireCurrentProjectile(mousePosition) {
    this.projectiles.forEach((p) => {
      if (!p.fired) {
        p.fireProjectile(mousePosition);
      }
    });
  }

  addEnemy() {
    this.enemies.push(getRandomEnemy(this.game));
  }

  update(input) {
    if (this.game.deltaTime % this.enemyPopRate === 0) {
      // Augmente le popRate au fur et à mesure
      this.enemyPopRate -= Math.floor(this.game.score / 100);
      this.addEnemy();
    }
    this.projectiles.forEach((p) => {
      const before = p.fired;
      p.update(input);
      if (p.fired !== before) {
        this.addProjectile();
      }
    });
    this.enemies.forEach((enemy, idx) => {
      enemy.update();
      if (!enemy.alive) {
        this.game.score++;
        score.innerHTML = this.game.score;
        this.enemies.splice(idx, 1);
        this.addEnemy();
      }
    });
  }

  draw(context) {
    [...this.enemies, ...this.worldItems, ...this.projectiles].forEach((item) => {
      item.draw(context);
    });
  }
}

import Items from '../items.json';
import Bat from './bat';
import Item from './item/item';
import Projectile from './projectile';
import Slime from './slime';

const gold = new Image();
gold.src = './sprites/item/gold.png';
const dollar = new Image();
dollar.src = './sprites/item/dollar.png';

// Stable FPS 120 upto 1K - 10K = 30fps
const ENEMY_COUNT = 10;
const ENEMY_POP_RATE = 1000;
const DROP_RATE = 20;

function getRandomEnemy(game) {
  return Math.random() > 0.5 ? new Bat(game) : new Slime(game);
}

function getRandomLoot(position) {
  const lootPool = Object.keys(Items);
  const rng = Math.floor(Math.random() * lootPool.length) % lootPool.length;
  const loot = Items[lootPool[rng]];
  return new Item(loot, 1.5, position.x, position.y);
}

export default class EntityManager {
  constructor(game) {
    this.game = game;
    this.player = game.player;

    this.enemies = [];
    this.enemyPopRate = ENEMY_POP_RATE;

    this.projectiles = [new Projectile(
      this,
    )];

    this.worldItems = [];

    for (let i = 0; i < ENEMY_COUNT; i++) {
      this.enemies.push(getRandomEnemy(this.game));
    }
  }

  addWorldItem(item) {
    this.worldItems.push(item);
  }

  addProjectile() {
    if (this.projectiles.length > 20) {
      this.projectiles.splice(0, 10);
    }
    this.projectiles.push(new Projectile(
      this,
      this.player.sprite.x + this.player.sprite.spriteWidth,
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
        this.enemies.splice(idx, 1);
        if (Math.random() < DROP_RATE / 100) {
          const loot = getRandomLoot(enemy.sprite);
          this.addWorldItem(loot);
        }
        this.addEnemy();
      }
    });

    this.worldItems.forEach((item, idx) => {
      if (item.y < this.game.height - 100) {
        this.worldItems[idx].y += 3;
      } else if (item.y > this.game.height - 100) {
        this.worldItems[idx].y = this.game.height - 100;
      }
      if (item.picked === true) {
        this.worldItems.splice(idx, 1);
      }
    });
  }

  draw(context) {
    [...this.enemies, ...this.projectiles, ...this.worldItems].forEach((item) => {
      item.draw(context);
    });
  }
}

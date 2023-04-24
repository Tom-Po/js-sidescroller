import Enemies from '../data/enemies.json';
import { checkRadialCollision, checkRectangleCollision } from '../utils';
import AnimatedSprite from './animated-sprite';
import Enemy from './enemy';

export default class Bat extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.sprite = new AnimatedSprite(
      Enemies.bat.image,
      Enemies.bat.animationStates,
      Math.random() * this.game.width,
      Math.random() * (this.game.height / 4),
      Enemies.bat.reverseImage,
    );

    this.sprite.spriteHeight = 42;
    this.sprite.spriteWidth = 64;
    this.sprite.staggerFrames = 10;

    this.sprite.setAnimation('fly');

    this.alive = true;
    this.attacking = false;
    this.attackRange = 100;
  }

  update() {
    if (this.game.debug) {
      this.sprite.showBox = true;
    }

    if (this.game.state === 'paused' || this.game.state === 'death') return;
    this.velocity += this.game.score / this.game.entityManager.enemies.length / 100;
    if (this.sprite.x < this.player.sprite.x) {
      this.directionRatioX = 1;
      this.sprite.unflip();
    } else {
      this.directionRatioX = -1;
      this.sprite.flip();
    }

    if (this.sprite.y > this.game.height - 100) {
      this.directionRatioY = -1;
    } else {
      this.directionRatioY = 1;
    }
    const {
      velocity, directionRatioX, directionRatioY, game,
    } = this;

    this.sprite.x += (Math.random() - 0.2) * 2 * velocity * directionRatioX - (game.gameSpeed * 2);
    this.sprite.y += (Math.random()) * 2 * velocity * directionRatioY;

    if (checkRectangleCollision(this.sprite, this.game.player.sprite)) {
      this.attackPlayer();
    }

    this.attacking = checkRadialCollision(
      (this.sprite.x + this.sprite.spriteWidth) / 2,
      (this.sprite.y + this.sprite.spriteHeight) / 2,
      this.attackRange,
      (this.player.sprite.x + this.player.sprite.spriteWidth) / 2,
      (this.player.sprite.y + this.player.sprite.spriteHeight) / 2,
      0,
    );
    if (this.attacking) {
      this.velocity = 1;
    } else (this.velocity = 0.4);
  }
}

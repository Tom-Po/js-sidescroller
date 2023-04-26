import Enemies from '../../data/enemies.json';
import AnimatedSprite from '../animated-sprite';

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.sprite = new AnimatedSprite(
      Enemies.bat.image,
      Enemies.bat.animationStates,
      Math.random() * this.game.width,
      Math.random() * (this.game.height / 4),
      Enemies.bat.reverseImage,
    ); this.sprite.staggerFrame = 10;
    this.directionRatioX = 1;
    this.directionRatioY = 1;
    this.velocity = 0.4;

    this.alive = true;
    this.attacking = false;
    this.attackRange = 200;
    this.killed = false;
    this.sprite.showHitBox = true;
  }

  die() {
    this.alive = false;
    this.killed = true;
    this.sprite.showHitBox = true;
    this.sprite.showBox = true;
  }

  attackPlayer() {
    this.alive = false;
    this.game.entityManager.player.getHit();
  }

  draw(context) {
    this.sprite.draw(context);
  }
}

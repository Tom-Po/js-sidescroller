import Enemies from '../enemies.json';
import AnimatedSprite from './AnimatedSprite';

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
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
  }

  attackPlayer() {
    this.alive = false;
    this.player.getHit();
  }

  draw(context) {
    this.sprite.draw(context);
  }
}

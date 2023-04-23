import Enemies from '../enemies.json';
import { checkRectangleCollision } from '../utils';
import AnimatedSprite from './animated-sprite';
import Enemy from './enemy';

export default class Slime extends Enemy {
  constructor(game) {
    super(game);
    this.sprite = new AnimatedSprite(Enemies.slime.image, Enemies.slime.animationStates);
    this.sprite.staggerFrames = 15;
    this.sprite.spriteHeight = 32;
    this.sprite.spriteWidth = 32;
    this.sprite.x = this.game.width - this.sprite.spriteWidth;
    this.sprite.y = 540 - 16;
    this.sprite.staggerFrames = 30;
    this.velocity = 1;
  }

  update() {
    this.sprite.showBox = this.game.debug;

    if (this.game.state === 'paused' || this.game.state === 'death') return;

    // make run in circle
    // sometimes change direction
    // aggro player when close

    const random = (Math.random() - 0.5) * 2;
    const direction = random > 0 ? 1 : -1;
    const step = random * this.velocity * direction;

    this.sprite.x -= step;

    if (checkRectangleCollision(this.sprite, this.player.sprite)) {
      this.attackPlayer();
    }
  }
}

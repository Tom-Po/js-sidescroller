import { checkRectangleCollision } from '../utils';
import AnimatedSprite from './AnimatedSprite';
import Enemy from './Enemy';
import Enemies from '../enemies.json';

export default class Slime extends Enemy {
  constructor(game) {
    super(game);
    this.sprite = new AnimatedSprite(Enemies.slime.image, Enemies.slime.animationStates);
    this.sprite.staggerFrames = 15;
    this.sprite.spriteHeight = 32;
    this.sprite.spriteWidth = 32;
    this.sprite.x = this.game.width - this.sprite.spriteWidth;
    this.sprite.y = this.game.height - 100;
    this.sprite.staggerFrames = 30;
  }

  update() {
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

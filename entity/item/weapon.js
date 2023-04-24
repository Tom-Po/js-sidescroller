import Weapons from '../../data/weapons.json';
import AnimatedSprite from '../animated-sprite';

export default class Weapon {
  constructor(player) {
    this.player = player;

    this.direction = 1;
    this.sprite = new AnimatedSprite(
      Weapons.phammer.image,
      Weapons.phammer.animationStates,
      this.player.sprite.x + (20 * this.direction),
      this.player.sprite.y - 10,
      Weapons.phammer.reverseImage,
    );

    this.sprite.setAnimation('active');
    this.sprite.staggerFrames = 20;

    // In case some items doesnt deal damage
    this.baseDamage = 0;
    this.range = 10;
  }

  update() {
    this.sprite.x = this.player.sprite.x + (20 * this.direction);
    this.sprite.y = this.player.sprite.y - 10;
  }

  draw(context) {
    if (this.player.sprite.currentAnimation === 'death') return;
    this.sprite.draw(context);
  }
}

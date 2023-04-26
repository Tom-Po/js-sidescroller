import PlayerSprites from '../../data/player.json';
import { isOutside } from '../../utils';
import AnimatedSprite from '../animated-sprite';
import Weapon from '../item/weapon';
import Inventory from './inventory';
import Spell from './spell';

const MAX_JUMP_HEIGHT = 200;
const GROUND_LEVEL = 497;

export default class Player {
  constructor(game) {
    this.game = game;
    this.sprite = new AnimatedSprite(
      PlayerSprites.rogue.image,
      PlayerSprites.rogue.animationStates,
      3,
    );
    this.sprite.setAnimation('walk');
    this.sprite.staggerFrames = 10;
    this.sprite.x = game.width / 2 - this.sprite.width / 2;

    this.playerBaseHeight = game.height - 103;
    this.sprite.y = this.playerBaseHeight;
    this.sprite.flippedImage = new Image();
    this.sprite.flippedImage.src = PlayerSprites.rogue.reverseImage;

    this.stats = {
      baseHp: 6,
      maxHp: 6,
      baseArmor: 2,
      moveSpeed: 0.3,
    };

    this.spell = new Spell(this);
    this.weapon = new Weapon(this);

    // TODO remove
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;

    this.gold = 0;

    this.inventory = new Inventory(game);
  }

  die() {
    this.game.state = 'death';
    this.sprite.isFreezed = true;
    this.game.gameSpeed = 0;
  }

  getHit() {
    if (this.stats.baseArmor > 0) {
      this.stats.baseArmor--;
      return;
    }
    this.stats.baseHp--;
    if (this.stats.baseHp === 0) {
      this.sprite.setAnimation('death');
    }
  }

  onGround() {
    return this.sprite.y >= this.playerBaseHeight;
  }

  moveLeft() {
    this.speed = -5;
    this.game.gameSpeed = -0.3;
    this.sprite.flip();
    this.weapon.sprite.flip();
    this.weapon.direction = -1;
  }

  moveRight() {
    this.speed = 5;
    this.game.gameSpeed = 0.3;
    this.sprite.unflip();
    this.weapon.sprite.unflip();
    this.weapon.direction = 1;
  }

  manageInput(input) {
    // Inputs
    // Inventory
    this.inventory.open = input.keys.indexOf('Tab') > -1;
    // Idle
    if (!input.keys.length && !this.sprite.currentAnimation === 'death') {
      this.sprite.setAnimation('idle');
    }
    if (input.mouseDown) {
      this.game.entityManager.fireCurrentProjectile(input.mousePosition);
    }
    // Movements
    if (input.keys.indexOf('d') > -1 || input.keys.indexOf('ArrowRight') > -1) {
      this.moveRight();
    } else if (input.keys.indexOf('q') > -1 || input.keys.indexOf('ArrowLeft') > -1) {
      this.moveLeft();
    } else {
      this.speed = 0;
      this.game.gameSpeed = 0;
    }
    if (input.keys.indexOf('z') > -1 && this.onGround()) {
      this.vy -= 20;
    }
    if (input.keys.indexOf('Space') > -1) {
      this.weapon.sprite.isFreezed = false;
      this.sprite.setAnimation('attack');
      for (let i = 0; i < this.game.entityManager.enemies.length; i++) {
        if (!isOutside(
          this.weapon.sprite,
          this.game.entityManager.enemies[i].sprite,
        )) {
          this.game.entityManager.enemies[i].killed = true;
          this.game.entityManager.enemies[i].die();
        }
      }
    } else {
      this.weapon.sprite.isFreezed = true;
      this.weapon.sprite.position = 0;
      if (this.sprite.currentAnimation === 'attack' && this.sprite.position === 0) {
        this.sprite.setAnimation('idle');
      }
    }

    // Casting
    this.spell.isCasting = input.keys.indexOf('e') > -1;
    if (this.spell.isCasting) {
      this.spell.spellDamageCheck(this.game.entityManager.enemies);
    } else {
      this.spellCooldown--;
    }
  }

  updatePosition() {
    // Horizontal move
    this.sprite.x += this.speed;
    if (this.sprite.x < 0) this.sprite.x = 0;
    else if (this.sprite.x > this.game.width - this.sprite.width) {
      this.sprite.x = this.game.width - this.sprite.width;
    }

    // Vertical move
    this.sprite.y += this.vy;
    if (!this.onGround()) {
      if (this.sprite.y < GROUND_LEVEL - MAX_JUMP_HEIGHT) {
        this.sprite.y = GROUND_LEVEL - MAX_JUMP_HEIGHT;
      }
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
    if (this.sprite.y > this.playerBaseHeight) this.sprite.y = this.playerBaseHeight;
  }

  update(input) {
    if (this.sprite.isFreezed) return;
    this.sprite.showBox = this.weapon.sprite.showBox = this.game.debug;
    this.manageInput(input);
    this.updatePosition();

    for (let i = 0; i < this.game.entityManager.worldItems.length; i++) {
      const currentItem = this.game.entityManager.worldItems[i];
      if (!isOutside(this.sprite, currentItem)) {
        currentItem.picked = true;
        if (currentItem.inventory === true) {
          this.inventory.addItem(currentItem);
        }
        if (currentItem.value) {
          this.gold += currentItem.value;
        }
      }
    }

    // Block animation on lastframe of death and trigger death screen
    // avoid sprite position cycle again
    if (this.sprite.currentAnimation === 'death' && this.sprite.position === 9) {
      this.die();
    } else {
      this.weapon.update();
      // this.projectile.update(input);
      this.spell.update(input);
    }
  }

  draw(context) {
    // this.projectile.draw(context);
    this.spell.draw(context);
    this.sprite.draw(context);
    // this.weapon.draw(context);
    this.inventory.draw(context);
  }
}

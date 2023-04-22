import PlayerSprites from '../player.json';
import { checkRectangleCollision } from '../utils';
import AnimatedSprite from './AnimatedSprite';
import Spell from './Spell';
import Weapon from './Weapon';

const MAX_JUMP_HEIGHT = 200;

class Player {
  constructor(game) {
    this.game = game;
    this.sprite = new AnimatedSprite(
      PlayerSprites.rogue.image,
      PlayerSprites.rogue.animationStates,
    );
    this.sprite.setAnimation('walk');
    this.sprite.staggerFrames = 10;

    this.sprite.x = game.width / 2 - this.sprite.spriteWidth / 2;
    this.playerBaseHeight = game.height - this.sprite.spriteHeight - 40;
    this.sprite.y = this.playerBaseHeight;
    this.sprite.flippedImage = new Image();
    this.sprite.flippedImage.src = PlayerSprites.rogue.reverseImage;

    this.baseHp = 6;
    this.maxHp = 6;
    this.baseArmor = 2;
    this.moveSpeed = 0.3;

    this.isJumping = false;
    this.jumpVelocity = 1;

    this.spell = new Spell(this);
    this.weapon = new Weapon(this);

    // TODO remove
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
  }

  die() {
    this.sprite.setAnimation('death');
    this.game.gameSpeed = 0;
  }

  getHit() {
    if (this.baseArmor > 0) {
      this.baseArmor--;
      return;
    }
    this.baseHp--;
    if (this.baseHp === 0) {
      this.die();
    }
  }

  onGround() {
    return this.sprite.y >= this.playerBaseHeight;
  }

  moveLeft() {
    this.speed = !this.onGround() ? -10 : -5;
    this.game.gameSpeed = -0.3;
    this.sprite.flip();
    this.weapon.sprite.flip();
    this.weapon.direction = -1;
  }

  moveRight() {
    this.speed = !this.onGround() ? 10 : 5;
    this.game.gameSpeed = 0.3;
    this.sprite.unflip();
    this.weapon.sprite.unflip();
    this.weapon.direction = 1;
  }

  manageInput(input) {
    // Inputs
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
    if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
      this.vy -= 20;
    }
    if (input.keys.indexOf('Space') > -1) {
      this.weapon.sprite.isFreezed = false;
      for (let i = 0; i < this.game.entityManager.enemies.length; i++) {
        if (checkRectangleCollision(
          this.weapon.sprite,
          this.game.entityManager.enemies[i].sprite,
        )) {
          this.game.entityManager.enemies[i].die();
        }
      }
    } else {
      this.weapon.sprite.isFreezed = true;
      this.weapon.sprite.position = 0;
    }

    // Casting
    if (input.keys.indexOf('e') > -1) {
      this.spell.isCasting = true;
      this.spell.spellDamageCheck(this.game.entityManager.enemies);
    } else {
      this.spell.isCasting = false;
      this.spellCooldown--;
    }
  }

  updatePosition() {
    // Horizontal move
    this.sprite.x += this.speed;
    if (this.sprite.x < 0) this.sprite.x = 0;
    else if (this.sprite.x > this.game.width - this.sprite.spriteWidth) {
      this.sprite.x = this.game.width - this.sprite.spriteWidth;
    }

    // Vertical move
    this.sprite.y += this.vy;
    if (!this.onGround()) {
      if (this.sprite.y < this.playerBaseHeight - MAX_JUMP_HEIGHT) {
        this.sprite.y = this.playerBaseHeight - MAX_JUMP_HEIGHT;
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
    // Block animation on lastframe of death and trigger death screen
    // avoid sprite position cycle again
    if (this.sprite.currentAnimation === 'death' && this.sprite.position === 9) {
      this.game.state = 'death';
      this.sprite.isFreezed = true;
      this.game.gameSpeed = 0;
    }
    this.weapon.update();
    // this.projectile.update(input);
    this.spell.update(input);
  }

  draw(context) {
    // this.projectile.draw(context);
    this.spell.draw(context);
    this.sprite.draw(context);
    this.weapon.draw(context);
  }
}

export default Player;

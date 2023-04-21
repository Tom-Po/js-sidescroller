import { checkRadialCollision } from '../utils';
import AnimatedSprite from './AnimatedSprite';
import PlayerSprites from '../player.json';
// First sprite

const SPELL_DURATION_BASE = 500;
const SPELL_COOLDOWN_BASE = 100;
const SPELL_RANGE_BASE = 128;
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
    this.sprite.showBox = true;

    this.baseHp = 6;
    this.maxHp = 6;
    this.baseArmor = 2;
    this.moveSpeed = 0.3;

    this.isJumping = false;
    this.jumpVelocity = 1;

    this.spellDuration = SPELL_DURATION_BASE;
    this.spellRange = SPELL_RANGE_BASE;
    this.spellRangeMax = SPELL_RANGE_BASE;
    this.spellCooldown = SPELL_COOLDOWN_BASE;

    // TODO remove
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
  }

  heal() {
    if (this.baseHp < this.maxHp) this.baseHp++;
  }

  getHit() {
    if (this.baseArmor > 0) {
      this.baseArmor--;
      return;
    }
    this.baseHp--;
    if (this.baseHp === 0) {
      this.sprite.setAnimation('death');
    }
  }

  spellDamageCheck() {
    for (let i = 0; i < this.game.entityManager.enemies.length; i++) {
      // Check if enemy is in range of circle
      const successfullHit = checkRadialCollision(
        this.sprite.x,
        this.sprite.y,
        this.spellRange,
        this.game.entityManager.enemies[i].sprite.x,
        this.game.entityManager.enemies[i].sprite.y,
        0,
      );
      if (successfullHit) {
        this.game.entityManager.enemies[i].alive = false;
        // this.spellRangeMax += 5
      }
    }

    this.spellDuration--;
    this.spellRange += 3;
    if (this.spellRange > this.spellRangeMax) this.spellRange = this.spellRangeMax;
    if (this.spellDuration === 0) {
      this.spellDuration = SPELL_DURATION_BASE;
      this.spellCooldown = SPELL_COOLDOWN_BASE;
      this.isCasting = false;
    }
  }

  onGround() {
    return this.sprite.y >= this.playerBaseHeight;
  }

  update(input) {
    if (this.sprite.isFreezed) return;

    // Inputs
    // Movements
    if (!input.keys.length) {
      this.sprite.setAnimation('idle');
    }
    if (input.keys.indexOf('d') > -1 || input.keys.indexOf('ArrowRight') > -1) {
      this.speed = !this.onGround() ? 10 : 5;
      this.game.gameSpeed = 0.3;
      this.sprite.unflip();
    } else if (input.keys.indexOf('q') > -1 || input.keys.indexOf('ArrowLeft') > -1) {
      this.speed = !this.onGround() ? -10 : -5;
      this.game.gameSpeed = -0.3;
      this.sprite.flip();
    } else {
      this.speed = 0;
      this.game.gameSpeed = 0;
    }
    if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('Space') > -1) && this.onGround()) {
      this.vy -= 20;
    }
    // Idle

    // Casting
    if (input.keys.indexOf('e') > -1) {
      this.isCasting = true;
      this.spellDamageCheck();
    } else {
      this.isCasting = false;
      this.spellCooldown--;
    }

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

  draw(context) {
    // Temp cast radius
    if (this.isCasting) {
      context.strokeStyle = '#DDEEFF';
      context.lineWidth = 10;
      context.beginPath();
      context.arc(
        this.sprite.x + this.sprite.spriteWidth / 2,
        this.sprite.y + this.sprite.spriteHeight / 2,
        this.spellRange,
        0,
        2 * Math.PI,
      );
      context.stroke();
      context.lineWidth = 1;
    }
    // Block animation on lastframe of death
    // and avoid movement while character is dead
    if (this.sprite.currentAnimation === 'death' && this.sprite.position === 9) {
      this.game.state = 'death';
      this.sprite.isFreezed = true;
    }
    this.sprite.draw(context);
  }
}

export default Player;

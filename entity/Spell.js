import { checkRadialCollision } from '../utils';

const SPELL_DURATION_BASE = 500;
const SPELL_COOLDOWN_BASE = 100;
const SPELL_RANGE_BASE = 128;

export default class Spell {
  constructor(player) {
    this.player = player;

    this.isCasting = false;
    this.spellDuration = SPELL_DURATION_BASE;
    this.spellRange = SPELL_RANGE_BASE;
    this.spellRangeMax = SPELL_RANGE_BASE;
    this.spellCooldown = SPELL_COOLDOWN_BASE;
    this.position = {
      x: this.player.sprite.x,
      y: this.player.sprite.y,
    };
  }

  spellDamageCheck(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      // Check if enemy is in range of circle
      const successfullHit = checkRadialCollision(
        this.position.x,
        this.position.y,
        this.spellRange,
        enemies[i].sprite.x,
        enemies[i].sprite.y,
        enemies[i].sprite.spriteWidth,
      );
      if (successfullHit) {
        enemies[i].die();
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

  update(input) {
    this.position = input.mousePosition;
  }

  draw(context) {
    // Temp cast radius
    if (this.isCasting) {
      context.strokeStyle = '#DDEEFF';
      context.lineWidth = 10;
      context.beginPath();
      context.arc(
        this.position.x,
        this.position.y,
        this.spellRange,
        0,
        2 * Math.PI,
      );
      context.stroke();
      context.lineWidth = 1;
    }
  }
}

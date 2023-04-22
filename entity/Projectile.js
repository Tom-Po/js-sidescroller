import { angleBetween, checkRectangleCollision } from '../utils';

const groundPoint = 540;

// Projectile prototype
export default class Projectile {
  constructor(entityManager, x = 0, y = 0) {
    this.entityManager = entityManager;
    this.x = x;
    this.y = y;
    this.ProjectileTipCoords = {
      x: this.x + 20,
      y: this.y,
    };
    // left and right parts of the Projectile head
    this.leftTipCoords = {
      x: this.x + 17,
      y: this.y - 3,
    };
    this.rightTipCoords = {
      x: this.x + 17,
      y: this.y + 3,
    };
    this.velX = 0;
    this.velY = 0;
    this.speed = 0;
    this.firing = false;
    this.angle = 0;
    this.speedMod = 1;

    this.fired = false;
  }

  fireProjectile(mousePosition) {
    if (!this.firing) {
      this.speed = 10 / this.speedMod;
      this.velX = Math.cos(angleBetween(this, mousePosition)) * this.speed;
      this.velY = Math.sin(angleBetween(this, mousePosition)) * this.speed;
      this.firing = true;
      //   addProjectile();
    }
  }

  calcTrajectory() {
    if (this.y <= groundPoint && this.firing) {
      this.velY += 0.1;
      this.x += this.velX;
      this.y += this.velY;
      for (let i = 0; i < this.entityManager.enemies.length; i++) {
        if (checkRectangleCollision({
          x: this.x,
          y: this.y,
          spriteWidth: 0,
          spriteHeight: 0,
        }, this.entityManager.enemies[i].sprite)) {
          this.entityManager.enemies[i].die();
        }
      }
    } else if (this.firing) {
      this.fired = true;
    } else {
      this.velX = 0;
      this.velY = 0;
      this.firing = false;
    }
  }

  calcProjectileHead(input) {
    if (this.firing) {
      this.angle = Math.atan2(this.velX, this.velY);
    } else {
      this.angle = Math.PI / 2 - angleBetween(this, input.mousePosition);
    }
    this.ProjectileTipCoords.x = this.x + 20 * Math.sin(this.angle);
    this.ProjectileTipCoords.y = this.y + 20 * Math.cos(this.angle);
    const ProjectileTip = { x: this.ProjectileTipCoords.x, y: this.ProjectileTipCoords.y };

    this.leftTipCoords.x = ProjectileTip.x - 3 * Math.sin(this.angle - Math.PI / 4);
    this.leftTipCoords.y = ProjectileTip.y - 3 * Math.cos(this.angle - Math.PI / 4);
    this.rightTipCoords.x = ProjectileTip.x - 3 * Math.sin(this.angle + Math.PI / 4);
    this.rightTipCoords.y = ProjectileTip.y - 3 * Math.cos(this.angle + Math.PI / 4);
  }

  update(input) {
    if (!this.fired) {
      this.calcTrajectory(input);
      this.calcProjectileHead(input);
      if (!this.firing) {
        this.x = this.entityManager.player.sprite.x
              + this.entityManager.player.sprite.spriteWidth / 2;
        this.y = this.entityManager.player.sprite.y;
      }
    }
  }

  draw(ctx) {
    const ProjectileTip = this.ProjectileTipCoords;
    const leftTip = this.leftTipCoords;
    const rightTip = this.rightTipCoords;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(ProjectileTip.x, ProjectileTip.y);

    ctx.moveTo(ProjectileTip.x, ProjectileTip.y);
    ctx.lineTo(leftTip.x, leftTip.y);

    ctx.moveTo(ProjectileTip.x, ProjectileTip.y);
    ctx.lineTo(rightTip.x, rightTip.y);

    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

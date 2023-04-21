export default class Layer {
  constructor(image, speedModifier, game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = image.width;
    this.height = image.height;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.game.gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = this.game.gameSpeed * this.speedModifier;
    if (this.x <= -this.width || this.x >= this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
    // this.x = gameFrame * this.speed % this.width
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

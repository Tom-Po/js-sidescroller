export default class Sprite {
  constructor(image, scale = 1, x = 0, y = 0) {
    this.image = image;
    this.spriteHeight = this.image.height;
    this.spriteWidth = this.image.width;
    this.scale = scale;
    this.x = x;
    this.y = y;
  }

  draw(context) {
    if (this.showBox) {
      context.strokeStyle = 'red';
      context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.spriteWidth * this.scale,
      this.spriteHeight * this.scale,
    );
  }
}

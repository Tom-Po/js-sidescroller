export default class Sprite {
  constructor(image, scale = 1) {
    this.image = image;
    this.height = this.image.height;
    this.width = this.image.width;
    this.scale = scale;
  }

  draw(context) {
    if (this.showBox) {
      context.strokeStyle = 'red';
      context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
    context.drawImage(
      this.image,
      800 - this.width * this.scale,
      600 - 100,
      this.width * this.scale,
      this.height * this.scale,
    );
  }
}

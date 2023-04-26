class AnimatedSprite {
  constructor(image, animationStates, x = 0, y = 0, flippedImage = image) {
    this.spriteAnimations = [];

    this.image = new Image();
    this.flippedImage = new Image();
    this.image.src = image;
    this.flippedImage.src = flippedImage;

    this.currentImage = this.image;

    this.width = 64;
    this.height = 64;

    this.currentAnimation = animationStates[0].name;
    this.animationStates = animationStates;
    this.position = 0;

    this.gameFrame = 0;
    this.staggerFrames = 8;
    this.x = x;
    this.y = y;

    this.generateSpriteAnimations();

    this.isFlipped = false;
    this.isFreezed = false;
    this.showHitBox = false;
  }

  flip() {
    this.currentImage = this.flippedImage;
  }

  unflip() {
    this.currentImage = this.image;
  }

  generateSpriteAnimations() {
    this.animationStates.forEach((state, index) => {
      const frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        const positionX = j * this.width;
        const positionY = index * this.height;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }

  setAnimation(animation) {
    this.currentAnimation = animation;
  }

  draw(context) {
    if (this.showBox) {
      context.strokeStyle = 'red';
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    if (this.showHitBox) {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (!this.isFreezed) {
      this.position = Math.floor(
        this.gameFrame / this.staggerFrames,
      ) % this.spriteAnimations[this.currentAnimation].loc.length;
    }

    const frameX = this.width * this.position;
    const frameY = this.spriteAnimations[this.currentAnimation].loc[this.position].y;

    context.drawImage(
      this.currentImage,
      frameX,
      frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    this.gameFrame++;
  }
}

export default AnimatedSprite;

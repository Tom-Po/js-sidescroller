class AnimatedSprite {
  constructor(image, animationStates, x = 0, y = 0, flippedImage = image) {
    this.spriteAnimations = [];

    this.image = new Image();
    this.flippedImage = new Image();
    this.image.src = image;
    this.flippedImage.src = flippedImage;

    this.currentImage = this.image;

    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.currentAnimation = 'walk';
    this.animationStates = animationStates;
    this.gameFrame = 0;
    this.staggerFrames = 8;
    this.x = x;
    this.y = y;
    this.showBox = false;

    this.generateSpriteAnimations();

    this.isFlipped = false;
    this.isFreezed = false;
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
        const positionX = j * this.spriteWidth;
        const positionY = index * this.spriteHeight;
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
      context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
    if (!this.isFreezed) {
      this.position = Math.floor(
        this.gameFrame / this.staggerFrames,
      ) % this.spriteAnimations[this.currentAnimation].loc.length;
    }

    const frameX = this.spriteWidth * this.position;
    const frameY = this.spriteAnimations[this.currentAnimation].loc[this.position].y;

    context.drawImage(
      this.currentImage,
      frameX,
      frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight,
    );
    this.gameFrame++;
  }
}

export default AnimatedSprite;

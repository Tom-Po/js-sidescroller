let gameFrame = 0

class Sprite {
    constructor(image, animationStates, x = 0, y = 0) {
        this.update = this.update.bind(this)
        this.spriteAnimations = []
        this.image = image
        this.spriteWidth = 64
        this.spriteHeight = 64
        this.currentAnimation = 'rside-walk'
        this.animationStates = animationStates
        this.staggerFrames = 10
        this.x = x
        this.y = y
        this.generateSpriteAnimations()
    }

    generateSpriteAnimations() {
        this.animationStates.forEach((state, index) => {
            let frames = {
                loc: [],
            }
            for (let j = 0; j < state.frames; j++) {
                let positionX = j * this.spriteWidth
                let positionY = index * this.spriteHeight
                frames.loc.push({ x: positionX, y: positionY })
            }
            this.spriteAnimations[state.name] = frames
        })
    }

    setAnimation(animation) {
        this.currentAnimation = animation
    }

    update(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.strokeStyle = "red"
        context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight)

        let position = Math.floor(gameFrame / this.staggerFrames) % this.spriteAnimations[this.currentAnimation].loc.length;
        let frameX = this.spriteWidth * position
        let frameY = this.spriteAnimations[this.currentAnimation].loc[position].y
        context.drawImage(
            this.image,
            frameX,
            frameY,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
        )
        gameFrame++
        requestAnimationFrame(() => this.update(context))
    }
}

export default Sprite
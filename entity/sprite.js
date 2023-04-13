class Sprite {
    constructor(image, animationStates, x = 0, y = 0) {
        this.draw = this.draw.bind(this)
        this.spriteAnimations = []
        this.image = image
        this.spriteWidth = 64
        this.spriteHeight = 64
        this.currentAnimation = 'walk'
        this.animationStates = animationStates
        this.gameFrame = 0
        this.staggerFrames = 8
        this.x = x
        this.y = y
        this.showBox = false
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

    draw(context) {
        if (this.showBox) {
            context.strokeStyle = "red"
            context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight)
        }
        let position = Math.floor(this.gameFrame / this.staggerFrames) % this.spriteAnimations[this.currentAnimation].loc.length;
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
        this.gameFrame++
    }
}

export default Sprite
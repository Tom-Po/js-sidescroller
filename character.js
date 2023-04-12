class Character {
    constructor(sprite, x = 0, y = 0) {
        this.sprite = sprite

        this.sprite.x = x
        this.sprite.y = y
        this.init = this.init.bind(this)
        this.init()
    }
    init() {
        let self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') self.moveLeft()
            if (e.key === 'ArrowRight') self.moveRight()
            if (e.key === ' ') self.pointing()
        })
    }
    moveLeft() {
        this.sprite.setAnimation('lside-walk')
    }
    moveRight() {
        this.sprite.setAnimation('rside-walk')
    }
    pointing() {
        this.sprite.setAnimation('pointing')
    }
    update(context) {
        this.sprite.update(context)
    }
}

export default Character
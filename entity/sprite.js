export default class Sprite {
    constructor(image, scale = 1) {
        this.image = image
        this.height = this.image.height
        this.width = this.image.width
        this.scale = scale
    }

    draw(context) {
        context.drawImage(this.image, 0, 600 - 100, this.width * this.scale, this.height * this.scale)
    }
}
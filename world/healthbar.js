const fullContainer = new Image()
fullContainer.src = '/sprites/items/full-heart-container.png'
const emptyContainer = new Image()
emptyContainer.src = '/sprites/items/empty-heart-container.png'
const armorContainer = new Image()
armorContainer.src = '/sprites/items/armor-container.png'

export default class HealthBar {
    constructor(game) {
        this.game = game
        this.heartContainers = []
        this.armorContainers = []
    }

    update() {
        for (let i = 0; i < this.game.player.maxHp + this.game.player.baseArmor; i++) {
            if (i < this.game.player.baseHp) {
                this.heartContainers[i] = fullContainer
            } else if (i < this.game.player.maxHp) {
                this.heartContainers[i] = emptyContainer
            } else if (this.game.player.baseArmor > 0) {
                this.heartContainers[i] = armorContainer
            } else {
                this.heartContainers.slice(i, 1)
            }
        }
        console.log(this.heartContainers)

    }

    draw(context) {
        this.heartContainers.forEach((container, index) => {
            context.drawImage(container, 0 + 32 * index, 0, 32, 32)
        })
    }
}
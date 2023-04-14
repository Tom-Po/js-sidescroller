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
        this.heartContainers = []
        const maxLife = this.game.player.maxHp + this.game.player.baseArmor
        for (let i = 0; i < maxLife; i++) {
            console.log(i < this.game.player.maxHp + this.game.player.baseArmor)
            if (i < this.game.player.baseHp) {
                this.heartContainers[i] = fullContainer
            } else if (i < this.game.player.maxHp) {
                this.heartContainers[i] = emptyContainer
            } else {
                this.heartContainers[i] = armorContainer
            }
        }
    }

    draw(context) {
        this.heartContainers.forEach((container, index) => {
            context.drawImage(container, 0 + 32 * index, 0, 32, 32)
        })
    }
}
import Enemy from './enemy'

// Stable FPS 120 up to 1K - 10K = 30fps
const ENEMY_COUNT = 10
const ENEMY_POP_RATE = 1000


const score = document.getElementById('score')

export default class EntityManager {
    constructor(game) {
        this.game = game
        this.enemies = []
        this.enemyPopRate = ENEMY_POP_RATE
        this.init()
    }
    init() {
        for (let i = 0; i < ENEMY_COUNT; i++) {
            this.enemies.push(new Enemy(this.game))
        }
    }
    update() {
        if (this.game.gameFrame % this.enemyPopRate === 0) {
            // Augmente le popRate
            this.enemyPopRate = this.enemyPopRate - Math.floor(this.game.score / 100)
            this.enemies.push(new Enemy(this.game))
        }
    }
    draw(context) {
        this.enemies.forEach((enemy, idx) => {
            enemy.update()
            if (!enemy.alive) {
                this.game.score++
                score.innerHTML = this.game.score
                this.enemies.splice(idx, 1)
                this.enemies.push(new Enemy(this.game))
            }
            enemy.draw(context)
        })
    }
}
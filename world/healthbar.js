const fullContainer = new Image();
fullContainer.src = '/sprites/item/full-heart-container.png';
const emptyContainer = new Image();
emptyContainer.src = '/sprites/item/empty-heart-container.png';
const armorContainer = new Image();
armorContainer.src = '/sprites/item/armor-container.png';

export default class HealthBar {
  constructor(game) {
    this.game = game;
    this.heartContainers = [];
    this.armorContainers = [];
  }

  update() {
    this.heartContainers = [];
    const { maxHp, baseHp, baseArmor } = this.game.entityManager.player.stats;
    const maxLife = maxHp + baseArmor;
    for (let i = 0; i < maxLife; i++) {
      if (i < baseHp) {
        this.heartContainers[i] = fullContainer;
      } else if (i < maxHp) {
        this.heartContainers[i] = emptyContainer;
      } else {
        this.heartContainers[i] = armorContainer;
      }
    }
  }

  draw(context) {
    this.heartContainers.forEach((container, index) => {
      context.drawImage(container, 0 + 32 * index, 0, 32, 32);
    });
  }
}

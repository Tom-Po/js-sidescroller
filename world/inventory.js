export default class Inventory {
  constructor(game) {
    this.game = game;
    this.items = [];
    this.height = 330;
    this.width = 332;
    this.x = 0;
    this.y = this.game.height - this.height;
  }

  addItem(item, quantity = 1) {
    const similarItem = this.items.findIndex((i) => i.itemType === item.itemType);
    if (similarItem !== -1) {
      this.items[similarItem].quantity += quantity;
    } else {
      this.items.push({
        ...item,
        quantity,
      });
    }
  }

  draw(context) {
    // context.drawRect
    if (!this.game.showInventory) return;
    context.fillStyle = '#27242e';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.font = '20px arial';
    context.fillStyle = 'white';
    context.fillText(
      'Inventory',
      this.x + 16,
      this.y + 32,
    );
    let row = 0;
    const padding = 16;
    const cellSize = 50;
    const tableSize = 30;

    for (let i = 0; i < tableSize; i++) {
      const col = i % 6;
      if (col === 0) row++;
      context.fillStyle = 'black';
      context.fillRect(
        this.x + padding + col * cellSize,
        this.y + padding + row * cellSize,
        cellSize - 4,
        cellSize - 4,
      );
      if (this.items[i]) {
        context.drawImage(
          this.items[i].image,
          this.x + padding + col * cellSize,
          this.y + padding + row * cellSize - 2,
          this.items[i].spriteWidth * this.items[i].scale,
          this.items[i].spriteHeight * this.items[i].scale,
        );
        context.fillStyle = 'white';
        context.font = '20px monospace bold';
        context.fillText(
          this.items[i].quantity,
          this.x + padding + col * cellSize + 2,
          this.y + padding + row * cellSize + cellSize - 10,
        );
      }
    }
  }
}

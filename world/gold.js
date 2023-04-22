const gold = new Image();
gold.src = '/sprites/item/gold.png';

export default class GoldCount {
  constructor(game) {
    this.game = game;
    this.gold = 0;
  }

  update() {
    this.gold = this.game.player.gold;
  }

  draw(context) {
    context.drawImage(gold, 0, 32, 32, 32);
    context.font = '20px arial';
    context.fillStyle = 'white';
    context.fillText(this.gold, 32, 64);
  }
}

import Sprite from '../sprite';

export default class Item extends Sprite {
  constructor(item, scale, x, y) {
    const img = new Image();
    img.src = item.image;
    super(img, scale, x, y);

    this.value = item.value;
    this.itemType = item.itemType;
    this.inventory = item.inventory;
  }

  consume() {
    console.log(this);
    console.log('has been consummed');
  }
}

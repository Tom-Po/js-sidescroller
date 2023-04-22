import Sprite from './sprite';

export default class Item extends Sprite {
  constructor(image, scale, x, y, value = 1) {
    super(image, scale, x, y);
    this.value = value;
  }
}

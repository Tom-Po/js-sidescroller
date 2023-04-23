import Item from './item/item';

export default class Potion extends Item {
  constructor() {
    super();
    this.itemType = 'potion';
    this.stats = {
      baseHp: 1,
    };
  }

  consume() {
    return this.stats;
  }
}

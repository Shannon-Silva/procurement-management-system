import { Item } from './item';

export class OrderLineItem {

    constructor(
        public item: Item,
        public quantity: number,
        public orderLinePrice: number,
        public received: boolean
      ) {  }

}

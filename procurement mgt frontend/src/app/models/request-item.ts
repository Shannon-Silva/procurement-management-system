import { Item } from './item';

export class RequestItem {

    constructor(
        public item: Item,
        public quantity: number,
        public pocreated: boolean
      ) {  }

}

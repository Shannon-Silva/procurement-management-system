export class Item {

    constructor(
        public itemName: string,
        public price: number,
        public supplier: any,
        public deliveryInformation?,
        public isRestricted?: boolean,
        public category?: string
      ) {  }

}

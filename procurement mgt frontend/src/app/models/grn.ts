import { PurchaseOrder } from './purchase-order';
import { Supplier } from './supplier';
import { GrnItem } from './grn-item';

export class Grn {
    constructor(
        public purchaseOrder: PurchaseOrder,
        public supplier: Supplier,
        public recievedOn: Date,
        public paymentStatus: string,
        public grnItems: GrnItem[],
        public totalPrice: number
      ) {  }
}

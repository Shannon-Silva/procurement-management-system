import { PurchaseRequest } from './purchase-request';
import { OrderLineItem } from './order-line-item';
import { Supplier } from './supplier';

export class PurchaseOrder {

    constructor(

        public purchaseRequest: PurchaseRequest,
        public supplier: Supplier,
        public createdOn: Date,
        public status: string,
        public orderItems: OrderLineItem[],
        public totalPrice: number
      ) {  }
}

import { RequestItem } from './request-item';
import { PurchaseOrder } from './purchase-order';

export class PurchaseRequest {

    constructor(
        public purchaseOrders: PurchaseOrder[],
        public requestStatus: string,
        public requestedBy: string,
        public deliveryAddress: string,
        public createdOn: Date,
        public neededOn: Date,
        public requestLineItems: RequestItem[],
        public isDraftRequest?: boolean,
        public category?: string
      ) {  }

}

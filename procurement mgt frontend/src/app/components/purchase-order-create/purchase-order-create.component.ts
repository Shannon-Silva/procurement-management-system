import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrder } from '../../models/purchase-order';
import { PurchaseRequest } from '../../models/purchase-request';
import { RequestItem } from '../../models/request-item';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';
import { OrderLineItem } from '../../models/order-line-item';

@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent implements OnInit {

  @ViewChild('wizardlg') wizardLarge: ClrWizard;

  display: any;
  key: any;
  modifiedLineItems;
  approvedRequests: any[];
  suppliers: Supplier[] = [];
  confirmedItems: RequestItem[] = [];
  dualSelectionList1: any[] = [];
  lgOpen: boolean;
  selectedRequest: PurchaseRequest;
  selectedSupplier: Supplier = new Supplier(null, null, null, null);
  purchaseRequestModel = new PurchaseRequest(null, null, null, null, null, null, null, null);
  purchaseOrderModel: PurchaseOrder = new PurchaseOrder(null, null, null, null, null, null);

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.getRequests();
    this.display = this.displayLabel;
    this.key = 'item';
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers()
      .subscribe(suppliers => {
        this.suppliers = suppliers;
      });
  }

  getRequests(): void {
    this.orderService.getApprovedPurchaseRequests()
      .subscribe(requests => {
        this.approvedRequests = requests;
      });
  }

  openOrderWizard() {
    this.purchaseRequestModel = JSON.parse(JSON.stringify(this.selectedRequest)) as PurchaseRequest;
    /**
     * Select only the items where PO's were not created
     */
    this.dualSelectionList1 = this.purchaseRequestModel.requestLineItems.filter(item => item.pocreated === false);
    this.lgOpen = true;
  }

  private displayLabel(item: any) {
    return item.item.itemName + ' --- ' + item.quantity;
  }

  doFinish() {

    this.orderService.addOrder(this.purchaseOrderModel).subscribe(
      data => {
        this.toastr.success('Order added');
        this.getRequests();
      },
      err  => this.toastr.error(err)
    );
    this.resetAll();
  }



  generatePurchaseOrder() {

    this.confirmedItems.forEach(item => {
      item.pocreated = true;
    });
    this.purchaseRequestModel.requestLineItems = this.purchaseRequestModel.requestLineItems.map((obj) => {
      return this.confirmedItems.find(o => o.item.itemName === obj.item.itemName) || obj;
    });
    this.purchaseOrderModel.purchaseRequest = this.purchaseRequestModel;
    this.purchaseOrderModel.supplier = this.selectedSupplier;
    this.purchaseOrderModel.orderItems = this.createOrderItems(this.confirmedItems);
    this.purchaseOrderModel.totalPrice = this.calculateTotal(this.purchaseOrderModel.orderItems);

    return this.purchaseOrderModel;

  }

  createOrderItems(requestItems: RequestItem[]) {
    const tempOrderItems: OrderLineItem[] = [];
    requestItems.forEach(reqItem => {
      tempOrderItems.push(
        new OrderLineItem(
          reqItem.item,
          reqItem.quantity,
          reqItem.item.price * reqItem.quantity,
          false
        ));
    });
    return tempOrderItems;
  }

  calculateTotal(orderItems: OrderLineItem[]) {
    let total = 0;
    orderItems.forEach(itm => {
      total += itm.item.price * itm.quantity;
    });
    console.log(total);
    return total;
  }

  createTempOrder() {
    this.purchaseOrderModel = this.generatePurchaseOrder();
  }

  resetAll() {
    this.wizardLarge.reset();
    this.selectedRequest = null;
    this.selectedSupplier = new Supplier(null, null, null, null);
    this.confirmedItems = [];
    this.dualSelectionList1 = [];
  }

}

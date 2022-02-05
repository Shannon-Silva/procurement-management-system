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
  selector: 'app-purchase-order-view',
  templateUrl: './purchase-order-view.component.html',
  styleUrls: ['./purchase-order-view.component.css']
})
export class PurchaseOrderViewComponent implements OnInit {

  purchaseOrders: PurchaseOrder[];

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getPurchaseOrders()
      .subscribe(orders => {
        this.purchaseOrders = orders;
      });
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemServiceProvider } from '../../providers/item-service/item-service';
import { PurchaseRequestPage } from '../purchase-request/purchase-request';
import { ViewPurchaseRequestsPage } from '../view-purchase-requests/view-purchase-requests';
import { ViewOrdersPage } from '../view-orders/view-orders';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public itemService: ItemServiceProvider) {

  }

  ionViewDidEnter() {
  }

  goToPurchaseRequests() {
    this.navCtrl.push(PurchaseRequestPage);
  }

  goToViewPurchaseRequests() {
    this.navCtrl.push(ViewPurchaseRequestsPage);
  }

  goToViewOrders() {
    this.navCtrl.push(ViewOrdersPage);
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

}

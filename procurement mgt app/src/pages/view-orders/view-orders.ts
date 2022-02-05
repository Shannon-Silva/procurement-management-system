import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { OrderServiceProvider } from "../../providers/order-service/order-service";
import { CreateGrnPage } from "../create-grn/create-grn";

/**
 * Generated class for the ViewOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-view-orders",
  templateUrl: "view-orders.html"
})
export class ViewOrdersPage {
  private orders: any;
  private loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderServiceProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ViewOrdersPage");
    // this.orderService.getOrders().then(res => {
    //   console.log(res);
    //   this.orders = res;
    // })
  }

  ionViewDidEnter() {
    this.presentLoadingDefault();
    this.orders = [];
    console.log("ionViewDidLoad ViewOrdersPage");
    this.orderService.getOrders().then(res => {
      this.dismissLoading();
      console.log(res);
      this.orders = res;
    }).catch(err => {
      this.dismissLoading();
    });
  }

  goToAcceptItems(purchaseOrder) {
    this.navCtrl.push(CreateGrnPage, { purchaseOrder: purchaseOrder });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

}

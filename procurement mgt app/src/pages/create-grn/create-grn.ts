import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, ToastController, LoadingController } from "ionic-angular";
import * as moment from "moment";
import { GrnServiceProvider } from "../../providers/grn-service/grn-service";

/**
 * Generated class for the CreateGrnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-create-grn",
  templateUrl: "create-grn.html"
})
export class CreateGrnPage {
  private purchaseOrder: any;
  private deliveredItems: any[] = [];
  private purchaseOrderItems: any[] = [];
  // private purchaseOrderItems: {item: string, orderLinePrice: string, quantity: string, received: boolean, ordered: boolean}[] = [];
  private total: number = 0;
  private loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private GrnService: GrnServiceProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.purchaseOrder = this.navParams.get("purchaseOrder");
    this.purchaseOrderItems = this.processItems(this.purchaseOrder.orderItems);
  }

  ionViewDidLoad() {
    console.log(this.purchaseOrder);
    console.log(this.purchaseOrderItems);
  }

  processItems(items: any[]) {
    items.forEach(elem => {
      if (!elem.received) {
        elem.checked = false;
      }
    });
    return items;
  }

  createGRN() {
    this.deliveredItems = [];

    let checked: boolean = false;

    this.purchaseOrder.orderItems.forEach(item => {
      if (item.checked) {
        checked = true;
        const checkedItem = {
          item: item.item,
          quantity: item.quantity
        };
        this.deliveredItems.push(checkedItem);
        this.total = this.total + item.orderLinePrice;
      }
    });

    if (checked) {
      this.purchaseOrderItems.forEach(elem => {
        if (elem.checked) {
          elem.received = true;
        }
        delete elem.checked;
      });
      const orderItems = this.purchaseOrderItems;
      this.purchaseOrder.orderItems = orderItems;

      const GRN = {
        purchaseOrder: this.purchaseOrder,
        supplier: this.purchaseOrder.supplier,
        recievedOn: moment().format("YYYY-MM-DD"),
        orderItems: this.deliveredItems,
        totalPrice: this.total
      };

      this.presentLoadingDefault();
      this.GrnService.postGRN(GRN).then(res => {
        this.dismissLoading();
        console.log(res);
        this.presentToast('GRN Created Successfully');
      }).catch(err => {
        this.dismissLoading();
        console.log(err);
        this.presentToast(err);
        this.processItems(this.purchaseOrderItems);
      });

      console.log(GRN);
    } else {
      this.presentAlert();
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Can not create GRN without selecting at least one item',
      buttons: ['Okay']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
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

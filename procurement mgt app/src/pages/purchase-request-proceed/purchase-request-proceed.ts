import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import * as moment from "moment";
import { PurchaseRequestServiceProvider } from "../../providers/purchase-request-service/purchase-request-service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HomePage } from "../home/home";

/**
 * Generated class for the PurchaseRequestProceedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-purchase-request-proceed",
  templateUrl: "purchase-request-proceed.html"
})
export class PurchaseRequestProceedPage {
  items: Array<{}> = [];
  private purchaseRequest: FormGroup;
  private loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private purchaseRequestService: PurchaseRequestServiceProvider,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    // this.formatRequestItems(this.navParams.get("items"));
    this.items = this.navParams.get("items");

    this.purchaseRequest = this.formBuilder.group({
      requestLineItems: [''],
      requestStatus: "PENDING",
      requestedBy: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      neededOn: ['', Validators.required],
      createdOn: [''],
      isDraftRequest: ['']
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PurchaseRequestProceedPage");
  }

  requestPurchase() {
    this.presentLoadingDefault();

    // this.purchaseRequest = {
    //   requestLineItems: this.items,
    //   requestStatus: "PENDING",
    //   requestedBy: this.requestedBy,
    //   deliveryAddress: this.deliveryAddress,
    //   createdOn: moment().format("YYYY-MM-DD"),
    //   neededOn: this.neededOn,
    //   isDraftRequest: false
    // };
    
    // console.log(JSON.parse(this.purchaseRequest));

    let request = this.purchaseRequest.value;
    request.requestLineItems = this.items;
    request.createdOn = moment().format("YYYY-MM-DD"),
    request.isDraftRequest = false;

    console.log(request);

    this.purchaseRequestService.postRequest(request).then(res => {
      this.dismissLoading();
      this.presentToast('Request Submited Successfully');
      this.navCtrl.setRoot(HomePage);
      console.log(res);
    }).catch(err => {
      this.dismissLoading();
      console.log(err);
    })
  }

  formatRequestItems(requestItems) {
    requestItems.forEach(element => {
      console.log('format', element);
      this.items.push({item: element.item._id, quantity: element.quantity, POCreated: false});
    });
  }

  getPurchaseRequests() {
    this.purchaseRequestService.getRequests().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
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

}

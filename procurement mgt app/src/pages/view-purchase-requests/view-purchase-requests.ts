  import { Component } from "@angular/core";
  import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController
  } from "ionic-angular";
  import { PurchaseRequestServiceProvider } from "../../providers/purchase-request-service/purchase-request-service";
  import { ViewRequestDetailsPage } from "../view-request-details/view-request-details";

  /**
   * Generated class for the ViewPurchaseRequestsPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */
  @Component({
    selector: "page-view-purchase-requests",
    templateUrl: "view-purchase-requests.html"
  })
  export class ViewPurchaseRequestsPage {
    requests: any[];
    private loading;

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private purchaseRequestService: PurchaseRequestServiceProvider,
      private loadingCtrl: LoadingController
    ) {
      this.presentLoadingDefault();
      this.purchaseRequestService
        .getRequests()
        .then(res => {
          this.dismissLoading();
          console.log(res);
          this.requests = res;
          this.requests.sort();
        })
        .catch(err => {
          this.dismissLoading();
          console.log(err);
        });
    }

    ionViewDidEnter() {}

    ionViewDidLoad() {
      console.log("ionViewDidLoad ViewPurchaseRequestsPage");
    }

    viewRequestDetails(request) {
      this.navCtrl.push(ViewRequestDetailsPage, { request: request });
      console.log(request);
    }

    presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: "Please wait..."
      });

      this.loading.present();
    }

    dismissLoading() {
      this.loading.dismiss();
    }
  }

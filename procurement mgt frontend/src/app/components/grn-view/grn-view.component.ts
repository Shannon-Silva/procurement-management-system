import { Component, OnInit } from "@angular/core";
import { Grn } from "../../models/grn";
import { GrnService } from "../../services/grn.service";

declare let paypal: any;
@Component({
  selector: 'app-grn-view',
  templateUrl: './grn-view.component.html',
  styleUrls: ['./grn-view.component.css']
})
export class GrnViewComponent implements OnInit {
  goodsReceivedNotes: Grn[];
  selectedGrn: Grn;
  model = new Grn(null, null, null, null, null, null);
  modalOpened;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;
  totalPrice;

  constructor(private grnService: GrnService) {}

  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox:
        "AffkB-NAiPqW9vcjqkxp_jnOfoWHQRiSVYIJzyn88-WIOJvlghk5Ocg1YOv81HffiHFpeo9bymj1qyI_",
      production: "<your-production-key here>"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.selectedGrn.totalPrice, currency: "USD" } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        console.log('payment success');
        
        this.selectedGrn.paymentStatus='PAYMENT_COMPLETED';
        console.log(this.selectedGrn);
        this.grnService.approvePayments(this.selectedGrn);
        
        //this.getOrders();
        //this.selectedGrn.paymentStatus=true;
      });
    }
  };
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-checkout-btn");
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.grnService.getGoodsReceivedNotes().subscribe(grns => {
      this.goodsReceivedNotes = grns;
    });
  }

  // makePayment() {
  //   console.log('payment for ' + JSON.stringify(this.selectedGrn));
  //   this.model = JSON.parse(JSON.stringify(this.selectedGrn)) as Grn
  //   this.finalAmount = this.selectedGrn.totalPrice;
  //   console.log(this.finalAmount);

  // }
}

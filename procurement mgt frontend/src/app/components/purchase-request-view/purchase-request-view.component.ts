import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from '../../services/purchase-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-request-view',
  templateUrl: './purchase-request-view.component.html',
  styleUrls: ['./purchase-request-view.component.css']
})
export class PurchaseRequestViewComponent implements OnInit {
  requests: any[];
  selected: string[] = [];

  constructor(private toastr: ToastrService, private purchaseRequestService: PurchaseRequestService) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.purchaseRequestService.getPurchaseRequests()
      .subscribe(requests => {
        this.requests = requests;
        console.log('this.requests' + JSON.stringify(this.requests));
      });
  }

  onDelete() {
    console.log('delete requests : ' + JSON.stringify(this.selected));
    // this.purchaseRequestService.deleteRequests(JSON.parse(JSON.stringify(this.selected)))
    //   .subscribe(
    //     any => {
    //       console.log('deleted items' + this.selected);
    //       this.toastr.success('deleted items');
    //       this.getRequests();
    //     },
    //     err => this.toastr.error(err)
    //   );
  }

  onApprove() {
    let approvedRequests: any[] = [];
    console.log('onApprove');
    // console.log(JSON.stringify(this.selected));
    this.selected.forEach(elem => {
      let request = JSON.parse(JSON.stringify(elem));
      request.requestStatus = 'APPROVED';
      console.log(request);
      approvedRequests.push(request);
    });

    this.purchaseRequestService.approvePurchaseRequest(approvedRequests).subscribe(response => {
      console.log(response);
      this.getRequests();
    });

  }

}

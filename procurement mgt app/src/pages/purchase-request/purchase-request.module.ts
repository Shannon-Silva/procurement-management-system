import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseRequestPage } from './purchase-request';

@NgModule({
  declarations: [
    PurchaseRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseRequestPage),
  ],
})
export class PurchaseRequestPageModule {}

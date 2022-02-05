import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewRequestDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-request-details',
  templateUrl: 'view-request-details.html',
})
export class ViewRequestDetailsPage {
  private request: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.request = this.navParams.get('request');
    console.log(this.request);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestDetailsPage');
  }

}

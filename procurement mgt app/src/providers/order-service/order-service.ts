import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ordersEndPoint } from '../../shared/config'
import { Properties } from '../../shared/properties';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderServiceProvider {
  private ordersURL = ordersEndPoint;

  constructor(public http: HttpClient, private properties: Properties) {
    console.log('Hello OrderServiceProvider Provider');
  }

  getOrders(): Promise<any> {
    console.log(this.properties.token);
    return new Promise((resolve, reject) => {
      this.http.get(this.ordersURL, {
        observe: 'response',
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'Application/json',
          'Authorization': this.properties.token
        })
      })
        .subscribe(
          response => {
            console.log(response);
            resolve(response.body);
          },
          error => {
            console.log(error);
            reject(error);
          }
        )
    })
  }

}

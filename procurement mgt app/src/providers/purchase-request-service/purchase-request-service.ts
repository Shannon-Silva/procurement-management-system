import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestsEndPoint } from '../../shared/config';
import { Properties } from '../../shared/properties';

/*
  Generated class for the PurchaseRequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PurchaseRequestServiceProvider {

  constructor(public http: HttpClient, private properties: Properties) {
    console.log('Hello PurchaseRequestServiceProvider Provider');
  }

  getRequests(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(requestsEndPoint, {
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

  postRequest(payload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(requestsEndPoint, payload, {
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
            resolve(response);
          },
          error => {
            console.log(error);
            reject(false);
          }
        )
    })
  }

}

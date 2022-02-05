import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GrnEndPoint } from '../../shared/config';
import { Properties } from '../../shared/properties';

/*
  Generated class for the GrnServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GrnServiceProvider {
  private GrnURL = GrnEndPoint;

  constructor(public http: HttpClient, private properties: Properties) {
    console.log('Hello GrnServiceProvider Provider');
  }

  postGRN(payload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.GrnURL, payload, {
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
            reject(error);
          }
        )
    })
  }

}

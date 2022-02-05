import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { itemsEndPoint } from '../../shared/config';
import { Properties } from '../../shared/properties';

/*
  Generated class for the ItemServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemServiceProvider {
  private itemUrl = itemsEndPoint;

  constructor(public http: HttpClient, public properties: Properties) {
    console.log('Hello ItemServiceProvider Provider');
  }

  getItems(): Promise<any> {
    console.log(this.properties.token);
    return new Promise((resolve, reject) => {
      this.http.get(this.itemUrl, {
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

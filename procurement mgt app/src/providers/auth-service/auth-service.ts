import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { validateUserEndPoint } from '../../shared/config';
import { StorageServiceProvider } from '../storage-service/storage-service';

import { Properties } from '../../shared/properties';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    public http: HttpClient,
    public storageSerive: StorageServiceProvider,
    public properties: Properties,
    public storageService: StorageServiceProvider
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  validateUser(payload): Promise<any> {
    const username = JSON.parse(JSON.stringify(payload)).username;
    console.log('AuthSerivce - Payload', payload);
    return new Promise((resolve, reject) => {
      this.http.post(validateUserEndPoint, payload, {
        observe: 'response',
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'Application/json'
        })
      })
        .subscribe(
          response => {
            const responseBody = JSON.stringify(response.body);
            this.properties.token = JSON.parse(responseBody).Authorization;
            console.log(this.properties.token);

            this.storageSerive.saveUser(username, this.properties.token);

            resolve(true);
          },
          error => {
            console.log(error);
            reject(false);
          }
        )
    })
  }

  loadOfflineUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storageSerive.getLocalUser().then(token => {
        this.properties.token = token;
        resolve(true);
      }).catch(err => {
        console.log(err);
        reject(false);
      })
    })
  }

}

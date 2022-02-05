import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as localforage from 'localforage';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  public user = localforage.createInstance({
    name: 'user',
    storeName: 'user'
  })

  constructor() {}

  saveUser(user: string, token: any) {
    this.user.setItem(user, token);
  }

  getLocalUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.length().then(noOfkeys => {
        if (noOfkeys === 0) {
          reject('No local saved tokens available');
        } else {
          const username = this.user.key(0);
          this.user.key(0).then(username => {
            return username;
          }).then(username => {
            this.user.getItem(username).then(token => {
              resolve(token);
            }).catch(error => {
              reject(error);
            })
          }).catch(error => {
            reject(error);
          })
        }
      })
    });
  }

}

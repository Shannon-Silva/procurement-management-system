import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';
import { Item } from '../models/item';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = environment.itemEndpoint;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions = {};

  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService) {
    console.log('Inside item service');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', authService.JWTtoken);
    this.httpOptions = { headers: this.headers };
  }

  /**
   *  GET: Get a list of items from the server. Returns the list of items upon success.
   */
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.itemUrl, this.httpOptions)
      .pipe(
        tap(items => console.log(JSON.stringify(items))),
        catchError(this.handleError('getItems', [], 'Could not get items from server'))
      );
  }


  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemUrl, item, this.httpOptions).pipe(
      tap((resultItem: any) => console.log(`added item w/ id=${resultItem._id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemUrl, item, this.httpOptions)
      .pipe(
        catchError(this.handleError<Item>('updateItem'))
      );
  }

  deleteItems(items: Item[]): Observable<any> {
    return this.http.request('delete', this.itemUrl, { headers: this.headers, body: items }).pipe(
      tap((resultItem: any) => console.log('deleted items')),
      catchError(this.handleError<Item>('deleteItems'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T, message?: string) {
    return (error: any): Observable<T> => {

      console.error('error ' + JSON.stringify(error)); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (result) {
        this.toastr.error(`Internal error: ${message}`);
        return of(result as T);
      } else {
        return throwError(`${operation} failed`);
      }
    };
  }

}

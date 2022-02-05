import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';
import { Item } from '../models/item';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { PurchaseRequest } from '../models/purchase-request';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  private purchaseRequestURL = environment.purchaseRequestEndpoint;
  private approvePurchaseRequestsURL =
    environment.approvePurchaseRequestsEndpoint;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions = {};

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    console.log('Inside request service');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', authService.JWTtoken);
    this.httpOptions = { headers: this.headers };
  }

  /**
   *  GET: Get a list of items from the server. Returns the list of items upon success.
   */
  getPurchaseRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.purchaseRequestURL, this.httpOptions).pipe(
      tap(requests => console.log(JSON.stringify(requests))),
      catchError(
        this.handleError(
          'getPurchaseRequests',
          [],
          'Could not get purchase requests from server'
        )
      )
    );
  }

  deleteRequests(requests: Item[]): Observable<any> {
    return this.http
      .request('delete', this.purchaseRequestURL, {
        headers: this.headers,
        body: requests
      })
      .pipe(
        tap((resultItem: any) => console.log('deleted items')),
        catchError(this.handleError<Item>('deleteItems'))
      );
  }

  approvePurchaseRequest(requests: PurchaseRequest[]): Observable<any> {
    return this.http
      .put<PurchaseRequest>(this.approvePurchaseRequestsURL, requests, this.httpOptions)
      .pipe(
        catchError(this.handleError<PurchaseRequest>('approveRequests'))
      );
  }

  private handleError<T>(
    operation = 'operation',
    result?: T,
    message?: string
  ) {
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

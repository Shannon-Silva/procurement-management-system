import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PurchaseOrder } from '../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private purchaseRequestURL = environment.purchaseRequestEndpoint;
  private purchaseOrderURL = environment.purchaseOrderEndpoint;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions = {};

  /**
   * @param authService is used to access the JWT token provided by the backend server during login.
   * The token is used to authorize all requests to the backend
   */
  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService) {
    console.log('Inside request service');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', authService.JWTtoken);
    this.httpOptions = { headers: this.headers };
  }

  /**
   *  GET: Get a list of approved purchase requests from the server. Returns the list of items upon success.
   */
  getApprovedPurchaseRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.purchaseRequestURL + '/approved', this.httpOptions)
      .pipe(
        tap(approvedRequests => console.log(JSON.stringify(approvedRequests))),
        catchError(this.handleError('getApprovedPurchaseRequests', [], 'Could not get approved requests from server'))
      );
  }

  /**
   *  GET: Get a list of purchase orders from the server. Returns the list of orders upon success.
   */
  getPurchaseOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.purchaseOrderURL, this.httpOptions)
      .pipe(
        tap(approvedRequests => console.log(JSON.stringify(approvedRequests))),
        catchError(this.handleError('getPurchaseOrders', [], 'Could not get orders from server'))
      );
  }

  /**
   * POST: post purchase order to server
   * @param order The order to be saved
   */
  addOrder(order: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.purchaseOrderURL, order, this.httpOptions).pipe(
      tap((resultItem: any) => console.log(`added order w/ id=${resultItem._id}`)),
      catchError(this.handleError<PurchaseOrder>('addOrder'))
    );
  }

  /**
   * Http error handling method
   * @param operation Name of the operation
   * @param result result to be passed in response(optional)
   * @param message message to be shown on error(optional) only works if result is passed
   */
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


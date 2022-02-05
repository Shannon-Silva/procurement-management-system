import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Grn } from '../models/grn';

@Injectable({
  providedIn: 'root'
})
export class GrnService {

  private grnURL = environment.grnEndpoint;
  private payGrnURL = environment.payGrnEndpoint;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions = {};

  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService) {
    console.log('Inside grn service');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', authService.JWTtoken);
    this.httpOptions = { headers: this.headers };
  }

  getGoodsReceivedNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.grnURL, this.httpOptions)
      .pipe(
        tap(grns => console.log(JSON.stringify(grns))),
        catchError(this.handleError('getGoodsReceivedNotes', [], 'Could not get grns from server'))
      );
  }

  approvePayments(grn: Grn): Observable<any> {
    return this.http.put<any>(this.payGrnURL, grn, this.httpOptions)
      .pipe(
        catchError(this.handleError('payGRN', [], 'server error'))
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';
import { ApplicationUser } from '../models/ApplicationUser';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usn=this.authService.usernameX;
  private listUrl = environment.listUrl;
  private updateUrl = environment.updateUrl + this.usn;
  private detailsUrl = environment.detailsUrl + this.usn;
  private deleteUrl = environment.deleteUrl;
  private registerUrl = environment.registerUrl;
  private forgotUrl = environment.forgotUrl + this.usn;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions = {};

  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService) {
    console.log('Inside user service');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', authService.JWTtoken);
    this.httpOptions = { headers: this.headers };
  }

  /**
   *  GET: Get a list of users from the server. Returns the list of users upon success.
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.listUrl, this.httpOptions)
      .pipe(
        tap(users => console.log(JSON.stringify(users))),
        catchError(this.handleError('getUsers', [], 'Could not get users from server'))
      );
  }

  getDetails(): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(this.detailsUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<ApplicationUser>('getDetails'))
      );
  }

  // getemp(user: ApplicationUser): Observable<ApplicationUser> {
  //   return this.http.get<ApplicationUser>(this.listUrl, this.httpOptions)
  //     .pipe(
  //       tap(users => console.log(JSON.stringify(users))),
  //       catchError(this.handleError(<ApplicationUser>, 'Could not get users from server'))
  //     );
  // }

  updateUser(user: ApplicationUser): Observable<ApplicationUser> {
    console.log(this.updateUrl);
    return this.http.patch<ApplicationUser>(this.updateUrl , user, this.httpOptions)
      .pipe(
        tap((resultuser: any)=> console.log(resultuser)),
        catchError(this.handleError<ApplicationUser>('updateUser'))
      );
  }

  deleteUser(users: ApplicationUser[]): Observable<any> {
    return this.http.request('delete', this.deleteUrl, { headers: this.headers, body: users }).pipe(
      tap((resultusers: any) => console.log(resultusers)),
      catchError(this.handleError<ApplicationUser>('deleteUsers'))
    );
  }

 
  registerUser(user: ApplicationUser) {
    return this.http.post(this.registerUrl, user, this.httpOptions);
  }

  forgotPassword(user: ApplicationUser){
    return this.http.patch(this.forgotUrl, user, this.httpOptions);
  }
 

  private handleError<T>(operation = 'operation', result?: T, message?: string) {
    return (error: any): Observable<T> => {

      console.error('error ' + JSON.stringify(error)); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (result) {
        if (error.status === 403) {
          this.toastr.info(`${operation} failed: Sorry, You do not have access permission`);
        }
        return of(result as T);
      } else {
        return throwError(`${operation} failed`);
      }
    };
  }

}

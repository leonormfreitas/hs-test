import { Injectable } from '@angular/core';
import { CpuUsageData } from '../utils';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'/* ,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With" */
    })
  };


  /** POST: add a new CPU Measure to the database */
  addCPUMeasure(data: CpuUsageData)/* : Observable<CpuUsageData> */ {
    console.log("POST DATA", data);
    return this.http.post/* <CpuUsageData> */('http://localhost:4000/clientCPU/new', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(measr => console.log(measr));
  }
}

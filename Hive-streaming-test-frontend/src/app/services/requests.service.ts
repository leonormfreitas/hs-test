import { Injectable } from '@angular/core';
import { CpuUsageData } from '../utils';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';

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


  /** POST: add a new CPU Measure to the database */
  addCPUMeasure(data: CpuUsageData): Observable<CpuUsageData> {
    return this.http.post<CpuUsageData>('hhttp://localhost:4000/clientCPU/new', data)
      .pipe(
        catchError(this.handleError)
      );
  }
}

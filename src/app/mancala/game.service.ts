import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiURL = "http://localhost:8080/mancala";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(firstPlayer:string, secondPlayer:string): Observable<any> {
    return this.httpClient.post(this.apiURL + '/create?firstPlayerName=' + firstPlayer +
      '&secondPlayerName=' + secondPlayer, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getGameById(gameId:string): Observable<any> {
    return this.httpClient.get(this.apiURL + '/' + gameId, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  sow(gameId:string, pitIndex:number): Observable<any> {
    return this.httpClient.post(this.apiURL + '/' + gameId + "/pits/" + pitIndex, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}

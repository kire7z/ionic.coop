import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable  } from 'Rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { MessageProvider } from '../message/message';
import { Transactions } from './transactions';
import { AlertsProvider } from '../alerts/alerts';


/*const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Origin' , '*');
headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
headers.append('Accept','application/json');
headers.append('content-type','application/json');*/
const httpOptions = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};

@Injectable()
export class BackendProvider {

  constructor(private http: HttpClient,private msg: MessageProvider,private alerts:AlertsProvider) {
    console.log('Hello BackendProvider Provider');
  }
  trxs:any=Transactions;
  /*Metodo publicos*/
  TrxLogin(dato:object,funcion:Function)
  {
    let consultar=this.postHttp(this.trxs.apiBankless,'login',dato);
    consultar.subscribe(data=>{
      funcion(data);
    });
  }
  /*Metodos Generales*/
  getHttp(api:string,method:string,query:string,hoptions:object=null):Observable<object>{
    const url = `${api}/${method}${query}`;
    if(!hoptions)
      hoptions=httpOptions;
    return this.http.get<object>(url,hoptions).pipe(
      tap(_ => this.log(`getHttp uri=${url}`)),
      catchError(this.handleError<object>(`getHttp uri=${url}`)));
  }
  postHttp(api:string,method:string,json:object,hoptions:object=null):Observable<object>{
    let midata:string=null;
    if(json)
      midata=JSON.stringify(json);
    const url = `${api}/${method}`;
    if(!hoptions)
      hoptions=httpOptions;
    const body = new HttpParams().set('json', midata);
    //console.log(body.toString());
    return this.http.post<object>(url,body.toString(),hoptions).pipe(
        tap(_ => this.log(`postHttp uri=${url}`)),
        catchError(this.handleError<object>(`postHttp uri=${url}`)));
  }

  /*mensajes de error*/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error.error); // log to console instead
      this.alerts.presentarAlerta("Error Conexión",error.message,"error");

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.msg.add('HeroService: ' + message);
  }
}

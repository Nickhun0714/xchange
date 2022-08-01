import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  // private REST_API_GETCRYPTOSYMBOLS = "https://api.binance.com/api/v1/exchangeInfo";
  private REST_API_SERVER = "https://api.exchangerate.host/latest";
  private REST_API_FROM_TO_AMOUNT = "https://api.exchangerate.host/" //convert?from=USD&to=EUR&amount=1"
  constructor(private httpClient: HttpClient) { }

  // public getStock(){
  //   return this.httpClient.get(this.REST_API_GETCRYPTOSYMBOLS);
  // }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public sendGetChange(from:string, to:string, amount:any){

    return this.httpClient.get(this.REST_API_FROM_TO_AMOUNT+"convert?from="+from+"&to="+to+"&amount="+amount);
  }
}
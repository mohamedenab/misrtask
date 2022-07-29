import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConverterPanelService {
  formValues = {from: '', to: '', amount: ''}

  constructor(private http: HttpClient) {
  }

  getSymbols() {
    return this.http.get(`${environment.url}/symbols`,);
  }

  convertCurrency(to: string, from: string, amount: string) {
    return this.http.get(`${environment.url}/convert?to=${to}&from=${from}&amount=${amount}`)
  }
}

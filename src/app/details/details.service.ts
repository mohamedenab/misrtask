import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) {
  }

  getTimeSeries(year: string, base: string, symbols: string) {
    return this.http.get(`${environment.url}/timeseries?start_date=${year}-01-01&end_date=${year}-12-31&base=${base}&symbols=${symbols}`,);

  }
}

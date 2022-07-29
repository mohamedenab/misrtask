import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  symbols = {}
  amount = 0
  base = ''

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getRates('EUR')
  }

  getRates(base: string) {
    console.log(base);
    this.base = base
    // this.homeService.getRates(base).subscribe((res: any) => {
    //   this.symbols = res.rates
      this.symbols = {
        "AED": 3.746625,
        "EGP": 19.295374,
        "TRY": 18.274944,
        "SAR": 3.830915,
        "QAR": 3.713937,
        "JPY": 136.017848,
        "USD": 1.020018,
        "TND": 3.197244,
        "SGD": 1.410068
      }
    // })
  }
}

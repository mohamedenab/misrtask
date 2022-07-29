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
    this.base = base
    this.homeService.getRates(base).subscribe((res: any) => {
      this.symbols = res.rates
    })
  }
}

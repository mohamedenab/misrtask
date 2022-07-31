import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";
import {HomeRoutingModule} from "./home-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: HomeService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, ConverterPanelModule, RouterTestingModule, BrowserAnimationsModule, HomeRoutingModule]
    })
      .compileComponents();
    http = TestBed.get(HttpClient);

    homeService = new HomeService(http)
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component = new HomeComponent(homeService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getRates called', fakeAsync (() => {
    const simpleData= {
      "base": "EUR",
      "date": "2022-07-31",
      "rates": {
        "AED": 3.755921,
        "EGP": 19.336884,
        "JPY": 136.249279,
        "QAR": 3.723132,
        "SAR": 3.840807,
        "SGD": 1.41178,
        "TND": 3.205177,
        "TRY": 18.318724,
        "USD": 1.022547
      },
      "success": true,
      "timestamp": 1659271444
    }
    spyOn(component, 'getRates');
    component.getRates('EUR')
    fixture.detectChanges();
    homeService.getRates('EUR').subscribe((res:any)=>{
      expect(Object.keys(component.symbols)).toBeGreaterThan(0);
    })
    flush();
    tick();
    expect(component.getRates).toHaveBeenCalled();

  }));
});

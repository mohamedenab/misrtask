import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {DetailsComponent} from './details.component';
import {ActivatedRoute} from "@angular/router";
import {CommonModule, DatePipe} from "@angular/common";
import {DetailsService} from "./details.service";
import {ConverterPanelService} from "../converter-panel/converter-panel.service";
import {DetailsRoutingModule} from "./details-routing.module";
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";
import {NgxEchartsModule} from "ngx-echarts";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient} from "@angular/common/http";

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let route: ActivatedRoute;
  let datePipe: DatePipe;
  let detailsService: DetailsService;
  let converterPanelService: ConverterPanelService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        CommonModule,
        DetailsRoutingModule, HttpClientTestingModule,
        RouterTestingModule, BrowserAnimationsModule,
        ConverterPanelModule, NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        })], providers: [DatePipe]
    })
      .compileComponents();
    http = TestBed.get(HttpClient);

    detailsService = new DetailsService(http)

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component = new DetailsComponent(route, datePipe, detailsService, converterPanelService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getSeries called', fakeAsync(() => {
    const simpleData = [
      1.212341,
      1.208897,
      1.172656,
      1.20195,
      1.22335,
      1.18554,
      1.1867,
      1.180951,
      1.157414,
      1.155809,
      1.133138,
      1.137145
    ]
    spyOn(component, 'getSeries');
    expect(component.loaded).toBeFalse()
    component.getSeries('EUR', 'USD', 'EURO');
    fixture.detectChanges();
    detailsService.getTimeSeries((new Date().getFullYear() - 1).toString(), 'EUR', 'USD').subscribe((res) => {
      expect(component.options.series[0].data).toEqual(simpleData)
      expect(component.loaded).toBeTrue()
    })
    fixture.detectChanges();
    expect(component.getSeries).toHaveBeenCalled();

  }));
});

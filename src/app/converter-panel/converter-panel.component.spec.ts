import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {ConverterPanelComponent} from './converter-panel.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ConverterPanelService} from "./converter-panel.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

describe('ConverterPanelComponent', () => {
  let component: ConverterPanelComponent;
  let fixture: ComponentFixture<ConverterPanelComponent>;
  let converterPanelService: ConverterPanelService;
  let http: HttpClient;
  let fb: FormBuilder;
  let router: Router;
   let convertForm ;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverterPanelComponent], imports: [HttpClientTestingModule,
        RouterTestingModule, BrowserAnimationsModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, MatSelectModule,
      ], providers: [ConverterPanelService,]
    })
      .compileComponents();
    fb = new FormBuilder()
    http = TestBed.get(HttpClient);
    convertForm = fb.group({
      amount: '',
      fromLabel: 'EUR',
      toLabel: 'USD',
    })
    converterPanelService = new ConverterPanelService(http)
    fixture = TestBed.createComponent(ConverterPanelComponent);
    component = fixture.componentInstance;
    component = new ConverterPanelComponent(converterPanelService, fb,router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getRateFactor called', fakeAsync(() => {
    spyOn(component, 'getRateFactor');
    component.getRateFactor('EUR','USD','1')
    fixture.detectChanges();
    converterPanelService.convertCurrency('EUR','USD','1').subscribe((res)=>{
      expect(component.rateFactor).toEqual(1.022547)
    })
    fixture.detectChanges();
    expect(component.getRateFactor).toHaveBeenCalled();
  }))
  it('should swap called', fakeAsync(() => {
    spyOn(component, 'swap');
    component.swap()
    fixture.detectChanges();
    expect(component.swap).toHaveBeenCalled();
  }))
  it('should getResult called', fakeAsync(() => {
    spyOn(component, 'getResult');
    component.getResult(null)
    fixture.detectChanges();
    expect(component.getResult).toHaveBeenCalled();
  }))

});

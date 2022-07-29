import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {DetailsRoutingModule} from './details-routing.module';
import {DetailsComponent} from './details.component';
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";
import {NgxEchartsModule} from "ngx-echarts";


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ConverterPanelModule, NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ], providers: [DatePipe]
})
export class DetailsModule {
}

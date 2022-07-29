import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ConverterPanelModule
  ]
})
export class DetailsModule { }

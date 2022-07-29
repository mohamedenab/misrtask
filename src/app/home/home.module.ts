import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";
import {HomeService} from "./home.service";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, ConverterPanelModule,
    HomeRoutingModule
  ], providers: [HomeService]
})
export class HomeModule {
}

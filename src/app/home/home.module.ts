import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ConverterPanelModule} from "../converter-panel/converter-panel.module";
import {HomeService} from "./home.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, ConverterPanelModule, HttpClientModule,
    HomeRoutingModule
  ], providers: [HomeService]
})
export class HomeModule {
}

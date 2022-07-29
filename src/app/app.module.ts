import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpsInterceptor} from "./http.interceptor";
import {NavbarComponent} from './navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

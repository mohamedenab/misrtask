import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConverterPanelComponent} from "./converter-panel.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ConverterPanelService} from "./converter-panel.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ConverterPanelComponent,], exports: [ConverterPanelComponent,],
  imports: [RouterModule,
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  ], providers: [ConverterPanelService,]
})
export class ConverterPanelModule {
}

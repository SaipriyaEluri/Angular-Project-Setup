import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonScreenRoutingModule } from './common-screen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoDataComponent } from './NoData/no-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CommonScreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class CommonScreenModule { }

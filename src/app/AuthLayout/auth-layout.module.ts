import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { SignInComponent } from './SignIn/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ]
})
export class AuthLayoutModule { }

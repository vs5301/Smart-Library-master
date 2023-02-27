import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { RegisterComponent } from 'app/signUp/register/register.component';
import { LoginComponent } from 'app/signUp/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }

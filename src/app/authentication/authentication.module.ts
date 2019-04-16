import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuardService} from './authentication-guard.service';
import {ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [LoginComponent, SignupComponent],
  providers: [
    AuthenticationGuardService
  ]
})
export class AuthenticationModule {}

import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuardService} from './authentication-guard.service';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [LoginComponent],
  providers: [
    AuthenticationGuardService
  ]
})
export class AuthenticationModule {}

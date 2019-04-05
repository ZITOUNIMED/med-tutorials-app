import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {DocumentRoutingModule} from './document/document.routing.module';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuardService} from "./authentication/authentication-guard.service";
import {AccountComponent} from "./account/account/account.component";

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuardService],
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    outlet: 'home'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    DocumentRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppModuleRouting {
}

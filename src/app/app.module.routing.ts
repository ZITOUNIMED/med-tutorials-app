import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DocumentRoutingModule} from './document/document.routing.module';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/document',
    pathMatch: 'full'
  }
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

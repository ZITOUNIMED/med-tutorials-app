import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account/account.component';
import {HomeComponent} from './home/home.component';
import {DocumentComponent} from './document/document.component';
import {DocumentResolverService} from './document/shared/service/document-resolver.service';
import {DocumentSheetComponent} from './document/document-sheet/document-sheet.component';
import {AuthenticationGuardService} from './authentication/authentication-guard.service';

const appRoutes: Routes = [
  { path: 'authentication', loadChildren: './authentication/authentication.routed.module#AuthenticationRoutedModule'},
  {
    path: 'home',
    canActivate: [AuthenticationGuardService],
    component: HomeComponent,
    children: [
      { path: 'account', component: AccountComponent, outlet: 'homeOutlet'},
      { path: 'document', component: DocumentComponent, outlet: 'homeOutlet'},
      { path: '', component: DocumentComponent, outlet: 'homeOutlet'},
      {
        path: 'document/:id',
        outlet: 'homeOutlet',
        component: DocumentSheetComponent,
        resolve: {
          document: DocumentResolverService
        }
      },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppModuleRouting {
}

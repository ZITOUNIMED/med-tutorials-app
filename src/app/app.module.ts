import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { GenerecDialogComponent } from './generec-dialog/generec-dialog.component';
import { CreateUpdateDocumentModalComponent } from './document/shared/modal/create-update-document-modal/create-update-document-modal.component';
import {AppModuleRouting} from './app.module.routing';
import {StoreModule} from '@ngrx/store';
import {AuthenticationModule} from './authentication/authentication.module';
import {AppMenuModule} from './menu/app.menu.module';
import {DocumentModule} from './document/document.module';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {appReducer} from './shared/app.reducer';
import {XhrInterceptor} from "./authentication/xhr.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    GenerecDialogComponent,
    CreateUpdateDocumentModalComponent,
    HomeComponent,
    AccountComponent,
  ],
  entryComponents: [
    GenerecDialogComponent,
    CreateUpdateDocumentModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    AppModuleRouting,
    StoreModule.forRoot(appReducer),
    AuthenticationModule,
    AppMenuModule,
    DocumentModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

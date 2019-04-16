import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { GenerecDialogComponent } from './generec-dialog/generec-dialog.component';
import { CreateUpdateDocumentModalComponent } from './document/shared/modal/create-update-document-modal/create-update-document-modal.component';
import {AppModuleRouting} from './app.module.routing';
import {StoreModule} from '@ngrx/store';
import {loadingReducer} from './shared/loading.reducer';
import {AuthenticationModule} from './authentication/authentication.module';
import {AppMenuModule} from './menu/app.menu.module';
import {DocumentModule} from './document/document.module';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';

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
    StoreModule.forRoot({
      load: loadingReducer
    }),
    AuthenticationModule,
    AppMenuModule,
    DocumentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

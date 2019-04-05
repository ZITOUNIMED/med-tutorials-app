import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Angular2CsvModule } from 'angular2-csv';

import { AppComponent } from './app.component';
import { AppMaterialmodule } from './app.material.module';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentSheetComponent } from './document/document-sheet/document-sheet.component';
import { DocumentContentComponent } from './document/document-content/document-content.component';
import { DocumentPaletteComponent } from './document/document-palette/document-palette.component';
import { GenerecDialogComponent } from './generec-dialog/generec-dialog.component';
import { DocumentComponent } from './document/document.component';
import { CreateUpdateDocumentModalComponent } from './document/shared/modal/create-update-document-modal/create-update-document-modal.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import {AppModuleRouting} from './app.module.routing';
import {StoreModule} from '@ngrx/store';
import {loadingReducer} from './shared/loading.reducer';
import {SharedModule} from './shared/shared.module';
import {AuthenticationModule} from "./authentication/authentication.module";
import { HomeComponent } from './home/home.component';
import {AccountModule} from "./account/account.module";

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentSheetComponent,
    DocumentContentComponent,
    DocumentPaletteComponent,
    GenerecDialogComponent,
    DocumentComponent,
    CreateUpdateDocumentModalComponent,
    NavBarComponent,
    ToolBarComponent,
    HomeComponent,
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
    AppMaterialmodule,
    HttpClientModule,
    Angular2CsvModule,
    AppModuleRouting,
    StoreModule.forRoot({
      load: loadingReducer
    }),
    SharedModule,
    AuthenticationModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

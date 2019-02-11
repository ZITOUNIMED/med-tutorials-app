import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Angular2CsvModule } from 'angular2-csv';

import { AppComponent } from "./app.component";
import { AppMaterialmodule } from "./app.material.module";
import { DocumentFormComponent } from './document/document-form/document-form.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentSheetComponent } from './document/document-sheet/document-sheet.component';
import { CreateDocumentComponent } from './document/create-document/create-document.component';
import { DocumentContentComponent } from './document/document-content/document-content.component';
import { DocumentPaletteComponent } from './document/document-palette/document-palette.component';
import { DownloadButtonDirective } from './download-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    DocumentFormComponent,
    DocumentListComponent,
    DocumentSheetComponent,
    CreateDocumentComponent,
    DocumentContentComponent,
    DocumentPaletteComponent,
    DownloadButtonDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppMaterialmodule,
    HttpClientModule,
    Angular2CsvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

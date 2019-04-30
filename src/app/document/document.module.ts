import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Angular2CsvModule} from 'angular2-csv';

import {DocumentListComponent} from './document-list/document-list.component';
import {DocumentContentComponent} from './document-content/document-content.component';
import {DocumentPaletteComponent} from './document-palette/document-palette.component';
import {DocumentSheetComponent} from './document-sheet/document-sheet.component';
import {DocumentComponent} from './document.component';
import {AppMaterialModule} from '../app.material.module';
import {SharedModule} from '../shared/shared.module';
import { CreateUpdateDocumentComponent } from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from "./shared/modal/import-document-file/import-document-file.component";
import {AppDirectivesModule} from "../directive/app-directives.module";


@NgModule({
  imports: [AppMaterialModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Angular2CsvModule,
    SharedModule,
    AppDirectivesModule],
  declarations: [
    DocumentListComponent,
    DocumentSheetComponent,
    DocumentContentComponent,
    DocumentPaletteComponent,
    DocumentComponent,
    CreateUpdateDocumentComponent,
    ImportDocumentFileComponent,
  ],
  entryComponents: [CreateUpdateDocumentComponent,
    ImportDocumentFileComponent]
})
export class DocumentModule {}

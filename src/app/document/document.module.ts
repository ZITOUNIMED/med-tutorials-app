import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Angular2CsvModule} from 'angular2-csv';

import {DocumentListComponent} from './document-list/document-list.component';
import {DocumentContentComponent} from './document-content/document-content.component';
import {DocumentPaletteComponent} from './document-content/document-palette/document-palette.component';
import {DocumentSheetComponent} from './document-sheet/document-sheet.component';
import {DocumentComponent} from './document.component';
import {AppMaterialModule} from '../app.material.module';
import {SharedModule} from '../shared/shared.module';
import { CreateUpdateDocumentComponent } from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from './shared/modal/import-document-file/import-document-file.component';
import {AppDirectivesModule} from '../directive/app-directives.module';
import { ElementTextSheetComponent } from './document-content/element-text-sheet/element-text-sheet.component';
import {ExportDocumentService} from './shared/service/export-document.service';
import { DisplayPdfReportComponent } from './shared/modal/display-pdf-report/display-pdf-report.document';
import { ContentHeaderComponent } from './document-content/content-header/content-header.component';
import { ContentMoveElementComponent } from './document-content/content-move-element/content-move-element.component';
import { DocumentPermissionsService } from './shared/service/document-permissions.service';
import { IndexComponent } from './index/index.component';
import { DisplayTextComponent } from './document-content/element-text-sheet/display-text/display-text.component';

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
    ElementTextSheetComponent,
    DisplayPdfReportComponent,
    ContentHeaderComponent,
    ContentMoveElementComponent,
    IndexComponent,
    DisplayTextComponent,
  ],
  providers: [ExportDocumentService, DocumentPermissionsService],
  entryComponents: [
    CreateUpdateDocumentComponent,
    ImportDocumentFileComponent,
    DisplayPdfReportComponent]
})
export class DocumentModule {}

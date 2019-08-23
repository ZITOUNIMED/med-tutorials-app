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
import { ListPaletteComponent } from './document-content/document-palette/list-palette/list-palette.component';
import { TextPaletteComponent } from './document-content/document-palette/text-palette/text-palette.component';
import { TextareaPaletteComponent } from './document-content/document-palette/textarea-palette/textarea-palette.component';
import { TitlePaletteComponent } from './document-content/document-palette/title-palette/title-palette.component';
import { DisplayListComponent } from './document-content/element-text-sheet/display-list/display-list.component';
import { DisplayAttachmentComponent } from './document-content/element-text-sheet/display-attachment/display-attachment.component';
import { AttachmentPaletteComponent } from './document-content/document-palette/attachment-palette/attachment-palette.component';
import { AddDocumentToCollectionComponent } from './shared/modal/add-document-to-collection/add-document-to-collection.component';
import { ContentFooterComponent } from './document-content/content-footer/content-footer.component';

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
    ListPaletteComponent,
    TextPaletteComponent,
    TextareaPaletteComponent,
    TitlePaletteComponent,
    DisplayListComponent,
    DisplayAttachmentComponent,
    AttachmentPaletteComponent,
    AddDocumentToCollectionComponent,
    ContentFooterComponent,
  ],
  providers: [ExportDocumentService, DocumentPermissionsService],
  entryComponents: [
    CreateUpdateDocumentComponent,
    ImportDocumentFileComponent,
    DisplayPdfReportComponent,
    AddDocumentToCollectionComponent]
})
export class DocumentModule {}

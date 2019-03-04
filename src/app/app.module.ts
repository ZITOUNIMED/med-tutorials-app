import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Angular2CsvModule } from 'angular2-csv';

import { AppComponent } from './app.component';
import { AppMaterialmodule } from './app.material.module';
import { DocumentFormComponent } from './document/document-form/document-form.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentSheetComponent } from './document/document-sheet/document-sheet.component';
import { DocumentContentComponent } from './document/document-content/document-content.component';
import { DocumentPaletteComponent } from './document/document-palette/document-palette.component';
import { DownloadButtonDirective } from './download-button.directive';
import { GenerecDialogComponent } from './generec-dialog/generec-dialog.component';
import { DocumentComponent } from './document/document.component';
import {RouterModule, Routes} from '@angular/router';
import {DocumentResolverService} from './document/shared/document-resolver.service';

const appRoutes: Routes = [
  {
    path: 'document',
    component: DocumentComponent
  },
  { path: '',
    redirectTo: '/document',
    pathMatch: 'full'
  },
  {
    path: 'document/:id',
    component: DocumentSheetComponent,
    resolve: {
      document: DocumentResolverService
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DocumentFormComponent,
    DocumentListComponent,
    DocumentSheetComponent,
    DocumentContentComponent,
    DocumentPaletteComponent,
    DownloadButtonDirective,
    GenerecDialogComponent,
    DocumentComponent
  ],
  entryComponents: [GenerecDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppMaterialmodule,
    HttpClientModule,
    Angular2CsvModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

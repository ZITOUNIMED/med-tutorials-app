import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';

import {Document} from '../shared/model/document.model';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/internal/operators';
import {excelReportConfig} from '../../../environments/report/excel.config';
import {ExportDocumentService} from '../shared/service/export-document.service';
import { DisplayPdfReportComponent } from '../shared/modal/display-pdf-report/display-pdf-report.document';

@Component({
  selector: 'app-document-sheet',
  templateUrl: './document-sheet.component.html',
  styleUrls: ['./document-sheet.component.css']
})
export class DocumentSheetComponent implements OnInit {
  document: Document;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  editMode = false;

  constructor(private route: ActivatedRoute,
              private exportDocumentService: ExportDocumentService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(data => data && !!data['document']),
        map(data => data['document']),
      )
      .subscribe(document => {
        this.document = document;
      });
  }

  onEditModeChange(editMode: boolean) {
    this.editMode = editMode;
  }

  exportAsPdf() {
    const doc = this.exportDocumentService.exportAsPdf(this.document);
    const dialogRef = this.dialog.open(DisplayPdfReportComponent, {
      height: '700px',
      width: '900px',
      data: {
        doc: doc
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

  formatElements() {
    return this.exportDocumentService.formatElementsTextForExcelExporting(this.document.elements);
  }

  getOptions() {
    const options = {
      ...excelReportConfig.options,
      title: this.document.name,
      keys: ['type', 'text', 'row', 'page']
    };
    return options;
  }
}

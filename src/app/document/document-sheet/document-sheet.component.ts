import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/internal/operators';
import {excelReportConfig} from '../../../environments/report/excel.config';
import {ExportDocumentService} from '../shared/service/export-document.service';

@Component({
  selector: 'app-document-sheet',
  templateUrl: './document-sheet.component.html',
  styleUrls: ['./document-sheet.component.css']
})
export class DocumentSheetComponent implements OnInit {
  document: Document;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  editMode = false;
  element: Element;
  newOrEditElement: Element;
  shouldCancelChanges = true;

  constructor(private route: ActivatedRoute,
              private exportDocumentService: ExportDocumentService) {
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

  saveElementChange(element) {
    this.newOrEditElement = element;
  }

  onEditElementChange(element) {
    this.element = element;
  }

  onEditModeChange(editMode) {
    this.editMode = editMode;
  }

  onCancelChange(cancel) {
    this.shouldCancelChanges = cancel;
  }

  exportAsPdf() {
    this.exportDocumentService.exportAsPdf(this.document);
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

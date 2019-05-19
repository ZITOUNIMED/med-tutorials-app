import {Angular2CsvComponent, Options} from 'angular2-csv';
import {Component, Input} from '@angular/core';
import {excelReportConfig} from '../../../environments/report/excel.config';
import {ExportDocumentService} from '../../document/shared/service/export-document.service';
import {Document} from '../../document/shared/model/document.model';

@Component({
  selector: 'app-excel-export',
  templateUrl: './app-excel-export.component.html',
  styleUrls: ['./app-excel-export.component.css']
})
export class AppExcelExportComponent extends Angular2CsvComponent {
  @Input() document: Document;
  data: any[];
  filename: string;
  options: Options;

  constructor(private ExportDocumentService: ExportDocumentService) {
    super();
  }

  formatElements() {
    return this.ExportDocumentService.formatElementsTextForExcelExporting(this.document.elements);
  }

  onDownload(){
    this.options = {
      ...excelReportConfig.options,
      title: this.document.name,
      keys: ['type', 'text', 'row', 'page']
    } as Options;
    this.filename = this.document.name + '- '+ new Date().toDateString();
    this.data = this.formatElements();
    super.onDownload();
  }
}

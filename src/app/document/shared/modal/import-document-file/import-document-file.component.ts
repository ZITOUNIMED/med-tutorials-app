import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Document} from '../../model/document.model';
import {Element} from '../../model/element.model';
import {ElementType} from '../../element-type';
import {excelReportConfig} from "../../../../../environments/report/excel.config";

@Component({
  templateUrl: './import-document-file.component.html'
})
export class ImportDocumentFileComponent implements OnInit {

  nameControl: FormControl = new FormControl();
  fileName = '';
  private _document: Document;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {documentName: string}) {}

  selectFile($event) {
    const fileList = $event.srcElement.files;
    const file = fileList[0];
    if (file && file.name.endsWith('.csv')) {
      this.fileName = file.name;
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        if (csvRecordsArray && csvRecordsArray.length > 2) {
          const elements = [];
          for (let i = 1; i < csvRecordsArray.length; i++) {
            const dataCsv = csvRecordsArray[i].split(excelReportConfig.options.fieldSeparator);
            const element = {
              id: null,
              type: dataCsv[0],
              text: dataCsv[1] && dataCsv[1].replace(new RegExp(excelReportConfig.sourceCodeNewLineSeparator, 'g'), '\n'),
              row: Number(dataCsv[2]),
              page: Number(dataCsv[3]),
            } as Element;

            if (element.type) {
              elements.push(element);
            }
          }
          this._document.elements = elements;
        }
      };
    }
  }

  get document(): Document {
    this._document.name = this.nameControl.value || this.fileName;
    return this._document;
  }

  ngOnInit() {
    this.nameControl.setValue(this.data && this.data.documentName || '');
    this._document = {
      id: null,
      name: '',
      elements: [],
      owner: null,
    };
  }
}

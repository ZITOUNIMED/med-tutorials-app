import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Document} from '../../model/document.model';
import {Element} from '../../model/element.model';
import {excelReportConfig} from "../../../../../environments/report/excel.config";
import { oc, isNotEmptyArray } from 'src/app/shared/app-utils';

@Component({
  templateUrl: './import-document-file.component.html'
})
export class ImportDocumentFileComponent implements OnInit {
  _documents: Document[];
  fb = new FormBuilder();
  importForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) {}

  selectFiles($event) {
    const files = $event.srcElement.files;
    if(oc(files).length){
      for(let i = 0; i<files.length; i++){
        const file = files[i];
        this.importFile(file);
      }
    }
  }

  private importFile(file){
    if (file && file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (data) => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        if (csvRecordsArray && csvRecordsArray.length > 2) {
          const elements = [];
          for (let i = 1; i < csvRecordsArray.length; i++) {
            const dataCsv = csvRecordsArray[i].split(excelReportConfig.options.fieldSeparator);
            let text = dataCsv[1] && dataCsv[1].replace(new RegExp(excelReportConfig.newLineSeparator, 'g'), '\n');
            text = text && text.replace(new RegExp(excelReportConfig.doubleQuoteString, 'g'), '"');
            const element = {
              id: null,
              type: dataCsv[0],
              text: text,
              row: Number(dataCsv[2]),
              page: Number(dataCsv[3]),
            } as Element;

            if (element.type) {
              elements.push(element);
            }
          }
          const doc: Document = {
            id: null,
            name: '',
            description: '',
            author: '',
            elements: elements,
            confidentiality: null,
            ownerUsername: '',
          }

          this.names.push(this.fb.group({name: [file.name, Validators.required]}));
          this._documents.push(doc);
        }
      };
    }
  }

  get documents() {
    if(isNotEmptyArray(oc(this.names).controls)){
      for(let i = 0; i<this.names.controls.length; i++){
        const name = this.names.controls[i].get('name').value;
        this._documents[i].name = name;
      }
    }
    return this._documents;
  }

  get names(): FormArray{
    return oc(this.importForm).get('names') as FormArray;
  }

  ngOnInit() {
    this._documents = [];
    this.importForm = this.fb.group({
      names: this.fb.array([])
    });
  }
}

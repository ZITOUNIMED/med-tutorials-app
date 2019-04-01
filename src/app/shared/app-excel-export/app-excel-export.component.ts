import {Angular2CsvComponent} from 'angular2-csv';
import {Component} from '@angular/core';

@Component({
  selector: 'app-excel-export',
  templateUrl: './app-excel-export.component.html',
  styleUrls: ['./app-excel-export.component.css']
})
export class AppExcelExportComponent extends Angular2CsvComponent {
  constructor() {
    super();
  }
}

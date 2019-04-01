import {NgModule} from '@angular/core';
import {AppExcelExportComponent} from './app-excel-export/app-excel-export.component';

@NgModule({
  declarations: [
    AppExcelExportComponent
  ],
  exports: [
    AppExcelExportComponent
  ]
})
export class SharedModule {

}

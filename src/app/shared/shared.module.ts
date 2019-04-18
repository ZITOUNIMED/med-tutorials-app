import {NgModule} from '@angular/core';
import {AppExcelExportComponent} from './app-excel-export/app-excel-export.component';
import { NotificationComponent } from './notification/notification.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AppExcelExportComponent,
    NotificationComponent
  ],
  exports: [
    AppExcelExportComponent,
    NotificationComponent
  ]
})
export class SharedModule {

}

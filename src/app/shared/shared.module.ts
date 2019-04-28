import {NgModule} from '@angular/core';
import {AppExcelExportComponent} from './app-excel-export/app-excel-export.component';
import { NotificationComponent } from './notification/notification.component';
import {CommonModule} from '@angular/common';
import { AppStoreService } from './service/app.store.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AppExcelExportComponent,
    NotificationComponent
  ],
  providers: [AppStoreService],
  exports: [
    AppExcelExportComponent,
    NotificationComponent
  ]
})
export class SharedModule {

}

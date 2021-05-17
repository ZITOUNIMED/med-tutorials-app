import {NgModule} from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import {CommonModule} from '@angular/common';
import { AppStoreService } from './service/app.store.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotificationComponent,
    LoadingComponent
  ],
  providers: [AppStoreService],
  exports: [
    NotificationComponent,
    LoadingComponent,
  ]
})
export class SharedModule {

}

import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {NotificationsState} from './notifications.state';
import {Notification} from './notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[];

  constructor(private store: Store<NotificationsState>) { }

  ngOnInit() {
    this.store.select('notificationsState').subscribe(notificationsState => {
      this.notifications = notificationsState && notificationsState.notifications || [];
    });
  }

}

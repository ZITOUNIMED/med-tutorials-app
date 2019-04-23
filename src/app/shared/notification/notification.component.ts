import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {NotificationsState} from './notifications.state';
import {Notification, NotificationTypes} from './notification.model';
import {NotificationsRemoveAction} from "./notifications.actions";

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[];
  NotificationTypes = NotificationTypes;

  constructor(private store: Store<NotificationsState>) { }

  ngOnInit() {
    this.store.select('notificationsState').subscribe(notificationsState => {
      this.notifications = notificationsState && notificationsState.notifications || [];
    });
  }

  removeNotification(notif: Notification) {
    this.store.dispatch(new NotificationsRemoveAction(notif));
  }

}

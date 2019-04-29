import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Notification, NotificationTypes } from '../notification/notification.model';
import { NotificationsAddAction } from '../notification/notifications.actions';
import {StartLoadingAction, StopLoadingAction} from '../loading.actions';

@Injectable()
export class AppStoreService {
    constructor(private store: Store<AppState>) {}

    addErrorNotif(code: string, message: string) {
        const notif: Notification = {
            code: code,
            type: NotificationTypes.ERROR,
            message: message
        };
        this.store.dispatch(new NotificationsAddAction(notif));
    }

    startLoading() {
      this.store.dispatch(new StartLoadingAction());
    }

    stopLoading() {
      this.store.dispatch(new StopLoadingAction());
    }
}

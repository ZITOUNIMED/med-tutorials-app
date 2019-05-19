import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {loadingReducer} from './loading.reducer';
import {principalReducer} from '../authentication/shared/principal.reducer';
import {notificationsReducer} from './notification/notifications.reducer';
import { userReducer } from '../user/shared/user.reducer';
import {documentWrapperReducer} from '../document/document-content/shared/document-wrapper.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  loadingState: loadingReducer,
  principalState: principalReducer,
  notificationsState: notificationsReducer,
  userState: userReducer,
  documentWrapperState: documentWrapperReducer,
};

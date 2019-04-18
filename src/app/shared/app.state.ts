import {LoadingState} from './loading.state';
import {PrincipalState} from '../authentication/shared/principal.state';
import {NotificationsState} from './notification/notifications.state';

export interface AppState {
  loadingState: LoadingState;
  principalState: PrincipalState;
  notificationsState: NotificationsState;
}

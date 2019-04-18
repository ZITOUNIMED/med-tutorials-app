import {LoadingState} from './loading.state';
import {PrincipalState} from '../authentication/shared/principal.state';

export interface AppState {
  loadingState: LoadingState;
  principalState: PrincipalState;
}

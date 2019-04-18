import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {loadingReducer} from './loading.reducer';
import {principalReducer} from '../authentication/shared/principal.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  loadingState: loadingReducer,
  principalState: principalReducer,
};

import {LoadingActions, START_LOADING_ACTION_TYPE, STOP_LOADING_ACTION_TYPE} from './loading.actions';
import {ActionReducer} from '@ngrx/store';
import {LoadingState} from './loading.state';

export const loadingReducer: ActionReducer<LoadingState> = (state: LoadingState, action: LoadingActions) => {
  switch (action.type) {
    case START_LOADING_ACTION_TYPE:
      return {
        loading: true
      };
    case STOP_LOADING_ACTION_TYPE:
      return {
        loading: false
      };
    default: return state;
  }
};

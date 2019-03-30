import {START_LOADING_ACTION_TYPE} from './start-loading.action';
import {Action} from '@ngrx/store';
import {LoadingState} from './loading.state';
import {STOP_LOADING_ACTION_TYPE} from "./stop-loading.action";

export const loadingReducer = (state: LoadingState, action: Action): LoadingState => {
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
}

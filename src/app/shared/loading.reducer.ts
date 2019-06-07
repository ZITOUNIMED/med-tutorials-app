import {LoadingActions, START_LOADING_ACTION_TYPE, STOP_LOADING_ACTION_TYPE} from './loading.actions';
import {LoadingState} from './loading.state';

export function loadingReducer(state: LoadingState, action: LoadingActions) {
  switch (action.type) {
    case START_LOADING_ACTION_TYPE:
      // TODO: manage simultaneous access
      // const from = action.payload;
      // console.log('Start from: ' + from);
      return {
        loading: true
      };
    case STOP_LOADING_ACTION_TYPE:
      // TODO: manage simultaneous access
      // const by = action.payload;
      // console.log('Stop by: ' + by);
      return {
        loading: false
      };
    default: return state;
  }
}

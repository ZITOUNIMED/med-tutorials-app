import {Action} from '@ngrx/store';

export const STOP_LOADING_ACTION_TYPE = 'STOP_LOADING_ACTION_TYPE';

export class StopLoadingAction implements Action {
  readonly type = STOP_LOADING_ACTION_TYPE;
  constructor() {}
}

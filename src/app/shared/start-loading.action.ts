import {Action} from '@ngrx/store';

export const START_LOADING_ACTION_TYPE = 'START_LOADING_ACTION_TYPE';

export class StartLoadingAction implements Action {
  readonly type = START_LOADING_ACTION_TYPE;
  constructor() {}
}

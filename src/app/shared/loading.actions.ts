import {Action} from '@ngrx/store';

export const START_LOADING_ACTION_TYPE = 'START_LOADING_ACTION_TYPE';
export const STOP_LOADING_ACTION_TYPE = 'STOP_LOADING_ACTION_TYPE';

export type LoadingActions = StartLoadingAction | StopLoadingAction;

export class StartLoadingAction implements Action {
  readonly type = START_LOADING_ACTION_TYPE;
  constructor(public payload?: string) {}
}

export class StopLoadingAction implements Action {
  readonly type = STOP_LOADING_ACTION_TYPE;
  constructor(public payload?: string) {}
}

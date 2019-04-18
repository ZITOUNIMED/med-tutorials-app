import {ActionReducer} from '@ngrx/store';

import { PrincipalState } from './principal.state';
import {PrincipalActions, PRINCIPAL_SAVE, PRINCIPAL_CLEAN} from './principal.actions';

export const principalReducer: ActionReducer<PrincipalState> = (state: PrincipalState, action: PrincipalActions) => {
  switch (action.type) {
    case PRINCIPAL_SAVE:
      return {
        ...state,
        principal: action.payload
      };
    case PRINCIPAL_CLEAN:
      return action.payload ? null : state;
    default:
      return state;
  }
};

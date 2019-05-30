import { DOCUMENT_SELECT, DocumentActions } from "./document.actions";
import { DocumentState } from "./document.state";
import {Document} from './model/document.model';

export function documentReducer(state: DocumentState, action: DocumentActions) {
  switch (action.type) {
    case DOCUMENT_SELECT:
      return {
        ...state,
        doc: action.payload as Document
      };
    default:
      return state;
  }
}

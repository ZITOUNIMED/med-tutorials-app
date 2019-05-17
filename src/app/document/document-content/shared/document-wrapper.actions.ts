import {Action} from '@ngrx/store';
import {Element} from '../../shared/model/element.model';
import {Point} from './document-wrapper.state';

export const DOCUMENT_WRAPPER_INIT = 'DOCUMENT_WRAPPER_INIT';
export const DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE = 'DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE';
export const DOCUMENT_WRAPPER_MOVE_DOWN = 'DOCUMENT_WRAPPER_MOVE_DOWN';
export const DOCUMENT_WRAPPER_MOVE_ELEMENT = 'DOCUMENT_WRAPPER_MOVE_ELEMENT';
export const DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE = 'DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE';
export const DOCUMENT_WRAPPER_SAVE_ELEMENT = 'DOCUMENT_WRAPPER_SAVE_ELEMENT';

export type DocumentWrapperActions = DocumentWrapperInitAction |
  DocumentWrapperGoToNextPageAction |
  DocumentWrapperMoveDownAction |
  DocumentWrapperMoveElementAction |
  DocumentWrapperReturnToPreviousPageAction |
  DocumentWrapperSaveElementAction
  ;

export class DocumentWrapperInitAction implements Action {
  readonly type = DOCUMENT_WRAPPER_INIT;

  constructor(public payload: Element[]) {
  }
}

export class DocumentWrapperGoToNextPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperMoveDownAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_DOWN;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperMoveElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_ELEMENT;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperReturnToPreviousPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperSaveElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_SAVE_ELEMENT;

  constructor(public payload: Element) {
  }
}

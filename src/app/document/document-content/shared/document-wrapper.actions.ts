import {Action} from '@ngrx/store';
import {Element} from '../../shared/model/element.model';
import {Point} from './document-wrapper.state';

export const DOCUMENT_WRAPPER_INIT = 'DOCUMENT_WRAPPER_INIT';
export const DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE = 'DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE';
export const DOCUMENT_WRAPPER_MOVE_DOWN = 'DOCUMENT_WRAPPER_MOVE_DOWN';
export const DOCUMENT_WRAPPER_MOVE_UP = 'DOCUMENT_WRAPPER_MOVE_UP';
export const DOCUMENT_WRAPPER_MOVE_ELEMENT = 'DOCUMENT_WRAPPER_MOVE_ELEMENT';
export const DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE = 'DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE';
export const DOCUMENT_WRAPPER_SAVE_ELEMENT = 'DOCUMENT_WRAPPER_SAVE_ELEMENT';
export const DOCUMENT_WRAPPER_SELECT_ELEMENT = 'DOCUMENT_WRAPPER_SELECT_ELEMENT';
export const DOCUMENT_WRAPPER_INSERT_PAGES = 'DOCUMENT_WRAPPER_INSERT_PAGES';
export const DOCUMENT_WRAPPER_DELETE_ELEMENT = 'DOCUMENT_WRAPPER_DELETE_ELEMENT';
export const DOCUMENT_WRAPPER_CHANGE_EDIT_MODE = 'DOCUMENT_WRAPPER_CHANGE_EDIT_MODE';
export const DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT = 'DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT';
export const DOCUMENT_WRAPPER_MOVE_TO_PAGE = 'DOCUMENT_WRAPPER_MOVE_TO_PAGE';
export const DOCUMENT_WRAPPER_DELETE_PAGES = 'DOCUMENT_WRAPPER_DELETE_PAGES';
export const DOCUMENT_WRAPPER_GO_TO_PAGE = 'DOCUMENT_WRAPPER_GO_TO_PAGE';

export type DocumentWrapperActions = DocumentWrapperInitAction |
  DocumentWrapperGoToNextPageAction |
  DocumentWrapperMoveDownAction |
  DocumentWrapperMoveUpAction |
  DocumentWrapperMoveElementAction |
  DocumentWrapperReturnToPreviousPageAction |
  DocumentWrapperSaveElementAction |
  DocumentWrapperInserPagesAction |
  DocumentWrapperDeletePagesAction |
  DocumentWrapperDeleteElementAction |
  DocumentWrapperChangeEditModeAction |
  DocumentWrapperCancelEditElementAction |
  DocumentWrapperMoveToPageAction |
  DocumentWrapperSelectElementAction |
  DocumentWrapperGoToPageAction
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

export class DocumentWrapperMoveUpAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_UP;

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

export class DocumentWrapperSelectElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_SELECT_ELEMENT;

  constructor(public payload: Element) {
  }
}

export class DocumentWrapperInserPagesAction implements Action {
  readonly type = DOCUMENT_WRAPPER_INSERT_PAGES;

  constructor(public payload: number) {
  }
}

export class DocumentWrapperGoToPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_GO_TO_PAGE;

  constructor(public payload: number) {
  }
}

export class DocumentWrapperDeletePagesAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DELETE_PAGES;

  constructor(public payload: number) {
  }
}

export class DocumentWrapperDeleteElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DELETE_ELEMENT;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperChangeEditModeAction implements Action {
  readonly type = DOCUMENT_WRAPPER_CHANGE_EDIT_MODE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperCancelEditElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperMoveToPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_TO_PAGE;

  constructor(public payload: {p: Point, jump: number}) {
  }
}

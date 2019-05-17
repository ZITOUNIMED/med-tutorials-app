import {
  DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE,
  DOCUMENT_WRAPPER_INIT,
  DOCUMENT_WRAPPER_MOVE_DOWN,
  DOCUMENT_WRAPPER_MOVE_ELEMENT, DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE, DOCUMENT_WRAPPER_SAVE_ELEMENT,
  DocumentWrapperActions
} from './document-wrapper.actions';
import {DocumentWrapperState, Point} from './document-wrapper.state';
import {Element} from '../../shared/model/element.model';

export function documentWrapperReducer(state: DocumentWrapperState, action: DocumentWrapperActions) {
  switch (action.type) {
    case DOCUMENT_WRAPPER_INIT:
      const initState = {
        elements: action.payload,
        currentPage: 0,
        movedItem: {row: -1, page: -1},
      } as DocumentWrapperState;

      return buildWrapper(initState);
    case DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE:
      if (action.payload) {
        state.currentPage++;
      }
      return buildWrapper(state);
    case DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE:
      if (action.payload) {
        state.currentPage--;
      }
      return buildWrapper(state);
    case DOCUMENT_WRAPPER_MOVE_ELEMENT:
      moveElement(state, action.payload as Point);
      return buildWrapper(state);
    case DOCUMENT_WRAPPER_MOVE_DOWN:
      moveDown(state, action.payload as Point);
      return buildWrapper(state);
    case DOCUMENT_WRAPPER_SAVE_ELEMENT:
      saveElement(state, action.payload as Element)
      return buildWrapper(state);
    default:
      return state;
  }
}

function saveElement(state: DocumentWrapperState, element: Element) {
  if (element.row === -1) {
    const row = getBiggestRowInPage(state, state.currentPage) + 1;
    element.row = row;
    element.page = state.currentPage;
    state.elements.push(element);
  } else {
    state.elements
      .filter(elt => elt.row === element.row && elt.page === element.page)
      .map(elt => {
        elt.type = element.type;
        elt.text = element.text;
        return elt;
      });
  }
}

function getBiggestRowInPage(state: DocumentWrapperState, page): number {
  const elts = state.elements.filter(elt => elt.page === page);
  return elts && elts.length > 0 ? Math.max(...elts.map(elt => elt.row)) : -1;
}

function moveElement(state: DocumentWrapperState, p: Point) {
  if (state.movedItem.row === p.row && state.movedItem.page === p.page) {
    moveToPosition(state);
  } else {
    moveToPosition(state, p);
  }
}

function moveDown(state: DocumentWrapperState, p: Point) {
  const isTheLast = !state.elements.some(
    elt => elt.page === p.page && elt.row > p.row
  );

  if (isTheLast) {
    state.currentPage = p.page + 1;
    increaseRows(state, p.page + 1);
    const toP = {row: 0, page: p.page + 1};

    changeElementPosition(state, p, toP);
    moveToPosition(state, toP);
  } else {
    const toP = {row: p.row + 1, page: p.page};
    switchTowPositions(state, p, toP);
    moveToPosition(state, toP);
    state.currentPage = p.page;
  }
}

function switchTowPositions(state: DocumentWrapperState, p1: Point, p2: Point) {
  const e1 = getElementAtPosition(state, p1);
  const e2 = getElementAtPosition(state, p2);
  changeElementPosition(state, e2, {row: -1, page: -1});
  changeElementPosition(state, e1, p2);
  changeElementPosition(state, e2, p1);
}

function getElementAtPosition(state: DocumentWrapperState, p: Point): Element {
  const elts = state.elements.filter(
    elt => elt.row === p.row && elt.page === p.page
  );
  return elts && elts.length === 1 ? elts[0] : null;
}

function changeElementPosition(state: DocumentWrapperState, p: Point, toP: Point) {
  state.elements
    .filter(elt => elt.row === p.row && elt.page === p.page)
    .map(elt => {
      elt.row = toP.row;
      elt.page = toP.page;
      return elt;
    });
}

function increaseRows(state: DocumentWrapperState, page: number) {
  state.elements
    .filter(elt => elt.page === page)
    .map(elt => {
      elt.row++;
      return elt;
    });
}

function moveToPosition(state: DocumentWrapperState, p?: Point) {
  if (p) {
    state.movedItem = {
      row: p.row,
      page: p.page
    };
  } else {
    state.movedItem = {
      row: -1,
      page: -1
    };
  }
}

function buildWrapper(state: DocumentWrapperState) {
  state.currentPageElements = getCurrentPageElements(state);
  state.currentPageElements = sortElements(state);
  state.biggerPage = getBiggerPage(state);
  state.canGoToNextPage = checkCanGoToNextPage(state);
  state.canReturnToPreviousPage = checkCanReturnToPreviousPage(state);
  return {...state};
}

function getCurrentPageElements(state: DocumentWrapperState) {
  return state && state.elements && state.elements.filter(elt => elt.page === state.currentPage);
}

function getBiggerPage(state: DocumentWrapperState) {
  return state.elements && state.elements.length && state.elements.sort((e1, e2) => e2.page - e1.page)[0].page;
}

function checkCanGoToNextPage(state: DocumentWrapperState) {
  return (
    state.elements &&
    state.elements.some(element => element.page > state.currentPage)
  );
}

function checkCanReturnToPreviousPage(state: DocumentWrapperState) {
 return !!(state.currentPage > 0);
}

function sortElements(state: DocumentWrapperState) {
  return state.currentPageElements.sort((e1, e2) => e1.row - e2.row);
}

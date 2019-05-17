import {Element} from '../../shared/model/element.model';

export interface DocumentWrapperState {
  elements: Element[];
  currentPageElements: Element[];
  currentPage: number;
  canReturnToPreviousPage: boolean;
  canGoToNextPage: boolean;
  biggerPage: number;
  movedItem: Point;
}

export interface Point {
  row: number;
  page: number;
}

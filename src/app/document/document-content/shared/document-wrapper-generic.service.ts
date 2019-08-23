import { DocumentWrapperState, Point } from "./document-wrapper.state";
import {Element} from '../../shared/model/element.model';

export interface DocumentWrapperGenericService {
    // init document wrapper data
    initDocument(elements: Element[]): DocumentWrapperState;

    // move element actions
    moveUp(state, p: Point);
    moveDown(state, p: Point);
    moveRow(state, previousRow: number, currentRow: number);

    // page actions
    goToNextPage(state: DocumentWrapperState, accept?: boolean);
    goToPage(state: DocumentWrapperState, page: number);
    returnToPreviousPage(state: DocumentWrapperState, accept?: boolean);
    insertPage(state: DocumentWrapperState, accept?: boolean);
    deletePage(state: DocumentWrapperState, accept?: boolean);
    movePage(state: DocumentWrapperState, previousIndex: number, currentIndex: number);
    
    
    // element crud actions
    saveElement(state: DocumentWrapperState, element: Element);
    moveElement(state: DocumentWrapperState, p: Point);
    deleteElement(state: DocumentWrapperState, p: Point);
    selectElement(state: DocumentWrapperState, element: Element);
    cancelEditElement(state: DocumentWrapperState, accept?: boolean);
    
    // other actions
    changeEditMode(state: DocumentWrapperState, accept?: boolean);
}
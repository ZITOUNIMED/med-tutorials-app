import { DocumentWrapperGenericService } from "./document-wrapper-generic.service";
import { DocumentWrapperState, Point } from "./document-wrapper.state";
import {Element} from '../../shared/model/element.model';
import { state } from "@angular/animations";

const ROW_FLAG = -125;
const PAGE_FLAG = -523;

export class DocumentWrapperService implements DocumentWrapperGenericService {
    initDocument(elements: Element[]): DocumentWrapperState {
        return {
            elements: elements,
            currentPage: 0,
            movedItem: {row: -1, page: -1},
            biggestRowOfCurrentPage: -1,
            editMode: false,
            selectedElement: null,
            canMoveUp: true,
            canDeletePage: false,
            draggedElementPosition: null,
            isLockedRepetition: false,
          } as DocumentWrapperState;
    }

    moveUp(state, p: Point){
        const isTheFirst = !state.elements.some(
            elt => elt.page === p.page && elt.row < p.row
          );
        
          if (isTheFirst) {
            if (p.page > 0) {
              state.currentPage = p.page - 1;
              const biggestRow = this.getBiggestRowInPage(state, p.page - 1);
              let toP = null;
              if (biggestRow >= 0) {
                toP = {row: biggestRow + 1, page: p.page - 1};
              } else {
                toP = {row: 0, page: p.page - 1};
              }
              this.changeElementPosition(state, p, toP);
              this.moveToPosition(state, toP);
              this.decreaseRows(state, p.page);
            } else {
              // this.cantMoveUp = true;
              state.currentPage = p.page;
              const toP = {row: 0, page: p.page};
              this.moveToPosition(state, toP);
            }
          } else {
            const p1 = {row: p.row, page: p.page};
            const p2 = {row: p.row - 1, page: p.page};
            this.switchTowPositions(state, p1, p2);
            this.moveToPosition(state, p2);
            state.currentPage = p.page;
          }
    }

    moveDown(state: DocumentWrapperState, p: Point) {
        const isTheLast = !state.elements.some(
            elt => elt.page === p.page && elt.row > p.row
        );
        
        if (isTheLast) {
            state.currentPage = p.page + 1;
            this.increaseRows(state, p.page + 1);
            const toP = {row: 0, page: p.page + 1};
        
            this.changeElementPosition(state, p, toP);
            this.moveToPosition(state, toP);
        } else {
            const toP = {row: p.row + 1, page: p.page};
            this.switchTowPositions(state, p, toP);
            this.moveToPosition(state, toP);
            state.currentPage = p.page;
        }
    }

    dragAndDropEnded(state: DocumentWrapperState, accept: boolean){
      
    }

    moveRow(state: DocumentWrapperState, previousRow: number, currentRow: number){
      // move in the same page
      if(!state.draggedElementPosition ||
        state.draggedElementPosition.page === state.currentPage){
        const p = {
          row: previousRow,
          page: state.currentPage,
        };
        const toP = { 
          row: currentRow, 
          page: state.currentPage
        };
  
        this.putFlag(state, p);
        
        if(previousRow<currentRow){// move down
          this.decreaseRows(state, state.currentPage, previousRow + 1, currentRow);
        } else {// move up
          this.increaseRows(state, state.currentPage, currentRow, previousRow - 1);
        }
        
        this.applyPointOnFlag(state, toP);
      } else { // in other page
        const p = state.draggedElementPosition;
        const toP = { 
          row: currentRow, 
          page: state.currentPage,
        };

        // prepare element position in the new page
        this.increaseRows(state, state.currentPage, currentRow);

        // put element in the new position
        this.changeElementPosition(state, p, toP);

        // fill element position in last page
        this.decreaseRows(state, p.page, p.row + 1);

        state.isLockedRepetition = false;
      }

      state.draggedElementPosition = null;
    }

    movePage(state: DocumentWrapperState, previousPage: number, currentPage: number){
      this.putFlagOnPage(state, previousPage);
      if(previousPage<currentPage){ // move right
        this.shiftPagesLeft(state, previousPage + 1, currentPage);
      } else {
        this.shiftPagesRight(state, currentPage, previousPage - 1);
      }
      this.applyPageOnFlag(state, currentPage);
      state.currentPage = currentPage;
    }

    goToNextPage(state: DocumentWrapperState, isLockedRepetition?: boolean){
        if (!state.isLockedRepetition) {
            state.isLockedRepetition = isLockedRepetition;
            state.currentPage++;
            this.doCancelEditElement(state);
          }
    }

    returnToPreviousPage(state: DocumentWrapperState, isLockedRepetition?: boolean){
        if (!state.isLockedRepetition) {
            state.isLockedRepetition = isLockedRepetition;
            state.currentPage--;
            this.doCancelEditElement(state);
        }
    }

    goToPage(state: DocumentWrapperState, page: number, isBlurMode?: boolean){
      if(!isBlurMode || isBlurMode && state.editMode){
        state.currentPage = page;
      }
    }

    insertPage(state: DocumentWrapperState, accept?: boolean){
      if(accept){
        this.doCancelEditElement(state);
        this.shiftPagesRight(state, state.currentPage + 1);
        state.currentPage++;
      }
    }

    deletePage(state: DocumentWrapperState, accept?: boolean){
      if(accept){
        // remove page elements from wrapper
        state.elements = state.elements.filter(elt => elt.page !== state.currentPage);

        this.shiftPagesLeft(state, state.currentPage + 1);
        this.doCancelEditElement(state);
      
        state.currentPage--;
      }
    }

    moveElement(state: DocumentWrapperState, p: Point) {
      if (state.movedItem.row === p.row && state.movedItem.page === p.page) {
          this.moveToPosition(state);
      } else {
          this.moveToPosition(state, p);
      }
    }

    dragAndDropElement(state: DocumentWrapperState, p: Point){
      state.draggedElementPosition = p;
    }

    saveElement(state: DocumentWrapperState, element: Element) {
        if (element.row === -1) {
          const row = this.getBiggestRowInPage(state, state.currentPage) + 1;
          element.row = row;
          element.page = state.currentPage;
          state.elements.push(element);
        } else {
          state.elements = state.elements.filter(elt => elt.row !== element.row || elt.page !== element.page);
          state.elements.push({...element});
        }
        this.doCancelEditElement(state);
      }

    deleteElement(state: DocumentWrapperState, p: Point) {
        state.elements = state.elements
          .filter(elt => elt.row !== p.row || elt.page !== p.page)
          .map(elt => {
            if (elt.row > p.row && elt.page === p.page) {
              elt.row--;
            }
            return elt;
          });
        if (
          state.movedItem.row === p.row &&
          state.movedItem.page === p.page
        ) {
          this.moveToPosition(state);
        }
        state.currentPage = p.page;
    }

    selectElement(state: DocumentWrapperState, element: Element){
        if(!state.selectedElement){
          state.selectedElement = element;
        } else {
          state.selectedElement.type = element.type;
        }
        
    }

    cancelEditElement(state: DocumentWrapperState, accept?: boolean){
        if(accept){
            this.doCancelEditElement(state);
        }
    }

    changeEditMode(state: DocumentWrapperState, accept?: boolean){
        if(accept){
            state.editMode = !state.editMode;
        }
    }

    private getBiggestRowInPage(state: DocumentWrapperState, page): number {
        const elts = state.elements.filter(elt => elt.page === page);
        return elts && elts.length > 0 ? Math.max(...elts.map(elt => elt.row)) : -1;
    }

    private changeElementPosition(state: DocumentWrapperState, p: Point, toP: Point) {
        state.elements
        .filter(elt => elt.row === p.row && elt.page === p.page)
        .map(elt => {
            elt.row = toP.row;
            elt.page = toP.page;
            return elt;
        });
    }

    private moveToPosition(state: DocumentWrapperState, p?: Point) {
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

    private increaseRows(state: DocumentWrapperState, page: number, fromRow?: number, toRow?: number) {
      fromRow = fromRow || 0;
      toRow = toRow || (state.elements.length - 1) || 0;

      state.elements
          .filter(elt => elt.page === page)
          .map(elt => {
            if(elt.row>=fromRow && elt.row<=toRow){
              elt.row++;
            }
            return elt;
          });
      }

    private decreaseRows(state: DocumentWrapperState, page: number, fromRow?: number, toRow?: number) {
      fromRow = fromRow || 0;
      toRow = toRow || (state.elements.length - 1) || 0;

      state.elements
          .filter(elt => elt.page === page)
          .map(elt => {
            if(elt.row>=fromRow && elt.row<=toRow){
              elt.row--;
            }
            return elt;
          });
    }
    
    private switchTowPositions(state: DocumentWrapperState, p1: Point, p2: Point) {
        const e1 = this.getElementAtPosition(state, p1);
        const e2 = this.getElementAtPosition(state, p2);
        this.changeElementPosition(state, e2, {row: -1, page: -1});
        this.changeElementPosition(state, e1, p2);
        this.changeElementPosition(state, e2, p1);
    }

    private getElementAtPosition(state: DocumentWrapperState, p: Point): Element {
        const elts = state.elements.filter(
          elt => elt.row === p.row && elt.page === p.page
        );
        return elts && elts.length === 1 ? elts[0] : null;
    }

    private shiftPagesRight(state: DocumentWrapperState, fromPage: number, toPage?: number) {
      toPage = toPage || this.getBiggerPage(state);

      state.elements = state.elements.map(elt => {
        if (elt.page >= fromPage && elt.page<= toPage) {
          elt.page++;;
        }
        return elt;
      });
    }

    private shiftPagesLeft(state: DocumentWrapperState,
      fromPage: number,
      toPage?: number
      ) {

      toPage = toPage || this.getBiggerPage(state);

      state.elements = state.elements.map(elt => {
        if (elt.page >= fromPage && elt.page<=toPage) {
          elt.page--;
        }
        return elt;
      });
    }
    
    private doCancelEditElement(state: DocumentWrapperState){
        state.selectedElement = null;
    }

    private getBiggerPage(state: DocumentWrapperState) {
      return state.elements && state.elements.length && state.elements.sort((e1, e2) => e2.page - e1.page)[0].page;
    }

    private putFlag(state: DocumentWrapperState, p: Point){
      state.elements
          .filter(elt => elt.page === p.page && elt.row === p.row)
          .map(elt => {
            elt.row = ROW_FLAG;
            elt.page = PAGE_FLAG;
            return elt;
          });
    }

    private applyPointOnFlag(state: DocumentWrapperState, p: Point){
      state.elements
      .filter(elt => elt.page === PAGE_FLAG && elt.row === ROW_FLAG)
      .map(elt => {
        elt.row = p.row;
        elt.page = p.page;
        return elt;
      });
    }

    private putFlagOnPage(state: DocumentWrapperState, page: number){
      state.elements
      .filter(elt => elt.page === page)
      .map(elt => {
        elt.page = PAGE_FLAG;
        return elt;
      });
    }

    private applyPageOnFlag(state: DocumentWrapperState, page: number){
      state.elements
      .filter(elt => elt.page === PAGE_FLAG)
      .map(elt => {
        elt.page = page;
        return elt;
      });
    }
}
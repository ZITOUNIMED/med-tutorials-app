import { DocumentWrapperGenericService } from "./document-wrapper-generic.service";
import { DocumentWrapperState, Point } from "./document-wrapper.state";
import {Element} from '../../shared/model/element.model';

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

    moveToRow(state: DocumentWrapperState, previousRow: number, currentRow: number){
      const p = {
        row: previousRow,
        page: state.currentPage,
      };
      const toP = { 
        row: currentRow, 
        page: state.currentPage
      };
      
      this.switchTowPositions(state, p, toP);
    }

    moveToPage(state: DocumentWrapperState, p: Point, jump: number){
        this.shiftPagesRight(state, p.page, jump);
        const toP = {
          row: 0,
          page: p.page + jump
        };

        this.changeElementPosition(state, p, toP);
        state.currentPage = p.page + jump;
    }

    goToNextPage(state: DocumentWrapperState, accept?: boolean){
        if (accept) {
            state.currentPage++;
            this.doCancelEditElement(state);
          }
    }

    returnToPreviousPage(state: DocumentWrapperState, accept?: boolean){
        if (accept) {
            state.currentPage--;
            this.doCancelEditElement(state);
        }
    }

    goToPage(state: DocumentWrapperState, page: number){
        state.currentPage = page;
    }

    insertPages(state: DocumentWrapperState, pages: number){
        state.currentPage+=pages;
        this.doCancelEditElement(state);
        this.shiftPagesRight(state, state.currentPage, pages);
    }

    deletePages(state: DocumentWrapperState, pages: number){
        for(let page = state.currentPage; page<state.currentPage + pages; page++){
          state.elements = state.elements.filter(elt => elt.page !== page);
        }

        this.shiftPagesLeft(state, state.currentPage + pages, pages);
        this.doCancelEditElement(state);
        state.currentPage--;
    }

    moveElement(state: DocumentWrapperState, p: Point) {
      if (state.movedItem.row === p.row && state.movedItem.page === p.page) {
          this.moveToPosition(state);
      } else {
          this.moveToPosition(state, p);
      }
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
          this.doCancelEditElement(state);
        }
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
        state.selectedElement = element;
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

    private increaseRows(state: DocumentWrapperState, page: number) {
        state.elements
          .filter(elt => elt.page === page)
          .map(elt => {
            elt.row++;
            return elt;
          });
      }

    private decreaseRows(state: DocumentWrapperState, page) {
        state.elements
          .filter(elt => elt.page === page)
          .map(elt => {
            elt.row--;
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

    private shiftPagesRight(state: DocumentWrapperState, page: number, pages: number) {
        state.elements = state.elements.map(element => {
          if (element.page >= page) {
            element.page+=pages;
          }
          return element;
        });
    }
    
    private doCancelEditElement(state: DocumentWrapperState){
        state.selectedElement = null;
    }
    
    private shiftPagesLeft(state: DocumentWrapperState, page: number, pages: number) {
        state.elements = state.elements.map(element => {
          if (element.page >= page) {
            element.page-=pages;
          }
          return element;
        });
    }
}
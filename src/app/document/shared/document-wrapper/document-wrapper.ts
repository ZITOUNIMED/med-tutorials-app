import {Element} from '../model/element.model';
import {Document} from '../model/document.model';

export class DocumentWrapper {
  movedItem = {
    page: -1,
    row: -1
  };

  cantMoveUp = false;

  get currentPageElements(): Element[] {
    const page = this.pagesMap.get(this._currentPageIndex);
    if (page) {
      return page.elements;
    }
    return [];
  }

  get biggerPageIndex() {
    if (this.pagesMap) {
      return Math.max(...Array.from(this.pagesMap.keys()));
    }
    return -1;
  }

  get currentPageIndex(): number {
    return this._currentPageIndex;
  }

  private _currentPageIndex = 0;
  private pagesMap: Map<number, Page>;
  constructor(document: Document) {
    this.buildWrapper(document);
    this.sortPagesElements();
  }

  canReturnToPreviousPage(): boolean {
    return !!(this._currentPageIndex > 0);
  }

  returnToPreviousPage() {
    this._currentPageIndex--;
  }

  canGoToNextPage() {
    return !!(this._currentPageIndex < this.biggerPageIndex);
  }

  goToNextPage() {
    this._currentPageIndex++;
  }

  insertPage() {
    if (this.pagesMap) {
      this._currentPageIndex++;
      this.pagesMap.set(this._currentPageIndex, new Page([]));
    }
  }

  moveElement(element: Element) {
    if (
      this.movedItem.row === element.row &&
      this.movedItem.page === element.page
    ) {
      this.moveToPosition();
    } else {
      this.moveToPosition(element);
    }
  }

  isLastElement(element) {
    const biggestRow = Math.max(...this.currentPageElements.map(e => e.row));
    if (element.row === biggestRow) {
      return true;
    }
    return false;
  }

  moveUp(element) {
    const [row, page] = [element.row, element.page];

    if (row === 0) {
      if (page > 0) {
  //       this.currentPage = page - 1;
  //       const biggestRow = this.getBiggestRow(page - 1);
  //       if (biggestRow >= 0) {
  //         const p = {row: biggestRow + 1, page: page - 1};
  //
  //         this.changeElementPosition(element, p);
  //         this.moveToPosition(p);
  //       } else {
  //         const p = {row: 0, page: page - 1};
  //
  //         this.changeElementPosition(element, p);
  //         this.moveToPosition(p);
  //       }
  //       this.decreaseRows(page);
      } else {
        this.cantMoveUp = true;
        // const p = {row: 0, page: page};
        // this.currantPage = page;
        // this.moveToPosition(p);
      }
    } else {
      const p1 = {row: row, page: page};
      const p2 = {row: row - 1, page: page};
      this.switchTowPositions(p1, p2);
  //     this.moveToPosition(p2);
  //     this.currentPage = page;
    }
  //
  //   this.sortElements();
  //   this.applyCurrentPageElements();
  }

  private switchTowPositions(p1: { row: number; page: number },
                             p2: { row: number; page: number }) {
    const e1 = this.getElementAtPosition(p1);
    const e2 = this.getElementAtPosition(p2);
    this.changeElementPosition(e2, {row: -1, page: -1});//???
    this.changeElementPosition(e1, p2);
    this.changeElementPosition(e2, p1);
  }

  private getElementAtPosition(p: { row: number; page: number }): Element {
    const page = this.pagesMap.get(p.page);
    if (page) {
      return page.elements.find(e => e.row === p.row);
    }
    return null;
  }

  private changeElementPosition(element: Element,
                                p: { row: number; page: number }) {
    // ??? {row: -1, page: -1}
    if (element.page === p.page) {
      this.pagesMap.get(element.page).elements.find(e => e.row === element.row).row = p.row;
    } else {
      this.pagesMap.get(element.page).elements = this.pagesMap.get(element.page).elements.filter(e => e.row !== element.row);
      if (this.pagesMap.get(p.page)) {
        element.row = p.row;
        element.page = p.page;
        this.pagesMap.get(p.page).elements.push(element);
      }
    }

    // this.document.elements
    //   .filter(elt => elt.row === element.row && elt.page === element.page)
    //   .map(elt => {
    //     elt.row = p.row;
    //     elt.page = p.page;
    //     return elt;
    //   });
  }

  private moveToPosition(p?: { row: number; page: number }) {
    if (p) {
      this.movedItem = {
        row: p.row,
        page: p.page
      };
    } else {
      this.movedItem = {
        row: -1,
        page: -1
      };
    }
  }

  private buildWrapper(document: Document) {
    this.pagesMap = new Map();
    if (document && document.elements && document.elements.length) {
      document.elements.forEach(element => {
        const page = this.pagesMap.get(element.page);
        if (!page) {
          this.pagesMap.set(element.page, new Page([element]));
        } else {
          page.elements.push(element);
        }
      });
    }
  }

  private sortPagesElements() {
    if (this.pagesMap) {
      Array.from(this.pagesMap.values())
        .forEach(page => {
          page.elements.sort((e1, e2) => e1.row - e2.row);
        });
    }
  }
}


export class Page {
  constructor(public elements?: Element[]) {}
}

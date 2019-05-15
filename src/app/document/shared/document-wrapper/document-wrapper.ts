import {Element} from '../model/element.model';
import {Document} from '../model/document.model';

export class DocumentWrapper {

  movedItem = {
    page: -1,
    row: -1
  };

  private cantMoveUp = false;
  private elements: Element[];
  private _currentPage = 0;
  private _currentPageElements = [];

  constructor(doc: Document) {
    this.buildWrapper(doc ? doc.elements : []);
  }

  buildWrapper(elements: Element[]) {
    this.elements = elements || [];
    this.applyCurrentPageElements();
  }

  get currentPage() {
    if (this._currentPage > this.biggerPageIndex) {
      this._currentPage = this.biggerPageIndex;
    }
    return this._currentPage;
  }

  get biggerPageIndex() {
    return this.elements && this.elements.length && this.elements.sort((e1, e2) => e2.page - e1.page)[0].page;
  }

  get currentPageElements() {
    return this._currentPageElements || [];
  }

  canReturnToPreviousPage() {
    return !!(this.currentPage > 0);
  }

  returnToPreviousPage() {
    this._currentPage--;
    this.applyCurrentPageElements();
  }

  canGoToNextPage() {
    return (
      this.elements &&
      this.elements.some(element => element.page > this.currentPage)
    );
  }

  goToNextPage() {
    this._currentPage++;
    this.applyCurrentPageElements();
  }

  insertPage() {
    this._currentPage++;
    this.shiftPagesRight(this.currentPage);
    this.sortElements();
    this.applyCurrentPageElements();
  }

  applyCurrentPageElements() {
    this.sortElements();
    if (this.elements) {
      this._currentPageElements = this.elements.filter(
        element => element.page === this.currentPage
      );
    }
  }

  deleteElement(element: Element) {
    this.elements = this.elements
      .filter(elt => elt.row !== element.row || elt.page !== element.page)
      .map(elt => {
        if (elt.row > element.row && elt.page === element.page) {
          elt.row--;
        }
        return elt;
      });
    if (
      this.movedItem.row === element.row &&
      this.movedItem.page === element.page
    ) {
      this.moveToPosition();
    }
    this._currentPage = element.page;
    this.applyCurrentPageElements();
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

  moveUp(element) {
    const [row, page] = [element.row, element.page];

    const isTheFirst = !this.elements.some(
      elt => elt.page === page && elt.row < row
    );

    if (isTheFirst) {
      if (page > 0) {
        this._currentPage = page - 1;
        const biggestRow = this.getBiggestRow(page - 1);
        if (biggestRow >= 0) {
          const p = {row: biggestRow + 1, page: page - 1};

          this.changeElementPosition(element, p);
          this.moveToPosition(p);
        } else {
          const p = {row: 0, page: page - 1};

          this.changeElementPosition(element, p);
          this.moveToPosition(p);
        }
        this.decreaseRows(page);
      } else {
        this.cantMoveUp = true;
        this._currentPage = page;
        const p = {row: 0, page: page};
        this.moveToPosition(p);
      }
    } else {
      const p1 = {row: row, page: page};
      const p2 = {row: row - 1, page: page};
      this.switchTowPositions(p1, p2);
      this.moveToPosition(p2);
      this._currentPage = page;
    }

    this.sortElements();
    this.applyCurrentPageElements();
  }

  moveDown(element) {
    const [row, page] = [element.row, element.page];

    const isTheLast = !this.elements.some(
      elt => elt.page === page && elt.row > row
    );

    if (isTheLast) {
      this._currentPage = page + 1;
      this.increaseRows(page + 1);
      const p = {row: 0, page: page + 1};

      this.changeElementPosition(element, p);
      this.moveToPosition(p);
    } else {
      const p1 = {row: row, page: page};
      const p2 = {row: row + 1, page: page};
      this.switchTowPositions(p1, p2);
      this.moveToPosition(p2);
      this._currentPage = page;
    }

    this.cantMoveUp = false;

    this.sortElements();
    this.applyCurrentPageElements();
  }

  getElementAtPosition(p: { row: number; page: number }): Element {
    const elts = this.elements.filter(
      elt => elt.row === p.row && elt.page === p.page
    );
    return elts && elts.length === 1 ? elts[0] : null;
  }

  isLastElement(element) {
    const biggestRow = this.getBiggestRow(this.currentPage);
    if (element.row === biggestRow) {
      return true;
    }
    return false;
  }

  moveToNewPage(element) {
    const page = element.page;
    this.shiftPagesRight(page + 1);
    const p = {
      row: 0,
      page: page + 1
    };
    this.changeElementPosition(element, p);
    this._currentPage = page + 1;
    this.sortElements();
    this.applyCurrentPageElements();
  }

  saveElement(element: Element) {
    if (element.row === -1) {
      const row = this.getBiggestRow(this.currentPage) + 1;
      element.row = row;
      element.page = this.currentPage;
      this.elements.push(element);
    } else {
      this.elements
        .filter(elt => elt.row === element.row && elt.page === element.page)
        .map(elt => {
          elt.type = element.type;
          elt.text = element.text;
          return elt;
        });
    }
    this.applyCurrentPageElements();
  }

  applyWrapperElements(doc: Document) {
    doc.elements = this.elements;
  }

  private shiftPagesRight(page) {
    this.elements = this.elements.map(element => {
      if (element.page >= page) {
        element.page++;
      }
      return element;
    });
  }

  private sortElements() {
    if (this.elements) {
      this.elements.sort((e1, e2) => e1.row - e2.row);
    }
  }

  private getBiggestRow(page): number {
    const elts = this.elements.filter(elt => elt.page === page);
    return elts && elts.length > 0 ? Math.max(...elts.map(elt => elt.row)) : -1;
  }

  private switchTowPositions(p1: { row: number; page: number },
                             p2: { row: number; page: number }) {
    const e1 = this.getElementAtPosition(p1);
    const e2 = this.getElementAtPosition(p2);
    this.changeElementPosition(e2, {row: -1, page: -1});
    this.changeElementPosition(e1, p2);
    this.changeElementPosition(e2, p1);
  }

  private increaseRows(page: number) {
    this.elements
      .filter(elt => elt.page === page)
      .map(elt => {
        elt.row++;
        return elt;
      });
  }

  private decreaseRows(page) {
    this.elements
      .filter(elt => elt.page === page)
      .map(elt => {
        elt.row--;
        return elt;
      });
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

  private changeElementPosition(element: Element,
                                p: { row: number; page: number }) {
    this.elements
      .filter(elt => elt.row === element.row && elt.page === element.page)
      .map(elt => {
        elt.row = p.row;
        elt.page = p.page;
        return elt;
      });
  }
}

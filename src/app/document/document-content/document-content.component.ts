import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {ElementType} from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css']
})
export class DocumentContentComponent implements OnInit, OnChanges {
  @Input() document: Document;
  ElementType = ElementType;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() editElementChange = new EventEmitter<Element>();
  changedElements = [];
  currentPage = 0;
  currentPageElements = [];
  movedItem = {
    page: -1,
    row: -1
  };
  @Input() shouldCancelChanges = false;
  @Input() newOrEditElement: Element;
  cantMoveUp = false;

  constructor(
    private documentService: DocumentService,
    private appSnackbarService: AppSnackbarService
  ) {}

  ngOnInit() {
    this.applyCurrentPageElements();
  }

  isNextPage(): boolean {
    return (
      this.document &&
      this.document.elements &&
      this.document.elements.some(element => element.page > this.currentPage)
    );
  }

  nextPage() {
    this.currentPage++;
    this.applyCurrentPageElements();
  }

  lastPage() {
    this.currentPage--;
    this.applyCurrentPageElements();
  }

  getRows(text) {
    return text.split(/\r*\n/).length;
  }

  applyCurrentPageElements() {
    this.sortElements();
    if (this.document && this.document.elements) {
      this.currentPageElements = this.document.elements.filter(
        element => element.page === this.currentPage
      );
    }
  }

  editElement(element) {
    this.markAsChangedElement(element);
    this.editElementChange.emit(element);
  }

  deleteElement(element) {
    this.document.elements = this.document.elements
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
    this.currentPage = element.page;
    this.applyCurrentPageElements();
  }

  saveElement() {
    this.changedElements = [];
    this.documentService.saveDocument(this.document).subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
      this.loadDocument();
    });
  }

  loadDocument() {
    this.documentService.getDocument(this.document.id).subscribe(document => {
      this.document = document;
    });
  }

  cancel() {
    this.cancelChanges();
    this.editModeChange.emit(false);
  }

  moveElement(element) {
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

    const isTheFirst = !this.document.elements.some(
      elt => elt.page === page && elt.row < row
    );

    if (isTheFirst) {
      if (page > 0) {
        this.currentPage = page - 1;
        const biggestRow = this.getBiggestRow(page - 1);
        if (biggestRow >= 0) {
          const p = { row: biggestRow + 1, page: page - 1 };

          this.changeElementPosition(element, p);
          this.moveToPosition(p);
        } else {
          const p = { row: 0, page: page - 1 };

          this.changeElementPosition(element, p);
          this.moveToPosition(p);
        }
        this.decreaseRows(page);
      } else {
        this.cantMoveUp = true;
        this.currentPage = page;
        const p = { row: 0, page: page };
        this.moveToPosition(p);
      }
    } else {
      const p1 = { row: row, page: page };
      const p2 = { row: row - 1, page: page };
      this.switchTowPositions(p1, p2);
      this.moveToPosition(p2);
      this.currentPage = page;
    }

    this.sortElements();
    this.applyCurrentPageElements();
  }

  moveDown(element) {
    const [row, page] = [element.row, element.page];

    const isTheLast = !this.document.elements.some(
      elt => elt.page === page && elt.row > row
    );

    if (isTheLast) {
      this.currentPage = page + 1;
      this.increaseRows(page + 1);
      const p = { row: 0, page: page + 1 };

      this.changeElementPosition(element, p);
      this.moveToPosition(p);
    } else {
      const p1 = { row: row, page: page };
      const p2 = { row: row + 1, page: page };
      this.switchTowPositions(p1, p2);
      this.moveToPosition(p2);
      this.currentPage = page;
    }

    this.cantMoveUp = false;

    this.sortElements();
    this.applyCurrentPageElements();
  }

  getElementAtPosition(p: { row: number; page: number }): Element {
    const elts = this.document.elements.filter(
      elt => elt.row === p.row && elt.page === p.page
    );
    return elts && elts.length === 1 ? elts[0] : null;
  }

  changeEditMode(){
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
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
    this.currentPage = page + 1;
    this.sortElements();
    this.applyCurrentPageElements();
  }

  private shiftPagesRight(page) {
    this.document.elements = this.document.elements.map(element => {
      if (element.page >= page) {
        element.page++;
      }
      return element;
    });
  }

  private sortElements() {
    if (this.document && this.document.elements) {
      this.document.elements.sort((e1, e2) => e1.row - e2.row);
    }
  }

  private getBiggestRow(page): number {
    const elts = this.document.elements.filter(elt => elt.page === page);
    return elts && elts.length > 0 ? Math.max(...elts.map(elt => elt.row)) : -1;
  }

  private switchTowPositions(
    p1: { row: number; page: number },
    p2: { row: number; page: number }
  ) {
    let e1 = this.getElementAtPosition(p1);
    let e2 = this.getElementAtPosition(p2);
    this.changeElementPosition(e2, { row: -1, page: -1 });
    this.changeElementPosition(e1, p2);
    this.changeElementPosition(e2, p1);
  }

  private increaseRows(page: number) {
    this.document.elements
      .filter(elt => elt.page === page)
      .map(elt => {
        elt.row++;
        return elt;
      });
  }

  private decreaseRows(page) {
    this.document.elements
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

  private markAsChangedElement(element: Element) {
    if (element.id) {
      const isExisting = this.changedElements.some(
        elt => elt.id === element.id
      );
      if (!isExisting) {
        this.changedElements.push(Object.assign({}, element));
      }
    }
  }

  private cancelChanges() {
    this.document.elements = this.document.elements
      .filter(elt => elt.id)
      .map(element => {
        const foundElement = this.changedElements.find(
          elt => elt.id === element.id
        );
        return foundElement ? foundElement : element;
      });
    this.changedElements = [];
    this.applyCurrentPageElements();
    this.moveToPosition();
  }

  private changeElementPosition(
    element: Element,
    p: { row: number; page: number }
  ) {
    this.document.elements
      .filter(elt => elt.row === element.row && elt.page === element.page)
      .map(elt => {
        elt.row = p.row;
        elt.page = p.page;
        return elt;
      });
  }

  ngOnChanges(changes) {
    if (changes.newOrEditElement) {
      if (this.newOrEditElement && this.newOrEditElement.row === -1) {
        const row = this.getBiggestRow(this.currentPage) + 1;
        this.newOrEditElement.row = row;
        this.newOrEditElement.page = this.currentPage;
        this.document.elements.push(this.newOrEditElement);
        this.newOrEditElement = null;
        this.applyCurrentPageElements();
      }
    } else if (changes.shouldCancelChanges) {
      //this.editedElementRow = -1;
      // this.movedItem = {
      //   page: -1,
      //   row: -1
      // };
    }
  }
}

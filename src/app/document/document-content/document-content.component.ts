import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";

import { Document } from "../shared/document.model";
import { Element } from "../shared/element.model";
import { ElementType } from "../shared/element-type";
import { DocumentService } from "../shared/document.service";
import { AppSnackbarService } from "../../shared/app-snackbar.service";

@Component({
  selector: "app-document-content",
  templateUrl: "./document-content.component.html",
  styleUrls: ["./document-content.component.css"]
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
  editedElementRow = -1;
  @Input() shouldCancelChanges = false;
  @Input() newOrEditElement: Element;
  cantMoveUp = false;

  constructor(
    private documentService: DocumentService,
    private appSnackbarService: AppSnackbarService
  ) {}

  ngOnInit() {
    this.sortElements();
    this.applyCurrentPageElements();
  }

  applyCurrentPageElements() {
    this.currentPageElements = this.document.elements.filter(
      element => element.page === this.currentPage
    );
  }

  isNextPage(): boolean {
    return this.document.elements.some(
      element => element.page > this.currentPage
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

  editElement(element) {
    this.markAsChangedElement(element);
    this.editElementChange.emit(element);
  }

  moveElement(element) {
    if (this.editedElementRow >= 0) {
      this.editedElementRow = -1;
    } else {
      this.editedElementRow = element.row;
    }
  }

  sortElements() {
    this.document.elements.sort((e1, e2) => e1.row - e2.row);
  }

  getRows(text) {
    return text.split(/\r*\n/).length;
  }

  save() {
    this.changedElements = [];
    this.documentService.saveDocument(this.document).subscribe(res => {
      this.appSnackbarService.openSnackBar("Success!: Document Saved", "save");
      this.loadDocument();
    });
  }

  loadDocument() {
    this.documentService.getDocument(this.document.id).subscribe(document => {
      this.document = document;
    });
  }

  getBiggestRow(page): number {
    const samePageElements = this.document.elements
      .filter(elt => elt.page === page)
      .sort((e1, e2) => e1.row - e2.row);
    return samePageElements.length > 0
      ? samePageElements[samePageElements.length - 1].row
      : 0;
  }

  moveUp(element) {
    const index = this.document.elements.indexOf(element);
    const isTheFirst = !this.document.elements.some(
      elt => elt.page === element.page && elt.row < element.row
    );
    if (isTheFirst) {
      if (this.currentPage > 0) {
        this.currentPage--;
        const samePageElements = this.document.elements
          .filter(elt => elt.page === element.page)
          .sort((e1, e2) => e1.row - e2.row);
        const row = this.getBiggestRow(element.page) + 1;
        this.document.elements[index].row = row;
        this.document.elements[index].page--;
        this.editedElementRow = row;
      } else {
        this.cantMoveUp = true;
      }
    } else {
      this.editedElementRow--;
      this.document.elements[index].row--;
      this.document.elements[index - 1].row++;
    }
    this.sortElements();
    this.applyCurrentPageElements();
  }

  moveDown(element) {
    const index = this.document.elements.indexOf(element);
    const isTheLast = !this.document.elements.some(
      elt => elt.page === element.page && elt.row > element.row
    );
    if (isTheLast) {
      this.document.elements[index].row = 0;
      this.document.elements[index].page++;
      this.currentPage++;
      this.editedElementRow = 0;
    } else {
      this.editedElementRow++;
      this.document.elements[index].row++;
      this.document.elements[index + 1].row--;
    }

    this.cantMoveUp = false;

    this.sortElements();
    this.applyCurrentPageElements();
  }

  deleteElement(element) {
    this.document.elements = this.document.elements
      .filter(elt => elt.row !== element.row)
      .map(elt => {
        if (elt.row > element.row) {
          elt.row--;
        }
        return elt;
      });
    this.applyCurrentPageElements();
  }

  cancel() {
    this.cancelChanges();
    this.editModeChange.emit(false);
  }

  markAsChangedElement(element: Element) {
    if (element.id) {
      const isExisting = this.changedElements.some(
        elt => elt.id === element.id
      );
      if (!isExisting) {
        this.changedElements.push(Object.assign({}, element));
      }
    }
  }

  cancelChanges() {
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
    this.editedElementRow = -1;
  }

  ngOnChanges(changes) {
    if (changes.newOrEditElement) {
      if (this.newOrEditElement && this.newOrEditElement.row === -1) {
        const row = this.getBiggestRow(this.currentPage) + 1;
        this.newOrEditElement.row = row;
        this.newOrEditElement.page = this.currentPage;
        this.document.elements.push(this.newOrEditElement);
        this.newOrEditElement = null;
        this.sortElements();
        this.applyCurrentPageElements();
      }
    } else if (changes.shouldCancelChanges) {
      this.editedElementRow = -1;
    }
  }
}

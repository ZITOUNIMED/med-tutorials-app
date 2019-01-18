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
  maxElementsPerPage = 3;
  currentPage = 0;
  currentPageElements = [];
  editedElementRow = -1;
  @Input() shouldCancelChanges = false;
  @Input() newOrEditElement: Element;

  constructor(
    private documentService: DocumentService,
    private appSnackbarService: AppSnackbarService
  ) {}

  ngOnInit() {
    this.sortElements();
    this.applyCurrentPageElements();
  }

  applyCurrentPageElements() {
    const from = this.maxElementsPerPage * this.currentPage;
    const to = this.maxElementsPerPage * (this.currentPage + 1);
    if (to >= from && from >= 0) {
      this.currentPageElements = this.document.elements.slice(from, to);
    }
  }

  get totalPages() {
    if (this.maxElementsPerPage > 0) {
      let nbr = this.document.elements.length / this.maxElementsPerPage;
      let integr = parseInt("" + nbr);
      if (this.document.elements.length % this.maxElementsPerPage > 0) {
        integr++;
      }
      return integr;
    }
    return -1;
  }

  nextPage() {
    if (this.maxElementsPerPage > 0) {
      if (this.currentPage + 1 < this.totalPages) {
        this.currentPage++;
        this.applyCurrentPageElements();
      }
    }
  }

  lastPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyCurrentPageElements();
    }
  }

  editElement(element) {
    this.editedElementRow = element.row;
    this.markAsChangedElement(element);
    this.editElementChange.emit(element);
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

  moveUp(element) {
    const index = this.document.elements.indexOf(element);
    if (index >= 1) {
      this.editedElementRow--;
      this.document.elements[index].row--;
      this.document.elements[index - 1].row++;
      if (
        this.document.elements[index].row + 1 ==
        this.currentPage * this.maxElementsPerPage
      ) {
        this.currentPage--;
      }
      this.sortElements();
      this.applyCurrentPageElements();
    }
  }

  moveDown(element) {
    const index = this.document.elements.indexOf(element);
    if (index < this.document.elements.length - 1) {
      this.editedElementRow++;
      this.document.elements[index].row++;
      this.document.elements[index + 1].row--;
      if (
        this.document.elements[index].row ==
        (this.currentPage + 1) * this.maxElementsPerPage
      ) {
        this.currentPage++;
      }
      this.sortElements();
      this.applyCurrentPageElements();
    }
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
        const row =
          this.currentPageElements[this.currentPageElements.length - 1].row + 1;
        this.document.elements.push(this.newOrEditElement);
        this.document.elements = this.document.elements.map(elt => {
          if (elt.row === -1) {
            elt.row = row;
          } else if (elt.row >= row) {
            elt.row++;
          }
          return elt;
        });
        if (this.currentPageElements.length === this.maxElementsPerPage) {
          this.currentPage++;
        }
        this.sortElements();
        this.applyCurrentPageElements();
        this.newOrEditElement = null;
      }
    } else if (changes.shouldCancelChanges) {
      this.editedElementRow = -1;
    }
  }
}

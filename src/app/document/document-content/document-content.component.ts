import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Document } from "../shared/document.model";
import { ElementType } from "../shared/element-type";

@Component({
  selector: "app-document-content",
  templateUrl: "./document-content.component.html",
  styleUrls: ["./document-content.component.css"]
})
export class DocumentContentComponent implements OnInit {
  @Input() document: Document;
  ElementType = ElementType;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() editElementChange = new EventEmitter<Element>();
  @Output() saveDocumentChange = new EventEmitter<Document>();
  changedElements = [];

  constructor() {}

  ngOnInit() {
    this.sortElements();
  }

  editElement(element) {
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
    this.saveDocumentChange.emit(this.document);
  }

  moveUp(element) {
    const index = this.document.elements.indexOf(element);
    if (index >= 1) {
      this.document.elements[index].row--;
      this.document.elements[index - 1].row++;
      this.sortElements();
    }
  }

  moveDown(element) {
    const index = this.document.elements.indexOf(element);
    if (index < this.document.elements.length - 1) {
      this.document.elements[index].row++;
      this.document.elements[index + 1].row--;
      this.sortElements();
    }
  }

  deleteElement(element) {
    const index = this.document.elements.indexOf(element);
    this.document.elements.splice(index, 1);
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
  }
}

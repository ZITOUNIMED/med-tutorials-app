import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Document } from "../shared/document.model";
import { Element } from "../shared/element.model";

@Component({
  selector: "app-document-sheet",
  templateUrl: "./document-sheet.component.html",
  styleUrls: ["./document-sheet.component.css"]
})
export class DocumentSheetComponent implements OnInit {
  @Input() document: Document;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  editMode = false;
  element: Element;
  newOrEditElement: Element;
  shouldCancelChanges = true;

  constructor(  ) {}

  ngOnInit() {}

  onSubmit(element) {
    this.newOrEditElement = element;
  }

  onEditElementChange(element) {
    this.element = element;
  }

  onEditModeChange(editMode) {
    this.editMode = editMode;
  }

  onCancelChange(cancel){
    this.shouldCancelChanges = cancel;
  }
}

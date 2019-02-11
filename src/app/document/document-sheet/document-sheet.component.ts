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

  get options() {
    return {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      headers: [],
      showTitle: true,
      title: this.document.name,
      useBom: false,
      removeNewLines: true,
      keys: ['type','text','row', 'page' ]
    };
  }

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

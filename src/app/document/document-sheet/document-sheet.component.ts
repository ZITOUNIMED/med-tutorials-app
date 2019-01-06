import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '../shared/document.model';
import { Element } from '../shared/element.model';

@Component({
  selector: 'app-document-sheet',
  templateUrl: './document-sheet.component.html',
  styleUrls: ['./document-sheet.component.css']
})
export class DocumentSheetComponent implements OnInit {

  @Input() document: Document;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  editMode= false;

  element: Element;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(element) {
    if(!this.document.elements){
      this.document.elements = [];
    }

    if(element.id){
      this.document.elements.map(elt => {
        if(elt.id === element.id) {
          elt = element;
        }
        return elt;
      });
    } else {
      element.row = this.document.elements.length;
      this.document.elements.push(element);
    }
  }

  onEditElementChange(element){
    this.element = element;
  }

  onEditModeChange(editMode){
    this.editMode = editMode;
  }

  activeEditMode(){
    this.editMode = true;
  }

}

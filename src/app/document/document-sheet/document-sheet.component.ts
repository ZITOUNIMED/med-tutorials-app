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

  element: Element;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(element) {
    if(!this.document.elements){
      this.document.elements = [];
    }
    
    this.document.elements.push(element);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '../shared/document.model';
import { Element } from '../shared/element.model';
import { DocumentService } from '../shared/document.service';
import { AppSnackbarService } from '../../shared/app-snackbar.service';

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

  constructor(private documentService: DocumentService,
  private appSnackbarService: AppSnackbarService) { }

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

  onSaveDocumentChange(document){
    this.documentService.saveDocument(document)
    .subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
      this.loadDocument();
    });
  }

  loadDocument(){
    this.documentService.getDocument(this.document.id).subscribe(
      document => {
        this.document = document;
      }
    );
  }

  activeEditMode(){
    this.editMode = true;
  }

}

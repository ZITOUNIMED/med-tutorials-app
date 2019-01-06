import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '../shared/document.model';
import { ElementType } from '../shared/element-type';
import { DocumentService } from '../shared/document.service';
import { AppSnackbarService } from '../../shared/app-snackbar.service';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css']
})
export class DocumentContentComponent implements OnInit {

  @Input() document: Document;
  ElementType = ElementType;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() editElementChange = new EventEmitter<Element>();

  constructor(private documentService: DocumentService,
  private appSnackbarService: AppSnackbarService) { }

  ngOnInit() {
    this.sortElements();
  }

  editElement(element){
    this.editElementChange.emit(element);
  }

  sortElements(){
    this.document.elements.sort((e1, e2) => e1.row - e2.row);
  }

  getRows(text){
    return text.split(/\r*\n/).length;
  }

  save(){
    this.documentService.saveDocument(this.document)
    .subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
      this.editModeChange.emit(false);
    });
  }

  moveUp(element){
    const index = this.document.elements.indexOf(element);
    if(index>=1){
      this.document.elements[index].row--;
      this.document.elements[index-1].row++;
      this.sortElements();
    }
  }

  moveDown(element){
    const index = this.document.elements.indexOf(element);
    if(index<(this.document.elements.length-1)){
      this.document.elements[index].row++;
      this.document.elements[index+1].row--;
      this.sortElements();
    }
  }

  deleteElement(element){
    const index = this.document.elements.indexOf(element);
    this.document.elements.splice(index, 1);
  }

  cancel(){
    this.editModeChange.emit(false);
  }
}

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

  constructor(private documentService: DocumentService,
  private appSnackbarService: AppSnackbarService) { }

  ngOnInit() {
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
}

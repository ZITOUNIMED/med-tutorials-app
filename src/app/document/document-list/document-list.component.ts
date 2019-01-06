import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DocumentService } from '../shared/document.service';
import { AppSnackbarService } from '../../shared/app-snackbar.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];
  @Output() selectDocument = new EventEmitter<number>();
  @Output() documentDeleted = new EventEmitter<boolean>();
  @Output() renameDocumentChange = new EventEmitter<Document>();

  constructor(private documentService: DocumentService,
  private appSnackbarService: AppSnackbarService) { }

  ngOnInit() {
  }

  onSelectDocument(id){
    this.selectDocument.emit(id);
  }

  deleteDocument(id){
    this.documentService.deleteDocument(id)
    .subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Document Deleted', 'delete');
      this.documentDeleted.emit(true);
    });
  }

  renameDocument(document){
    this.renameDocumentChange.emit(document);
  }

}

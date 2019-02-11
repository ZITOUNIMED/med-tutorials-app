import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';

import { DocumentService } from '../shared/document.service';
import { AppSnackbarService } from '../../shared/app-snackbar.service';
import { GenerecDialogComponent } from '../../generec-dialog/generec-dialog.component';
import { Document } from '../../shared/document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  @Input() documents: Document[] = [];
  @Output() selectDocument = new EventEmitter<number>();
  @Output() documentDeleted = new EventEmitter<boolean>();
  @Output() renameDocumentChange = new EventEmitter<Document>();

  constructor(private documentService: DocumentService,
  private appSnackbarService: AppSnackbarService,
  private dialog: MatDialog) { }

  onSelectDocument(id){
    this.selectDocument.emit(id);
  }

  openDialogDeleteDocument(document: Document){
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
     width: '350px',
     data: {title: 'Delete Document', message: "Do you want to delete the document: " + document.name +" ?"}
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result){
       this.deleteDocument(document.id);
     }
   });
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

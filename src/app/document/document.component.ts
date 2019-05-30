import {Component, OnInit} from '@angular/core';
import {Document} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {CreateUpdateDocumentComponent} from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from './shared/modal/import-document-file/import-document-file.component';
import {AppStoreService} from '../shared/service/app.store.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documents: Document[] = [];

  constructor(private documentService: DocumentService,
              public dialog: MatDialog,
              private appSnackbarService: AppSnackbarService,
              private appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.loadDocuments();
  }

  openCreateDocumentDialog() {
    const dialogRef = this.dialog.open(CreateUpdateDocumentComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.saveNewDocument(name);
      }
    });
  }

  openImportDocumentFileDialog() {
    const dialogRef = this.dialog.open(ImportDocumentFileComponent);
    dialogRef.afterClosed().subscribe(document => {
      if (document) {
        this.saveDocument(document);
      }
    });
  }

  private saveNewDocument(name: string) {
    const document = {
      id: null,
      name: name,
      elements: [],
      ownerUsername: null,
    } as Document;

    this.saveDocument(document);
  }

  saveDocument(document: Document) {
    this.appStoreService.startLoading();
    this.documentService.saveDocument(document).subscribe(
      () => {
        this.appSnackbarService.openSnackBar('Success!: New Document is added', 'ADD');
        this.loadDocuments();
      },
      error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
      }, () => {
        // this.appStoreService.stopLoading();
      });
  }

  onDocumentAdded() {
    this.loadDocuments();
  }

  onDeleteDocument(deleted) {
    this.loadDocuments();
  }

  loadDocuments() {
    this.appStoreService.startLoading();
    this.documentService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.appSnackbarService.openSnackBar('SUCCESS!: Loading documents', 'LOAD');
    }, () => {
      this.appSnackbarService.openSnackBar('ERROR!: An error was occured on loading documents', 'LOAD');
    }, () => {
      // this.appStoreService.stopLoading();
    });
  }

  onRenameDocumentChange(isChanged: boolean) {
    if (isChanged) {
      this.loadDocuments();
    }
  }
}

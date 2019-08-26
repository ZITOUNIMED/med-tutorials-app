import {Component, OnInit} from '@angular/core';
import {AppDocument} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {CreateUpdateDocumentComponent} from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from './shared/modal/import-document-file/import-document-file.component';
import {AppStoreService} from '../shared/service/app.store.service';
import { User } from '../user/shared/model/user.model';
import {isNotEmptyArray, oc} from '../shared/app-utils';
import { ConfidentialityTypes } from '../permissions/model/confidentiality-types';
import { ActivatedRoute } from '@angular/router';
import { DocumentCollectionTypes } from './shared/document-collection-types';
import { ADMIN_AND_SOURCER_PERMISSIONS } from '../permissions/model/app.permissions.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: AppDocument[] = [];
  user: User;
  DocumentCollectionTypes = DocumentCollectionTypes;
  queryParams: any;

  ADMIN_AND_SOURCER_PERMISSIONS = ADMIN_AND_SOURCER_PERMISSIONS;

  constructor(private documentService: DocumentService,
              public dialog: MatDialog,
              private appSnackbarService: AppSnackbarService,
              private appStoreService: AppStoreService,
              private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.loadDocuments();
    });

    this.appStoreService.getUser()
    .subscribe(user => (this.user = user));
  }

  openCreateDocumentDialog() {
    const dialogRef = this.dialog.open(CreateUpdateDocumentComponent, {
      data: {
        doc: {
          author: this.getUserAuthor(),
        } as AppDocument,
      }
    });
    dialogRef.afterClosed().subscribe((doc: AppDocument) => {
      if (doc) {
        this.saveNewDocument(doc);
      }
    });
  }

  private getUserAuthor() {
    let author = '';
    if (this.user) {
      author = this.user.firstname || '';
      author += this.user.lastname ? ' ' + this.user.lastname : '';
    }

    return author;
  }

  openImportDocumentFileDialog() {
    const dialogRef = this.dialog.open(ImportDocumentFileComponent);
    dialogRef.afterClosed().subscribe(documents => {
      if (isNotEmptyArray(documents)) {
        if (oc(this.user).username) {
          documents.forEach(doc => {
            doc.ownerUsername = this.user.username;
            doc.confidentiality = ConfidentialityTypes.PRIVATE;
          });
          this.saveAllDocuments(documents);
        } else {
          this.appSnackbarService.openSnackBar('INDEFINED!: Username is not defined', 'IMPORT');
        }
      }
    });
  }

  private saveNewDocument(doc: AppDocument) {
    if (oc(this.user).username) {
      doc.ownerUsername = this.user.username;
      this.saveDocument(doc);
    } else {
      this.appSnackbarService.openSnackBar('INDEFINED!: Username is not defined', 'ADD');
    }
  }

  saveDocument(document: AppDocument) {
    this.appStoreService.startLoading();
    this.documentService.saveDocument(document).subscribe(
      () => {
        this.appSnackbarService.openSnackBar('Success!: New Document is added', 'ADD');
        this.appStoreService.stopLoading();
        this.loadDocuments();
      },
      error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
        this.appStoreService.stopLoading();
      });
  }

  saveAllDocuments(documents: AppDocument[]) {
    this.appStoreService.startLoading();
    this.documentService.saveAllDocuments(documents).subscribe(
      () => {
        this.appSnackbarService.openSnackBar('Success!: ' + documents.length + ' new documents were added', 'ADD MUILTIPLE');
        this.appStoreService.stopLoading();
        this.loadDocuments();
      },
      error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
        this.appStoreService.stopLoading();
      });
  }

  onReloadDocument(reload) {
    if(reload){
      this.loadDocuments();
    }
  }

  loadDocuments() {
    this.appStoreService.startLoading();
    const {collectionType, collectionId} = this.queryParams;
    this.documentService.getDocuments(collectionType, collectionId).subscribe(documents => {
      this.documents = documents.sort((d1, d2) => d1.creationDate<d2.creationDate ? 1 : 0);
      this.appSnackbarService.openSnackBar('SUCCESS!: Loading documents', 'LOAD');
      this.appStoreService.stopLoading();
    }, error => {
      this.appStoreService.addErrorNotif(error.status, error.message);
      this.appStoreService.stopLoading();
    });
  }
}

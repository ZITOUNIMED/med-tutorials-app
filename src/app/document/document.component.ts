import {Component, OnInit} from '@angular/core';
import {Document} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {CreateUpdateDocumentComponent} from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from './shared/modal/import-document-file/import-document-file.component';
import {AppStoreService} from '../shared/service/app.store.service';
import { User } from '../user/shared/model/user.model';
import {isNotEmptyArray, oc} from '../shared/app-utils';
import { ConfidentialityTypes } from '../permissions/model/confidentiality-types';
import { UploadService } from '../shared/service/upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];
  user: User;
  width = 500;
  height= 500;
  imageSize= 'meduim';

  selectImageSize(){
    switch(this.imageSize){
      case 'small':
        this.width = 150;
        this.height = 150;
        break;
      case 'meduim':
        this.width = 500;
        this.height= 500;
        break;
      case 'big':
        this.width = 900;
        this.height= 900;
        break;
      default:
        this.width = 500;
        this.height= 500;
    }
  }

  attachments = [];
  selectedFile = null;

  constructor(private documentService: DocumentService,
              public dialog: MatDialog,
              private appSnackbarService: AppSnackbarService,
              private appStoreService: AppStoreService,
              private uploadService: UploadService,
              private sanitizer: DomSanitizer) {
  }

  saveImage(){
    this.uploadService.uploadFile(this.selectedFile, this.width, this.height)
    .subscribe(res => {
      this.loadAttachments();
    })
  }

  get selectedFileUrl() {
    return this.selectedFile && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile)) || '';
  }

  onFileChange($event){
    const files = $event.srcElement.files;
    if (oc(files).length) {
      const file = files[0];
      this.selectedFile = file;
    }
  }

  private loadAttachments(){
    this.uploadService.findAll().subscribe(list => {
      this.attachments = list;
    });
  }



  ngOnInit() {
    this.loadDocuments();
    this.loadAttachments();
    this.appStoreService.getUser()
    .subscribe(user => (this.user = user));
  }

  openCreateDocumentDialog() {
    const dialogRef = this.dialog.open(CreateUpdateDocumentComponent, {
      data: {
        doc: {
          author: this.getUserAuthor(),
        } as Document,
      }
    });
    dialogRef.afterClosed().subscribe((doc: Document) => {
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

  private saveNewDocument(doc: Document) {
    if (oc(this.user).username) {
      doc.ownerUsername = this.user.username;
      this.saveDocument(doc);
    } else {
      this.appSnackbarService.openSnackBar('INDEFINED!: Username is not defined', 'ADD');
    }
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
        this.appStoreService.stopLoading();
      });
  }

  saveAllDocuments(documents: Document[]) {
    this.appStoreService.startLoading();
    this.documentService.saveAllDocuments(documents).subscribe(
      () => {
        this.appSnackbarService.openSnackBar('Success!: ' + documents.length + ' new documents were added', 'ADD MUILTIPLE');
        this.loadDocuments();
      },
      error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
      });
  }

  onDocumentAdded() {
    this.loadDocuments();
  }

  onDeleteDocument(deleted) {
    this.loadDocuments();
  }

  loadDocuments() {
    this.appStoreService.startLoading('load documents');
    this.documentService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.appSnackbarService.openSnackBar('SUCCESS!: Loading documents', 'LOAD');
    }, () => {
      this.appSnackbarService.openSnackBar('ERROR!: An error was occured on loading documents', 'LOAD');
    }, () => {
      this.appStoreService.stopLoading('load documents');
    });
  }

  onRenameDocumentChange(isChanged: boolean) {
    if (isChanged) {
      this.loadDocuments();
    }
  }
}

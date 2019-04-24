import {Component, OnInit} from '@angular/core';
import {Document} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {Store} from '@ngrx/store';
import {StartLoadingAction, StopLoadingAction} from '../shared/loading.actions';
import {LoadingState} from '../shared/loading.state';
import { CreateUpdateDocumentComponent } from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from "./shared/modal/import-document-file/import-document-file.component";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documents: Document[] = [];
  document: Document;

  constructor(private documentService: DocumentService,
              public dialog: MatDialog,
              private appSnackbarService: AppSnackbarService,
              private store: Store<LoadingState>) { }

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

  private saveNewDocument(name) {
    const document = {
      id: null,
      name: name,
      elements: []
    } as Document;

    this.saveDocument(document);
  }

  saveDocument(document: Document) {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.saveDocument(document).subscribe(
      res => {
        this.appSnackbarService.openSnackBar('Success!: New Document is added', 'ADD');
        this.loadDocuments();
      },
      error => {
        this.appSnackbarService.openSnackBar('ERROR!: An error was occured on creating document', 'ADD');
        this.store.dispatch(new StopLoadingAction());
      }
    );
  }

  onDocumentAdded(added) {
    this.loadDocuments();
  }

  onDeleteDocument(deleted) {
    this.loadDocuments();
  }

  loadDocuments() {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.store.dispatch(new StopLoadingAction());
    }, error => {
      this.appSnackbarService.openSnackBar('ERROR!: An error was occured on loading documents', 'LOAD');
      this.store.dispatch(new StopLoadingAction());
    });
  }

  onRenameDocumentChange(isChanged) {
    if (isChanged) {
      this.loadDocuments();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Document} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {CreateUpdateDocumentModalComponent} from './shared/modal/create-update-document-modal/create-update-document-modal.component';
import {Store} from "@ngrx/store";
import {StopLoadingAction} from "../shared/stop-loading.action";
import {StartLoadingAction} from "../shared/start-loading.action";
import {LoadingState} from '../shared/loading.state';

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
    const dialogRef = this.dialog.open(CreateUpdateDocumentModalComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.saveNewDocument(name);
      }
    });
  }

  private saveNewDocument(name) {
    const document = {
      id: null,
      name: name,
      elements: []
    } as Document;

    this.documentService.saveDocument(document).subscribe(
      res => {
        this.appSnackbarService.openSnackBar('Success!: New Document is added', 'ADD');
        this.loadDocuments();
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
    });
  }

  onRenameDocumentChange(isChanged) {
    if (isChanged) {
      this.loadDocuments();
    }
  }
}

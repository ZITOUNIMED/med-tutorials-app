import {Component, OnInit} from '@angular/core';
import {Document} from './shared/model/document.model';
import {DocumentService} from './shared/service/document.service';
import {MatDialog} from '@angular/material';
import {AppSnackbarService} from '../shared/app-snackbar.service';
import {Store} from '@ngrx/store';
import {StartLoadingAction, StopLoadingAction} from '../shared/loading.actions';
import { CreateUpdateDocumentComponent } from './shared/modal/create-update-document/create-update-document.component';
import {ImportDocumentFileComponent} from './shared/modal/import-document-file/import-document-file.component';
import { AppState } from '../shared/app.state';
import { UserService } from '../user/shared/service/user.service';
import { combineLatest } from 'rxjs';
import { User } from '../user/shared/model/user.model';
import { UserSaveAction } from '../user/shared/user.actions';
import { AppStoreService } from '../shared/service/app.store.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documents: Document[] = [];
  document: Document;
  user: User;

  constructor(private documentService: DocumentService,
              public dialog: MatDialog,
              private appSnackbarService: AppSnackbarService,
              private store: Store<AppState>,
              private userService: UserService,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    combineLatest(
      this.store.select('userState'),
      this.store.select('principalState')).subscribe(([userState, principalState]) => {
        if (!userState || !userState.user) {
          if (principalState && principalState.principal) {
            this.loadUser(principalState.principal.username);
          }
        } else {
          this.user = userState.user;
        }
        this.loadDocuments();
    });
  }

  loadUser(username: string) {
    this.userService.findByUsername(username)
      .subscribe(user => {
        this.user = user;
        this.store.dispatch(new UserSaveAction(user));
      }, error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
      });
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
      owner: null,
    } as Document;

    this.saveDocument(document);
  }

  saveDocument(document: Document) {
    if (document) {
      document.owner = this.user;
    }
    this.store.dispatch(new StartLoadingAction());
    this.documentService.saveDocument(document).subscribe(
      () => {
        this.appSnackbarService.openSnackBar('Success!: New Document is added', 'ADD');
        this.loadDocuments();
      },
      error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
        this.store.dispatch(new StopLoadingAction());
      }
    );
  }

  onDocumentAdded() {
    this.loadDocuments();
  }

  onDeleteDocument(deleted) {
    this.loadDocuments();
  }

  loadDocuments() {
    if (this.user && this.user.username) {
    this.store.dispatch(new StartLoadingAction());

    this.documentService.findByOwnerUsername(this.user.username).subscribe(documents => {
      this.documents = documents;
      this.store.dispatch(new StopLoadingAction());
    }, () => {
      this.appSnackbarService.openSnackBar('ERROR!: An error was occured on loading documents', 'LOAD');
      this.store.dispatch(new StopLoadingAction());
    });
    }
  }

  onRenameDocumentChange(isChanged: boolean) {
    if (isChanged) {
      this.loadDocuments();
    }
  }
}

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {GenerecDialogComponent} from '../../generec-dialog/generec-dialog.component';
import {Document} from '../shared/model/document.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import { CreateUpdateDocumentComponent } from '../shared/modal/create-update-document/create-update-document.component';
import { AppPermissions } from 'src/app/permissions/model/app.permissions.model';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';
import { oc } from 'src/app/shared/app-utils';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];
  @Output() documentDeleted = new EventEmitter<boolean>();
  @Output() renameDocumentChange = new EventEmitter<boolean>();
  searchDocumentControl: FormControl;
  filteredDocuments: Observable<Document[]>;
  ConfidentialityTypes = ConfidentialityTypes;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              private dialog: MatDialog,
              private router: Router, ) {
  }

  ngOnInit() {
    this.searchDocumentControl = new FormControl();

    this.filteredDocuments = this.searchDocumentControl.valueChanges
      .pipe(
        startWith<string | Document>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.documents.slice())
      );
  }

  private _filter(name: string) {
    const filterValue = name.toLocaleUpperCase();
    return this.documents.filter(document => document.name.toLocaleUpperCase().indexOf(filterValue) === 0);
  }

  onOpenDocument(document: Document) {
    this.router.navigate(['/home', {outlets: { homeOutlet: `document/${document.id}`}}]);
  }

  openDialogDeleteDocument(document: Document) {
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
      width: '350px',
      data: {title: 'Delete Document', message: 'Do you want to delete the document: ' + document.name + ' ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDocument(document.id);
      }
    });
  }

  openDialogCreateUpdateDocumentName(document: Document) {
    const dialogRef = this.dialog.open(CreateUpdateDocumentComponent, {
      data: {
        doc: document
      }
    });
    dialogRef.afterClosed().subscribe((doc: Document) => {
      if (doc) {
        doc.id = document.id;
        doc.elements = document.elements;
        doc.ownerUsername = document.ownerUsername;
        this.saveDocument(doc);
      }
    });
  }

  private saveDocument(document: Document) {
    this.documentService.saveDocument(document).subscribe(
      res => {
        this.appSnackbarService.openSnackBar('Success!: Document is saved', 'SAVE');
        this.renameDocumentChange.emit(true);
      }
    );
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .subscribe(res => {
        this.appSnackbarService.openSnackBar('Success!: Document Deleted', 'delete');
        this.documentDeleted.emit(true);
      });
  }

  displayFn(document?: Document): string | undefined {
    return document ? document.name : undefined;
  }

  getDocumentPermissions(document: Document): AppPermissions{
    return {
      targetType: AppTargetTypes.DOCUMENT,
      confidentialities: [],
      targetObject: document,
    };
  }

  getDocPagesLab(doc){
    const pages = this.totalPages(doc);
    return !pages ? 'Empty' : pages === 1 ? 'One page' : pages + ' pages';
  }

  private totalPages(doc){
    if(!oc(doc.elements).length){
      return 0;
    }
    return doc.elements.sort((e1, e2) => e2.page - e1.page)[0].page + 1;
  }

}

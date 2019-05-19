import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ElementType} from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
import {AppStoreService} from '../../shared/service/app.store.service';
import {Observable} from 'rxjs';
import {DocumentWrapperState} from './shared/document-wrapper.state';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css'],
})
export class DocumentContentComponent implements OnInit, OnChanges {
  @Input() document: Document;
  documentWrapperState$: Observable<DocumentWrapperState>;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              public appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.initDocumentWrapper(this.document.elements);
    this.documentWrapperState$ = this.appStoreService.getDocumentWrapper();
  }

  saveDocument() {
    this.documentService.saveDocument(this.document).subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
      this.loadDocument();
    });
  }

  loadDocument() {
    this.documentService.getDocument(this.document.id).subscribe(doc => {
      this.document = doc;
      this.appStoreService.initDocumentWrapper(this.document.elements);
    });
  }

  cancelDocumentChanges() {
    this.loadDocument();
  }


  ngOnChanges(changes) {
    if (changes.document) {
      this.appStoreService.initDocumentWrapper(this.document.elements);
    }
  }
}

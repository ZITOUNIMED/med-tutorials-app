import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {AppStoreService} from '../../shared/service/app.store.service';
import {Observable} from 'rxjs';
import { first } from 'rxjs/operators';
import {DocumentWrapperState} from './shared/document-wrapper.state';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css'],
})
export class DocumentContentComponent implements OnInit, OnChanges {
  @Input() doc: Document;
  @Output() documentChaned= new EventEmitter<Document>();
  documentWrapperState$: Observable<DocumentWrapperState>;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              public appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.initDocumentWrapper(this.doc.elements);
    this.documentWrapperState$ = this.appStoreService.getDocumentWrapper();
  }

  saveDocument() {
	this.documentWrapperState$
	.pipe(first())
	.subscribe( documentWrapperState =>{
		const doc = {...this.doc, elements: documentWrapperState.elements};
		this.documentService.saveDocument(doc).subscribe(res => {
		  this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
		  this.loadDocument();
		});
	});
  }

  loadDocument() {
    this.documentService.getDocument(this.doc.id).subscribe(doc => {
      this.doc = doc;
      this.documentChaned.emit(this.doc);
      this.appStoreService.initDocumentWrapper(this.doc.elements);
    });
  }

  cancelDocumentChanges() {
    this.loadDocument();
  }


  ngOnChanges(changes) {
    if (changes.doc) {
      this.appStoreService.initDocumentWrapper(this.doc.elements);
    }
  }
}

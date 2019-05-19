import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {ElementType} from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
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
  @Input() document: Document;
  @Output() documentChaned= new EventEmitter<Document>();
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
	this.documentWrapperState$
	.pipe(first())
	.subscribe( documentWrapperState =>{
		const doc = {...this.document, elements: documentWrapperState.elements};
		this.documentService.saveDocument(doc).subscribe(res => {
		  this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
		  this.loadDocument();
		});
	});
  }

  loadDocument() {
    this.documentService.getDocument(this.document.id).subscribe(doc => {
      this.document = doc;
      this.documentChaned.emit(this.document);
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

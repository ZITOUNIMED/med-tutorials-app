import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ElementType} from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
import {DocumentWrapper} from '../shared/document-wrapper/document-wrapper';
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
  ElementType = ElementType;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  selectedElement: Element;
  documentWrapper: DocumentWrapper;
  documentWrapperState$: Observable<DocumentWrapperState>;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              private appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.initDocumentWrapper(this.document.elements);
    this.documentWrapperState$ = this.appStoreService.getDocumentWrapper();
  }

  returnToPreviousPage() {
    this.appStoreService.returnToPreviousPage(true);
  }

  goToNextPage() {
    this.appStoreService.goToNextPage(true);
  }

  moveElement(element: Element) {
    this.appStoreService.moveElement({row: element.row, page: element.page});
  }

  moveDown(element) {
    this.appStoreService.moveDown({row: element.row, page: element.page});
  }

  deleteElement(element: Element) {
    this.documentWrapper.deleteElement(element);
    this.documentWrapper.applyWrapperElements(this.document);
  }

  saveElement(element: Element) {
    this.appStoreService.saveElement(element);
    this.selectedElement = null;
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
      this.documentWrapper.buildWrapper(this.document.elements);
    });
  }

  onCancelEditElement(cancel: boolean) {
    if (cancel) {
      this.selectedElement = null;
    }
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
  }

  cancelDocumentChanges() {
    this.loadDocument();
  }


  ngOnChanges(changes) {
    if (changes.document && this.documentWrapper) {
      this.documentWrapper.buildWrapper(this.document.elements);
    }
  }
}

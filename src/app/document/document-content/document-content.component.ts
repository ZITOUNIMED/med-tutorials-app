import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ElementType} from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
import {DocumentWrapper} from '../shared/document-wrapper/document-wrapper';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentContentComponent implements OnInit, OnChanges {
  @Input() document: Document;
  ElementType = ElementType;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();
  editableElement: Element;
  documentWrapper: DocumentWrapper;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.documentWrapper = new DocumentWrapper(this.document);
  }

  editElement(element: Element) {
    this.editableElement = Object.assign({}, element);
  }

  deleteElement(element: Element) {
    this.documentWrapper.deleteElement(element);
    this.documentWrapper.applyWrapperElements(this.document);
  }

  applyElementChanges(element: Element) {
    this.documentWrapper.applyElementChanges(element);
    this.documentWrapper.applyWrapperElements(this.document);
    this.editableElement = null;
    this.cd.detectChanges();
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
      this.editableElement = null;
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

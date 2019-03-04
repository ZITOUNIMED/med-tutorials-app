import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Document } from '../shared/document.model';
import { DocumentService } from '../shared/document.service';
import { AppSnackbarService } from '../../shared/app-snackbar.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit, OnChanges {

  documentForm: FormGroup;
  @Output() documentAdded = new EventEmitter<boolean>();
  @Input() document: Document;

  constructor(private fb: FormBuilder,
    private documentService: DocumentService,
    private appSnackbarService: AppSnackbarService) { }

  ngOnInit() {
    this.documentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const name = this.documentForm.get('name').value;
    if (this.document && this.document.id) {
      this.document.name = name;
    } else {
      this.document = {
        id: null,
        name: name,
        elements: []
      } as Document;
    }

    this.documentService.saveDocument(this.document).subscribe(
      res => {
        this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
        this.documentAdded.emit(true);
        this.clearForm();
      }
    );
  }

  ngOnChanges(changes) {
    if (changes.document && this.documentForm) {
      this.patchDocumentValue(this.document);
    }
  }

  clearForm() {
    this.documentForm.reset();
    this.document = null;
  }

  patchDocumentValue(document) {
    this.documentForm.get('name').patchValue(document.name);
  }

}

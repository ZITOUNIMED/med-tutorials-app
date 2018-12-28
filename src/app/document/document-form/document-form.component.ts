import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Document } from '../shared/document.model';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {

  documentForm: FormGroup;
  @Output() documentAdded= new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private documentService: DocumentService) { }

  ngOnInit() {
    this.documentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(){
    const name = this.documentForm.get('name').value;
    const document: Document = {
      id: null,
      name: name,
      elements: []
    };

    this.documentService.saveDocument(document).subscribe(
      res => this.documentAdded.emit(true)
    );
  }

}

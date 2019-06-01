import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';
import { oc } from 'src/app/shared/app-utils';
import { Document } from '../../model/document.model';

@Component({
  selector: 'app-create-update-document',
  templateUrl: './create-update-document.component.html',
  styleUrls: ['./create-update-document.component.css']
})
export class CreateUpdateDocumentComponent implements OnInit {
  updateDocForm: FormGroup;
  fb = new FormBuilder();

  ConfidentialityTypes= ConfidentialityTypes;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    doc: Document
  }) {}

  ngOnInit() {
    this.updateDocForm = this.fb.group({
      name: [oc(oc(this.data).doc).name || '', Validators.required],
      confidentiality: [oc(oc(this.data).doc).confidentiality ||
        ConfidentialityTypes.PRIVATE, Validators.required],
      author: [oc(oc(this.data).doc).author || '', Validators.required],
      description: [oc(oc(this.data).doc).description || ''],
    });
  }

  get doc(): Document{
    let doc= null;
    if(this.updateDocForm){
      doc = {
        id: null,
        elements: [],
        name: this.updateDocForm.get('name').value,
        author: this.updateDocForm.get('author').value,
        description: this.updateDocForm.get('description').value,
        confidentiality: this.updateDocForm.get('confidentiality').value,
      };
    }
    return doc;
  }

}

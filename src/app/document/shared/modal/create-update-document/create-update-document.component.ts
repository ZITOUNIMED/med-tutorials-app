import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-update-document',
  templateUrl: './create-update-document.component.html',
})
export class CreateUpdateDocumentComponent implements OnInit {

  nameControl: FormControl = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {documentName: string}) {  }

  ngOnInit() {
    this.nameControl.setValue(this.data && this.data.documentName || '');
  }

}

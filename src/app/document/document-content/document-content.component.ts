import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../shared/document.model';
import { ElementType } from '../shared/element-type';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css']
})
export class DocumentContentComponent implements OnInit {

  @Input() document: Document;
  ElementType = ElementType;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  getRows(text){
    return text.split(/\r*\n/).length;
  }

  save(){
    this.documentService.saveDocument(this.document)
    .subscribe(res => {
      console.log("success!");
    });
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Document } from '../shared/document.model';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit, OnChanges {

  documents: Document[] = [];
  @Output() selectDocument = new EventEmitter<Document>();

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.loadDocuments();
  }

  onDocumentAdded(added){
    this.loadDocuments();
  }

  onDeleteDocument(deleted){
    this.loadDocuments();
  }

  onSelectDocument(id){
    this.documentService.getDocument(id).subscribe(
      (document: Document) => this.selectDocument.emit(document)
    )
  }

  loadDocuments(){
    this.documentService.getDocuments().subscribe(documents => this.documents = documents);
  }

  onRenameDocumentChange(document){
    this.document = document;
  }

}

import {Component, OnInit} from '@angular/core';
import {Document} from './shared/document.model';
import {DocumentService} from './shared/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documents: Document[] = [];
  document: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.loadDocuments();
  }

  onDocumentAdded(added) {
    this.loadDocuments();
  }

  onDeleteDocument(deleted) {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe(documents => this.documents = documents);
  }

  onRenameDocumentChange(document) {
    this.document = document;
  }
}

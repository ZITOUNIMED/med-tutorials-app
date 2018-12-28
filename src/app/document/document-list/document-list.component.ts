import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];
  @Output() selectDocument = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onSelectDocument(id){
    this.selectDocument.emit(id);
  }

}

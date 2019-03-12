import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from '../document/shared/service/document.service';
import {Document} from '../document/shared/model/document.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  documents: Document[] = [];

  @Input() drawer;

  constructor(private documentService: DocumentService, ) { }

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe(documents => this.documents = documents);
  }

}

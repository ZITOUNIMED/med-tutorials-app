import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from '../document/shared/service/document.service';
import {Document} from '../document/shared/model/document.model';
import {Store} from '@ngrx/store';
import {StartLoadingAction} from '../shared/start-loading.action';
import {StopLoadingAction} from '../shared/stop-loading.action';
import {LoadingState} from '../shared/loading.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  documents: Document[] = [];

  @Input() drawer;

  constructor(private documentService: DocumentService,
              private store: Store<LoadingState>) { }

  ngOnInit() {
    // this.loadDocuments();
  }

  loadDocuments() {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.store.dispatch(new StopLoadingAction());
    });
  }

}

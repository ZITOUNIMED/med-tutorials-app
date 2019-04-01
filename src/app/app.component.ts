import {Component, OnInit} from '@angular/core';
import { Document } from './document/shared/model/document.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {StartLoadingAction} from './shared/start-loading.action';
import {LoadingState} from './shared/loading.state';
import {StopLoadingAction} from './shared/stop-loading.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  document: Document;
  showLoadignIcon = false;

  constructor(private router: Router,
              private store: Store<LoadingState>) {}

  ngOnInit() {
    this.store.select('load')
      .subscribe((loadingState: LoadingState) => {
        this.showLoadignIcon = loadingState && loadingState.loading;
      });
  }

  onSelectDocument(document) {
    this.document = document;
  }

  onReturnToSelectDocument(doReturn: boolean) {
    if (doReturn) {
      this.document = null;
    }
  }
}

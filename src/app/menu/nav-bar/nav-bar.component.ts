import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from '../../document/shared/service/document.service';
import {Document} from '../../document/shared/model/document.model';
import {Store} from '@ngrx/store';
import {StartLoadingAction, StopLoadingAction} from '../../shared/loading.actions';
import {Router} from '@angular/router';
import {AppState} from '../../shared/app.state';
import {PrincipalCleanAction} from '../../authentication/shared/principal.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  documents: Document[] = [];

  @Input() drawer;

  constructor(private documentService: DocumentService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.store.dispatch(new StopLoadingAction());
    });
  }

  signout() {
    this.store.dispatch(new PrincipalCleanAction(true));
    // this.router.navigate(['/auth/login']);
  }

}

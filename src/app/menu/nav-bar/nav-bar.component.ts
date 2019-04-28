import {Component, Input, OnInit, OnChanges } from '@angular/core';
import {DocumentSample} from '../../document/shared/model/document.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../shared/app.state';
import {PrincipalCleanAction} from '../../authentication/shared/principal.actions';
import { User } from '../../user/shared/model/user.model';
import { DocumentService } from '../../document/shared/service/document.service';
import { UserService } from '../../user/shared/service/user.service';
import { AppStoreService } from '../../shared/service/app.store.service';
import { UserSaveAction } from '../../user/shared/user.actions';
import { combineLatest } from 'rxjs';
import { StartLoadingAction, StopLoadingAction } from '../../shared/loading.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  documentsSamples: DocumentSample[] = [];
  @Input() toolBarOpenClicked: boolean;
  @Input() drawer;
  user: User;

  constructor(private documentService: DocumentService,
              private store: Store<AppState>,
              private userService: UserService,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    combineLatest(
      this.store.select('userState'),
      this.store.select('principalState')).subscribe(([userState, principalState]) => {
        if (!userState || !userState.user) {
          if (principalState && principalState.principal) {
            this.userService.findByUsername(principalState.principal.username).subscribe(
              user => {
                this.user = user;
                this.store.dispatch(new UserSaveAction(user));
              }, error => {
                this.appStoreService.addErrorNotif(error.status, error.message);
              }
            );
          }
        } else {
          this.user = userState.user;
        }
        this.loadDocumentsSamples();
    });
  }
  signout() {
    this.store.dispatch(new PrincipalCleanAction(true));
  }

  loadDocumentsSamples() {
    if (this.user && this.user.username) {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.getDocumentSamplesByOwnerUsername(this.user.username).subscribe(samples => {
      this.documentsSamples = samples;
      this.store.dispatch(new StopLoadingAction());
    });
    }
  }

  ngOnChanges(changes: any) {
    if (changes && changes.toolBarOpenClicked) {
      this.loadDocumentsSamples();
    }
  }
}

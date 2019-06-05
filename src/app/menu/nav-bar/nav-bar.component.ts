import {Component, Input, OnInit, OnChanges } from '@angular/core';
import {DocumentSample} from '../../document/shared/model/document.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../shared/app.state';
import {PrincipalCleanAction} from '../../authentication/shared/principal.actions';
import { DocumentService } from '../../document/shared/service/document.service';
import { StartLoadingAction, StopLoadingAction } from '../../shared/loading.actions';
import { User } from '../../user/shared/model/user.model';
import { AppStoreService } from '../../shared/service/app.store.service';
import { combineLatest } from 'rxjs';
import { UserSaveAction } from '../../user/shared/user.actions';
import { UserService } from '../../user/shared/service/user.service';
import { AppPermissions } from 'src/app/permissions/model/app.permissions.model';
import { UserRoleTypes } from 'src/app/permissions/model/user-role-types';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import {CRIPTED_PASSWAORD_KEY, USERNAME_KEY} from '../../authentication/shared/model/principal.model';
import {AppLocalStorageService} from '../../shared/service/app-local-storage.service';

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
  appUsersPermissions: AppPermissions;

  constructor(private documentService: DocumentService,
              private store: Store<AppState>,
              private appStoreService: AppStoreService,
              private userService: UserService,
              private appLocalStorageService: AppLocalStorageService) { }

  ngOnInit() {
    this.loadDocumentsSamples();
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
    });
    this.appUsersPermissions = {
      targetType: AppTargetTypes.USER,
      roles: [UserRoleTypes.ROLE_ADMIN],
    };
  }

  signout() {
    this.appLocalStorageService.remove(USERNAME_KEY);
    this.appLocalStorageService.remove(CRIPTED_PASSWAORD_KEY);
    this.store.dispatch(new PrincipalCleanAction(true));
  }

  loadDocumentsSamples() {
    this.store.dispatch(new StartLoadingAction());
    this.documentService.getDocumentsSamples().subscribe(samples => {
      this.documentsSamples = samples;
      this.store.dispatch(new StopLoadingAction());
    });
  }

  ngOnChanges(changes: any) {
    if (changes && changes.toolBarOpenClicked) {
      this.loadDocumentsSamples();
    }
  }
}

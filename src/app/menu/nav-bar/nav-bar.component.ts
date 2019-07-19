import {Component, Input, OnInit, OnChanges } from '@angular/core';
import {DocumentSample} from '../../document/shared/model/document.model';
import {PrincipalCleanAction} from '../../authentication/shared/principal.actions';
import { DocumentService } from '../../document/shared/service/document.service';
import { User } from '../../user/shared/model/user.model';
import { AppStoreService } from '../../shared/service/app.store.service';
import { combineLatest } from 'rxjs';
import { UserSaveAction } from '../../user/shared/user.actions';
import { UserService } from '../../user/shared/service/user.service';
import { AppPermissions } from 'src/app/permissions/model/app.permissions.model';
import { UserRoleTypes } from 'src/app/permissions/model/user-role-types';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/app.state";
import { DocumentCollectionTypes } from '../../document/shared/document-collection-types';
import { AppCollection } from 'src/app/app-collection/shared/model/app-collection.model';
import { AppCollectionService } from 'src/app/app-collection/shared/service/app-collection.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {
  DocumentCollectionTypes = DocumentCollectionTypes;
  documentsSamples: DocumentSample[] = [];
  @Input() toolBarOpenClicked: boolean;
  @Input() drawer;
  user: User;
  adminPermissions: AppPermissions;
  collections: AppCollection[];

  constructor(private documentService: DocumentService,
              private store: Store<AppState>,
              private appStoreService: AppStoreService,
              private userService: UserService,
              private appCollectionService: AppCollectionService,
              ) { }

  ngOnInit() {
    this.loadDocumentsSamples();
    combineLatest(
      this.appStoreService.getUser(),
      this.appStoreService.getPrincipal()).subscribe(([userInStore, principal]) => {
        if (!userInStore) {
          if (principal) {
            this.userService.findByUsername(principal.username).subscribe(
              user => {
                this.user = user;
                this.store.dispatch(new UserSaveAction(user));
              }, error => {
                this.appStoreService.addErrorNotif(error.status, error.message);
              }
            );
          }
        } else {
          this.user = userInStore;
        }
    });
    this.adminPermissions = {
      targetType: AppTargetTypes.USER,
      roles: [UserRoleTypes.ROLE_ADMIN],
    };
    this.loadCollections();
  }

  private loadCollections(){
    this.appStoreService.startLoading();
    this.appCollectionService.findAll()
    .subscribe(
      collections => {
        this.collections = collections;
        this.appStoreService.stopLoading();
      }, _error => {
        this.appStoreService.stopLoading();
      }
    );
  }

  loadDocumentsSamples() {
    this.appStoreService.startLoading();
    this.documentService.getDocumentsSamples().subscribe(samples => {
      this.documentsSamples = samples;
    }, () => {},
      () => {
        this.appStoreService.stopLoading();
      });
  }

  ngOnChanges(changes: any) {
    if (changes && changes.toolBarOpenClicked) {
      this.loadDocumentsSamples();
    }
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Notification, NotificationTypes } from '../notification/notification.model';
import { NotificationsAddAction } from '../notification/notifications.actions';
import {StartLoadingAction, StopLoadingAction} from '../loading.actions';
import {map} from 'rxjs/internal/operators';
import {UserState} from '../../user/shared/user.state';
import {Observable} from 'rxjs';
import {Element} from '../../document/shared/model/element.model';
import {AppDocument} from '../../document/shared/model/document.model';
import {
  DocumentWrapperGoToNextPageAction,
  DocumentWrapperInitAction, DocumentWrapperMoveDownAction, DocumentWrapperMoveElementAction,
  DocumentWrapperReturnToPreviousPageAction, DocumentWrapperSaveElementAction,
  DocumentWrapperInserPagesAction, DocumentWrapperDeleteElementAction,
  DocumentWrapperMoveUpAction, DocumentWrapperChangeEditModeAction,
  DocumentWrapperCancelEditElementAction, DocumentWrapperMoveToPageAction,
  DocumentWrapperSelectElementAction, DocumentWrapperDeletePagesAction,
  DocumentWrapperGoToPageAction
} from '../../document/document-content/shared/document-wrapper.actions';
import {DocumentWrapperState, Point} from '../../document/document-content/shared/document-wrapper.state';
import { oc } from '../app-utils';
import { DocumentSelectAction } from 'src/app/document/shared/document.actions';
import { DocumentState } from 'src/app/document/shared/document.state';
import { User } from 'src/app/user/shared/model/user.model';
import {Principal} from '../../authentication/shared/model/principal.model';
import {PrincipalState} from '../../authentication/shared/principal.state';
import {LoadingState} from "../loading.state";

@Injectable()
export class AppStoreService {
  constructor(private store: Store<AppState>) {}

  addErrorNotif(code: string, message: string) {
      const notif: Notification = {
          code: code,
          type: NotificationTypes.ERROR,
          message: message
      };
      this.store.dispatch(new NotificationsAddAction(notif));
  }

  startLoading() {
    this.store.dispatch(new StartLoadingAction());
  }

  stopLoading() {
    this.store.dispatch(new StopLoadingAction());
  }

  getUser(): Observable<User> {
    return this.store.select('userState')
      .pipe(map((userState: UserState) => {
        if (userState && userState.user) {
        return oc(userState).user;
      }
    }));
  }

  getDocumentWrapper(): Observable<DocumentWrapperState> {
      return this.store.select('documentWrapperState');
  }

  initDocumentWrapper(elements: Element[]) {
      this.store.dispatch(new DocumentWrapperInitAction(elements));
  }

  goToNextPage(accept?: boolean) {
      this.store.dispatch(new DocumentWrapperGoToNextPageAction(accept));
  }

  goToPage(page: number){
    this.store.dispatch(new DocumentWrapperGoToPageAction(page));
  }

  moveDown(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveDownAction(point));
  }

  moveUp(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveUpAction(point));
  }

  moveElement(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveElementAction(point));
  }

  returnToPreviousPage(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperReturnToPreviousPageAction(accept));
  }

  saveElement(element: Element) {
    this.store.dispatch(new DocumentWrapperSaveElementAction(element));
  }

  insertPages(pages: number) {
    this.store.dispatch(new DocumentWrapperInserPagesAction(pages));
  }

  deletePages(pages: number){
    this.store.dispatch(new DocumentWrapperDeletePagesAction(pages));
  }

  deleteElement(p: Point) {
    this.store.dispatch(new DocumentWrapperDeleteElementAction(p));
  }

  changeEditMode(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperChangeEditModeAction(accept));
  }

  cancelEditElement(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperCancelEditElementAction(accept));
  }

  moveToPage(p: Point, jump: number) {
    this.store.dispatch(new DocumentWrapperMoveToPageAction({p: p, jump: jump}));
  }

  selectElement(element: Element) {
    this.store.dispatch(new DocumentWrapperSelectElementAction(element));
  }

  selectDocument(doc: AppDocument) {
    this.store.dispatch(new DocumentSelectAction(doc));
  }

  getDocument(): Observable<Document> {
      return this.store.select('documentState')
      .pipe(map((documentState: DocumentState) => {
        if (documentState && documentState.doc) {
        return oc(documentState).doc;
      }
    }));
  }

  getPrincipal(): Observable<Principal> {
    return this.store.select('principalState')
      .pipe(map((principalState: PrincipalState) => {
       return oc(principalState).principal;
      }));
  }

  checkLoading(): Observable<boolean> {
    return this.store.select('loadingState')
      .pipe(map((loadingState: LoadingState) => loadingState && loadingState.loading));
  }
}

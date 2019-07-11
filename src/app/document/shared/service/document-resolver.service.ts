import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DocumentService} from './document.service';
import {Document} from '../model/document.model';
import {finalize, catchError} from 'rxjs/internal/operators';
import {AppStoreService} from '../../../shared/service/app.store.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document> {
  constructor(private documentService: DocumentService,
              private appStoreService: AppStoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, unused: RouterStateSnapshot): Observable<Document> {
    const id = route.paramMap.get('id');
    this.appStoreService.startLoading();
    return this.documentService.getDocument(id)
      .pipe(
        catchError(error => {
          this.appStoreService.addErrorNotif(error.status, error.message);
          return throwError(error);
        }),
        finalize(() => {
          this.appStoreService.stopLoading();
        }),
      );
  }
}

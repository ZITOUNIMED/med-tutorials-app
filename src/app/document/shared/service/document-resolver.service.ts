import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DocumentService} from './document.service';
import {Document} from '../model/document.model';
import {Store} from '@ngrx/store';
import {StartLoadingAction} from '../../../shared/start-loading.action';
import {StopLoadingAction} from '../../../shared/stop-loading.action';
import {tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document> {
  constructor(private documentService: DocumentService,
              private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, unused: RouterStateSnapshot): Observable<Document> {
    const id = route.paramMap.get('id');
    this.store.dispatch(new StartLoadingAction());
    return this.documentService.getDocument(id)
      .pipe(
        tap( () => {
          this.store.dispatch(new StopLoadingAction());
        })
      );
  }
}

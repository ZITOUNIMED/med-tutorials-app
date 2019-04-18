import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DocumentService} from './document.service';
import {Document} from '../model/document.model';
import {Store} from '@ngrx/store';
import {StartLoadingAction, StopLoadingAction} from '../../../shared/loading.actions';
import {tap} from 'rxjs/internal/operators';
import {LoadingState} from '../../../shared/loading.state';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document> {
  constructor(private documentService: DocumentService,
              private store: Store<LoadingState>) {
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

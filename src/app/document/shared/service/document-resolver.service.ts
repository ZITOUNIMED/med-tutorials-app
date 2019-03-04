import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DocumentService} from './document.service';
import {Document} from '../model/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document>{
  constructor(private documentService: DocumentService){}

  resolve(route: ActivatedRouteSnapshot, unused: RouterStateSnapshot): Observable<Document> {
    const id = route.paramMap.get('id');
    return this.documentService.getDocument(id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { Document, DocumentSample } from '../model/document.model';
import { DocumentCollectionTypes } from '../document-collection-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = environment.base + environment.api + '/document';

  constructor(private http: HttpClient) {}

  getDocuments(documentCollectionType?: DocumentCollectionTypes): Observable<Document[]> {
    let subUrl = '';
    switch(documentCollectionType){
      case DocumentCollectionTypes.PUBLIC_TUTOS:
        subUrl = 'publicDocuments';
        break;
      case DocumentCollectionTypes.MY_FAVORITE_TUTOS:
        subUrl = 'myFavoriteDocuments';
        break;
      case DocumentCollectionTypes.MY_TUTOS:
        subUrl = 'myDocuments';
        break;
      case DocumentCollectionTypes.ALL_TUTOS:
        subUrl = 'all';
        break;
      default: subUrl = '';
    }
    return this.http.get<Document[]>(this.url + '/' + subUrl);
  }

  getDocument(id: number|string): Observable<Document> {
    return this.http.get<Document>(this.url + `/${id}`);
  }

  saveDocument(document: Document): Observable<any> {
    return this.http.post(this.url, document);
  }

  saveAllDocuments(documents: Document[]): Observable<any> {
    return this.http.post(this.url + '/all', documents);
  }

  getDocumentsSamples(): Observable<DocumentSample[]> {
    return this.http.get<DocumentSample[]>(this.url + '/samples');
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  wakeUp(): Observable<any> {
    return this.http.get(this.url + '/up');
  }
}

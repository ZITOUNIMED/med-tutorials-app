import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { AppDocument, DocumentSample } from '../model/document.model';
import { DocumentCollectionTypes } from '../document-collection-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = environment.base + environment.api + '/document';

  constructor(private http: HttpClient) {}

  getDocuments(collectionType?: DocumentCollectionTypes, collectionId?: String): Observable<AppDocument[]> {
    let subUrl = '';
    if(collectionId){
      subUrl = this.getUrlByCollectionId(collectionId);
    } else {
      subUrl = this.getUrlByCollectionType(collectionType);
    }

    return this.http.get<AppDocument[]>(this.url + '/' + subUrl);
  }

  getUrlByCollectionId(collectionId: String): string {
    return `byCollectionId/${collectionId}`;
  }

  getUrlByCollectionType(collectionType: DocumentCollectionTypes): string {
    switch(collectionType){
      case DocumentCollectionTypes.PUBLIC_TUTOS:
        return 'publicDocuments';
      case DocumentCollectionTypes.MY_FAVORITE_TUTOS:
        return 'myFavoriteDocuments';
      case DocumentCollectionTypes.MY_TUTOS:
        return 'myDocuments';
      case DocumentCollectionTypes.ALL_TUTOS:
        return 'all';
      default: return 'publicDocuments';
    }
  }

  getDocument(id: number|string): Observable<AppDocument> {
    return this.http.get<AppDocument>(this.url + `/${id}`);
  }

  saveDocument(document: AppDocument): Observable<any> {
    return this.http.post(this.url, document);
  }

  saveAllDocuments(documents: AppDocument[]): Observable<any> {
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

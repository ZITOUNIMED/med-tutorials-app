import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { Document, DocumentSample } from '../model/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = environment.base + environment.api + '/document';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.url);
  }

  getDocument(id: number|string): Observable<Document> {
    return this.http.get<Document>(this.url + `/${id}`);
  }

  saveDocument(document: Document): Observable<any> {
    return this.http.post(this.url, document);
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

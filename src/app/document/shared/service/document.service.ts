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

  private getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.url);
  }

  findByOwnerUsername(username: string): Observable<Document[]> {
    return this.http.get<Document[]>(this.url + `/by-username/${username}`);
  }

  saveDocument(document: Document): Observable<any> {
    return this.http.post(this.url, document);
  }

  getDocument(id: number|string): Observable<Document> {
    return this.http.get<Document>(this.url + `/${id}`);
  }

  private getDocumentsSamples(): Observable<DocumentSample[]> {
    return this.http.get<DocumentSample[]>(this.url + '/samples');
  }

  getDocumentSamplesByOwnerUsername(username: string): Observable<DocumentSample[]> {
    return this.http.get<DocumentSample[]>(this.url + `/samples/by-username/${username}`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  wakeUp(): Observable<any> {
    return this.http.get(this.url + '/up');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = environment.base + environment.api + '/document';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any> {
    return this.http.get(this.url);
  }

  saveDocument(document): Observable<any> {
    return this.http.post(this.url, document);
  }

  getDocument(id): Observable<any> {
    return this.http.get(this.url + `/${id}`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  wakeUp(): Observable<any> {
    return this.http.get(this.url + '/up');
  }
}

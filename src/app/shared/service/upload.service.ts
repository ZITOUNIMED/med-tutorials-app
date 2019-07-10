import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Attachment } from 'src/app/document/shared/model/attachment.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.base + environment.api + '/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file, width, height): Observable<Attachment> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('width', width);
    formdata.append('height', height);
    return this.http.post<Attachment>(this.url, formdata);
  }

  findAll(): Observable<any> {
    return this.http.get(this.url);
  }
}

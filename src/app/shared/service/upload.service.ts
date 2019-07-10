import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.base + environment.api + '/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file, width, height): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('width', width);
    formdata.append('height', height);
    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: false,
      responseType: 'json'
    }
    );
    return this.http.request(req);
  }

  findAll(): Observable<any> {
    return this.http.get(this.url);
  }
}

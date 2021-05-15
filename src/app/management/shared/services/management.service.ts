import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManagementService {
    url =  environment.base + environment.api + '/management';
    constructor(private http: HttpClient){}

    exportDocumentsAsJson(): Observable<any>{
        return this.http.get(this.url + '/export-documents-as-json');
    }
}
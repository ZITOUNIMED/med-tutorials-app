import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WakeUpServerService {
  url = environment.api_url + "/wake-up-server";

  constructor(private http: HttpClient) {}

  wakeUp(): Observable<any> {
    return this.http.get(this.url);
  }
}

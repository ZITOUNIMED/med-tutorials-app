import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SignInRequest} from "../model/signin.request.model";
import {SignUpRequest} from "../model/signup.request.model";
import {Principal} from "../model/principal.model";

@Injectable()
export class AuthService {
  private authUrl = environment.base + environment.auth;
  constructor(private http: HttpClient) {}

  signIn(request: SignInRequest): Observable<Principal> {
    return this.http.post<Principal>(this.authUrl + '/signin', request);
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http.post(this.authUrl + '/signup', request);
  }
}

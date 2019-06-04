import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PrincipalState} from './shared/principal.state';
import {Store} from '@ngrx/store';
import {CRIPTED_PASSWAORD_KEY, USERNAME_KEY} from './shared/model/principal.model';
import {AuthService} from './shared/service/auth.service';
import {first} from 'rxjs/internal/operators';
import {PrincipalSaveAction} from "./shared/principal.actions";
import {AppLocalStorageService} from "../shared/service/app-local-storage.service";

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(private router: Router,
              private store: Store<PrincipalState>,
              private appLocalStorageService: AppLocalStorageService,
              private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('principalState')
      .pipe(first())
      .toPromise()
      .then((state: PrincipalState) => this.checkAuthentication(state));
  }

  private checkAuthentication(state: PrincipalState): Promise<boolean> | boolean {
    if (!state || !state.principal || !state.principal.token) {
      const [usernameFromStore, passwordFromStore] = [this.appLocalStorageService.get(USERNAME_KEY),
        this.appLocalStorageService.get(CRIPTED_PASSWAORD_KEY)];
      if (usernameFromStore && passwordFromStore) {
        return this.authService.signIn(usernameFromStore, passwordFromStore)
          .toPromise()
          .then(res => {
            this.store.dispatch(new PrincipalSaveAction(res));
            return true;
          })
          .catch(() => {
          this.router.navigate(['/auth/login']);
          return false;
        });
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    return true;
  }
}
